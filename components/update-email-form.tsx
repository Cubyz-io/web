"use client";

import {updateEmail} from '@/pages/api/auth/actions'
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
  newEmail: z.string(),
  confirmNewEmail: z.string()
}).refine((data) => data.newEmail === data.confirmNewEmail, {
  message: "Emails don't match",
  path: ["confirm"],
});
export type UpdateEmailFormData = z.infer<typeof FormSchema>;

export default function UpdateEmailFormPage() {
  const {toast} = useToast()
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newEmail: "",
      confirmNewEmail: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false)

  const onUpdateEmail = async (data: UpdateEmailFormData) => {
    console.log("Submitting form", data);
    setIsLoading(true)

    let resp: {
      redirectPath: string
      title: string
      variant: "default" | "destructive" | "accent" | "secondary" | null | undefined
    } | undefined = undefined

    try {
      resp = await updateEmail(data)
      console.log("Please verify your email to change your email!", data)
      toast({title: resp.title, variant: resp.variant});
      setIsLoading(false)
    } catch (error: unknown) {
      console.error("Email update Failed:", error);
      toast({title: "Email update Failed", variant: "destructive"});
    } finally {
      if (resp && resp.redirectPath) redirect(resp.redirectPath)
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onUpdateEmail)} className="space-y-4">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="newEmail"
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Type your new email" {...field} type="text"/>
                </FormControl>
                {form.formState.errors.newEmail && <FormMessage>{form.formState.errors.newEmail.message}</FormMessage>}
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="confirmNewEmail"
            render={({field}) => (
              <FormItem>
                <FormLabel>Confirm Email</FormLabel>
                <FormControl>
                  <Input placeholder="Confirm your new email" {...field} type="text"/>
                </FormControl>
                {form.formState.errors.newEmail && <FormMessage>{form.formState.errors.newEmail.message}</FormMessage>}

              </FormItem>
            )}
          />
        </div>
        {form.formState.errors.confirmNewEmail &&
            <FormMessage>{form.formState.errors.confirmNewEmail.message}</FormMessage>}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating Email..." : "Update Email"}
        </Button>
      </form>
    </Form>
  );
}