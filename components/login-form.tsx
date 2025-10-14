"use client";

import {login, sendResetPassword} from '@/pages/api/auth/actions'
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from "zod";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import React, {useState} from "react";
import {useToast} from "@/hooks/use-toast";
import {redirect} from "next/navigation";

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export type LoginFormData = z.infer<typeof FormSchema>;

export default function LoginFormPage() {
  const {toast} = useToast();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false)
  const [isResettingPassword, setIsResettingPassword] = useState(false)

  const onLogin = async (data: LoginFormData) => {
    console.log("Logging in", data);
    setIsLoading(true)

    let redirectPath: string | null = null;
    try {
      redirectPath = await login(data)
      setIsLoading(false)
    } catch (error: unknown) {
      console.log("Login Failed:", error);
      toast({title: "Login Failed", variant: "destructive"});
    } finally {
      if (redirectPath) {
        if (redirectPath === '/dashboard') {
          console.log("Login Successful", data)
          toast({title: "Login Successfull", variant: "secondary"});
        }
        redirect(redirectPath);
      }
    }
  }
  const handleSendResetPassword = async (email: string) => {
    console.log("Sending reset link:", email);
    setIsResettingPassword(true)

    try {
      await sendResetPassword(email)
      console.log("Reset Link sent. Please check your inbox", email)
      toast({title: "Reset link sent. Please check your inbox"});
      setIsResettingPassword(false)
    } catch (error: unknown) {
      console.error("Reset link sending failure:", error);
      toast({title: "Reset link sending failure"});
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onLogin)} className="space-y-4">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your password" {...field} type="password"/>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button type="button" onClick={() => handleSendResetPassword(form.getValues()?.email)}
                disabled={isResettingPassword} variant={"link"}>
          {isResettingPassword ? "Sending reset password link..." : "Reset Password"}
        </Button>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Form>
  );
}
