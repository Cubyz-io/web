"use client";

import {updatePassword} from '@/pages/api/auth/actions'
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from "zod";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import React, {useState} from "react";
import {redirect} from 'next/navigation';
import {useToast} from "@/hooks/use-toast";

const FormSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string().min(6, {
    message: "Confirm Password must be at least 6 characters.",
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirm"],
});
export type UpdatePasswordFormData = z.infer<typeof FormSchema>;

export default function UpdatePasswordFormPage() {
  const {toast} = useToast()
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false)

  const onUpdatePassword = async (data: UpdatePasswordFormData) => {
    console.log("Submitting form", data);
    setIsLoading(true)

    let redirectPath: string | null = null;
    try {
      redirectPath = await updatePassword(data)
      console.log("Password updated form", data)
      toast({title: "Password updated Successful", variant: "secondary"});
      setIsLoading(false)
    } catch (error: unknown) {
      console.error("Password update Failed:", error);
      toast({title: "Password update Failed", variant: "destructive"});
    } finally {
      if (redirectPath) redirect(redirectPath)
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onUpdatePassword)} className="space-y-4">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Create your new password" {...field} type="password"/>
                </FormControl>
                {form.formState.errors.password && <FormMessage>{form.formState.errors.password.message}</FormMessage>}
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({field}) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="Confirm your new password" {...field} type="password"/>
                </FormControl>
                {form.formState.errors.confirmPassword &&
                    <FormMessage>{form.formState.errors.confirmPassword.message}</FormMessage>}

              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating password..." : "Create new password"}
        </Button>
      </form>
    </Form>
  );
}