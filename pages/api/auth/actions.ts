'use server'

import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {createClient} from '@/utils/supabase/server'
import {Provider} from "@supabase/auth-js";
import {LoginFormData} from '@/components/login-form';
import {UpdatePasswordFormData} from "@/components/update-password-form";
import {UpdateEmailFormData} from "@/components/update-email-form";
import {RegisterFormData} from "@/components/pages/register";

export async function login(formData: LoginFormData) {
  const supabase = await createClient()

  const data = {
    email: formData.email as string,
    password: formData.password as string,
  }

  const {error} = await supabase.auth.signInWithPassword(data)

  if (error) {
    throw error
  }

  await createUser()

  revalidatePath('/', 'layout')
  return '/dashboard'
}

export async function signup(formData: RegisterFormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.email as string,
    password: formData.password as string,
    options: {
      data: {
        name: formData.username as string,
      }
    }
  }

  const {error} = await supabase.auth.signUp(data)

  if (error) {
    throw error
  }
  await createUser()

  revalidatePath('/', 'layout')
  return '/'
}

export async function createUser() {
  const supabase = await createClient()
  const user = await supabase.auth.getUser()
  const {error} = await supabase
    .from('User')
    .upsert(
      {
        id: user.data.user?.id,
        email: user.data.user?.email,
        user_name: user.data.user?.user_metadata.name ?? user.data.user?.user_metadata.full_name ?? user.data.user?.email,
        first_name: user.data.user?.user_metadata.firstName ?? user.data.user?.user_metadata.full_name ?? user.data.user?.email,
        last_name: user.data.user?.user_metadata.lastName ?? user.data.user?.user_metadata.full_name ?? "",
      },
      {onConflict: 'id'}
    )
  if (error) {
    console.log(error)
  }
  return !error
}

export async function signInOAuth(provider: Provider) {
  const supabase = await createClient()
  const {data} = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: `${process.env.NEXTAUTH_URL}/auth/callback`,
    },
  })
  if (data.url) redirect(data.url)
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return true
}

export async function sendResetPassword(email: string) {
  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXTAUTH_URL}/account/update-password`,
  })
}

export async function updatePassword(formData: UpdatePasswordFormData) {
  const data = {
    password: formData.password as string,
  }
  const supabase = await createClient();
  await supabase.auth.updateUser(data)
  return "/dashboard"

}

export async function updateEmail(formData: UpdateEmailFormData) {
  const data = {
    email: formData.newEmail as string,
  }
  const supabase = await createClient();
  await supabase.auth.updateUser(data, {
    emailRedirectTo: `${process.env.NEXTAUTH_URL}/dashboard`,
  })

  const resp: {
    redirectPath: string
    title: string
    variant: "default" | "destructive" | "accent" | "secondary" | null | undefined
  } = {
    redirectPath: "/dashboard",
    title: "Email updated successfully",
    variant: "secondary"
  }
  return resp;

}

export async function fetchUser() {
  const supabase = await createClient();
  const {
    data: {session}
  } = await supabase.auth.getSession();
  return session;
}
