"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from "zod";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import React, {useState} from "react";
import {useToast} from "@/hooks/use-toast";
import {redirect} from "next/navigation";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {GithubIcon, NotepadText, TextCursorInput, Upload} from "lucide-react";
import {Dropzone, DropzoneContent, DropzoneEmptyState} from "@/components/ui/shadcn-io/dropzone";
import {submitAddon} from "@/pages/api/mods/actions";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  url: z.url({hostname: /^github\.com$/, protocol: /^https$/}),
  icon: z.file(),
});

export type SubmitAddonData = z.infer<typeof FormSchema>;

export default function ModUploadForm() {
  const {toast} = useToast();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      url: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: SubmitAddonData) => {
    console.log("Logging in", data);
    setIsLoading(true)

    let redirectPath: string | null = null;
    try {
      redirectPath = await submitAddon(data)
      setIsLoading(false)
    } catch {
      toast({title: "Mod upload failed", variant: "destructive"});
    } finally {
      if (redirectPath) {
        if (redirectPath === '/app') {
          console.log("Mod Submitted", data)
          toast({title: "Mod submitted. redirecting to modlist", variant: "secondary"});
        }
        redirect(redirectPath);
      }
    }
  }
  return (
    <div className="container mx-auto px-4 py-16 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-12 items-center justify-center">
          {/* Right Side - Login Form */}
          <div className="w-full max-w-7xl mx-auto lg:mx-0">
            <Card
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-opal-500/5 to-green-500/5"></div>

              <CardHeader className="relative text-center pb-6 pt-8">
                <div
                  className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Upload className="h-8 w-8 text-white"/>
                </div>
                <CardTitle className="text-2xl font-bold">Submit your addon</CardTitle>
              </CardHeader>

              <CardContent className="relative px-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({field}) => (
                          <FormItem>
                            <FormLabel
                              className="text-sm font-medium text-gray-700 dark:text-gray-300">Title</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <TextCursorInput
                                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"/>
                                <Input placeholder="Example Mod" {...field}
                                       className="pl-10 h-12 bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 transition-all"/>
                              </div>
                            </FormControl>
                            {form.formState.errors.title &&
                                <FormMessage>{form.formState.errors.title.message}</FormMessage>}
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({field}) => (
                          <FormItem>
                            <FormLabel
                              className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <NotepadText
                                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"/>
                                <Input type="text" placeholder="a very nice mod" {...field}
                                       className="w-full pl-10 h-12 bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 transition-all"/>
                              </div>
                            </FormControl>
                            {form.formState.errors.description &&
                                <FormMessage>{form.formState.errors.description.message}</FormMessage>}
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="url"
                        render={({field}) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Project
                              URL</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <GithubIcon
                                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"/>
                                <Input type="text" placeholder="github.com/author/examplemod" {...field}
                                       className="w-full pl-10 h-12 bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 transition-all"/>
                              </div>
                            </FormControl>
                            {form.formState.errors.url &&
                                <FormMessage>{form.formState.errors.url.message}</FormMessage>}
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="icon"
                        render={({field}) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative">
                                <NotepadText
                                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"/>
                                <Dropzone
                                  accept={{'image/*': ['.png', 'jpg', '.webp', '.svg', '.apng']}}
                                  maxFiles={1}
                                  onDrop={(files) => field.onChange(files[0])}
                                  src={field.value === undefined ? undefined : [field.value]}
                                >
                                  <DropzoneEmptyState/>
                                  <DropzoneContent/>
                                </Dropzone>
                              </div>
                            </FormControl>
                            {form.formState.errors.description &&
                                <FormMessage>{form.formState.errors.description.message}</FormMessage>}
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="submit"
                            className="w-full bg-gradient-to-r from-green-600 to-opal-600 hover:from-green-700 hover:to-opal-700 text-white h-12 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading}>
                      {isLoading ? "Submitting mod..." : "Submit mod"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
