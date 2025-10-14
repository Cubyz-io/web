"use client"

import React, {useState} from "react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Checkbox} from "@/components/ui/checkbox"
import {ArrowRight, Eye, EyeOff, KeyRound, Mail, User, UserPlus} from "lucide-react"
import Link from "next/link"
import {redirect} from "next/navigation"
import {signInOAuth, signup} from "@/pages/api/auth/actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import * as z from "zod";
import {useToast} from "@/hooks/use-toast";

const FormSchema = z.object({
  username: z.string().min(1, {
    message: "Username name should be at least 1 character",
  }),
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string().min(6, {
    message: "Confirm Password must be at least 6 characters.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirm"],
});
export type RegisterFormData = z.infer<typeof FormSchema>;

export default function RegisterComponent() {
  const {toast} = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [checkboxsWarning, setCheckboxsWarning] = useState(false)


  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onRegister = async (data: RegisterFormData) => {

    if (data.password !== data.confirmPassword) {
      toast({title: "Passwords do not match", variant: "destructive"})
      return
    }

    if (!agreeToTerms) {
      toast({title: "Please agree to the terms and conditions", variant: "destructive"})
      return
    }

    setIsLoading(true)

    let redirectPath: string | null = null;
    try {
      redirectPath = await signup(data)
      console.log("Account created", data)
      toast({title: "Account created", variant: "secondary"});
      setIsLoading(false)
    } catch (error: unknown) {
      console.error("Account creation failed:", error);
      toast({title: "Account creation failed", variant: "destructive"});
    } finally {
      if (redirectPath) redirect(redirectPath);
    }
  }


  return (
    <>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="hidden sm:grid gap-12 items-center justify-center">

            {/* Right Side - Register Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <Card
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-500/5"></div>

                <CardHeader className="relative text-center pb-6 pt-8">
                  <div
                    className="w-16 h-16 bg-gradient-to-br from-orange-600 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <UserPlus className="h-8 w-8 text-white"/>
                  </div>
                  <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
                </CardHeader>

                <CardContent className="relative px-8">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onRegister)} className="space-y-4">
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="username"
                          render={({field}) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">First
                                Name</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"/>
                                  <Input placeholder="John" {...field}
                                         className="pl-10 h-12 bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all"/>
                                </div>
                              </FormControl>
                              {form.formState.errors.username &&
                                  <FormMessage>{form.formState.errors.username.message}</FormMessage>}
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({field}) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Email
                                Address</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"/>
                                  <Input type="email" placeholder="you@example.com" {...field}
                                         className="pl-10 h-12 bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all"/>
                                </div>
                              </FormControl>
                              {form.formState.errors.email &&
                                  <FormMessage>{form.formState.errors.email.message}</FormMessage>}
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
                              <FormLabel
                                className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <KeyRound
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"/>
                                  <Input type={showPassword ? "text" : "password"}

                                         placeholder="••••••••" {...field}
                                         className="pl-10 h-12 bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all"
                                         required
                                         minLength={8}/>
                                  <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                  >
                                    {showPassword ? <EyeOff className="h-5 w-5"/> :
                                      <Eye className="h-5 w-5"/>}
                                  </button>
                                </div>
                              </FormControl>
                              {form.formState.errors.password &&
                                  <FormMessage>{form.formState.errors.password.message}</FormMessage>}
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
                              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm
                                Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <KeyRound
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"/>
                                  <Input type={showPassword ? "text" : "password"}

                                         placeholder="••••••••" {...field}
                                         className="pl-10 h-12 bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all"
                                         required
                                         minLength={8}/>
                                  <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                  >
                                    {showPassword ? <EyeOff className="h-5 w-5"/> :
                                      <Eye className="h-5 w-5"/>}
                                  </button>
                                </div>
                              </FormControl>
                              {form.formState.errors.confirmPassword &&
                                  <FormMessage>{form.formState.errors.confirmPassword.message}</FormMessage>}
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="terms"
                          checked={agreeToTerms}
                          onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                          className="rounded-xl mt-1"
                        />
                        <Label
                          htmlFor="terms"
                          className="text-sm text-gray-600 dark:text-gray-300 cursor-pointer leading-relaxed"
                        >
                          I agree to the{" "}
                          <Link href="/terms"
                                className="text-orange-600 dark:text-orange-400 hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy"
                                className="text-orange-600 dark:text-orange-400 hover:underline">
                            Privacy Policy
                          </Link>
                        </Label>

                      </div>
                      <div className="relative my-6">
                        <div className="relative flex  text-sm">
                          {checkboxsWarning && !agreeToTerms &&

                              <Label
                                  className="text-sm text-red-600 dark:text-red-600 cursor-pointer leading-relaxed"
                              >
                                  Please agree to the checkbox above to proceed with registration
                              </Label>
                          }
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading || !agreeToTerms}
                        className="w-full bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-700 hover:to-rose-700 text-white h-12 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                        Creating account...
                      </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                        Get Started
                        <ArrowRight className="w-5 h-5"/>
                      </span>
                        )}
                      </Button>
                    </form>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200 dark:border-gray-600"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white dark:bg-gray-800 text-gray-500">Or sign up with</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant="outline"
                        className="h-12 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all"
                        onClick={() => {
                          if (agreeToTerms) signInOAuth("google")
                          else setCheckboxsWarning(true)
                        }}
                      >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                          <path fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Google
                      </Button>
                      <Button
                        variant="outline"
                        className="h-12 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all"
                        onClick={() => {
                          if (agreeToTerms) signInOAuth("github")
                          else setCheckboxsWarning(false)
                        }}
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path
                            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </Button>
                      <Button
                        variant="outline"
                        className="h-12 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all"
                        onClick={() => {
                          if (agreeToTerms) signInOAuth("discord")
                        }}
                      >
                        <FontAwesomeIcon icon={faDiscord} color="#5865F2"/>
                        Discord
                      </Button>
                    </div>
                  </Form>
                </CardContent>

                <CardFooter className="relative text-center pb-8 pt-6">
                  <p className="text-sm text-gray-600 dark:text-gray-300 w-full">
                    Already have an account?{" "}
                    <Link href="/login"
                          className="font-semibold text-orange-600 dark:text-orange-400 hover:underline">
                      Sign in instead
                    </Link>
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
          <div className="sm:hidden grid lg:grid-cols-2 gap-12 items-start">

            {/* Right Side - Register Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <Card
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-500/5"></div>

                <CardHeader className="relative text-center pb-6 pt-8">
                  <div
                    className="w-16 h-16 bg-gradient-to-br from-orange-600 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <UserPlus className="h-8 w-8 text-white"/>
                  </div>
                  <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
                </CardHeader>

                <CardContent className="relative px-8">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onRegister)} className="space-y-4">
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="username"
                          render={({field}) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">First
                                Name</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"/>
                                  <Input placeholder="John" {...field}
                                         className="pl-10 h-12 bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all"/>
                                </div>
                              </FormControl>
                              {form.formState.errors.username &&
                                  <FormMessage>{form.formState.errors.username.message}</FormMessage>}
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({field}) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Email
                                Address</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"/>
                                  <Input type="email" placeholder="you@example.com" {...field}
                                         className="pl-10 h-12 bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all"/>
                                </div>
                              </FormControl>
                              {form.formState.errors.email &&
                                  <FormMessage>{form.formState.errors.email.message}</FormMessage>}
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
                              <FormLabel
                                className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <KeyRound
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"/>
                                  <Input type={showPassword ? "text" : "password"}

                                         placeholder="••••••••" {...field}
                                         className="pl-10 h-12 bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all"
                                         required
                                         minLength={8}/>
                                  <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                  >
                                    {showPassword ? <EyeOff className="h-5 w-5"/> :
                                      <Eye className="h-5 w-5"/>}
                                  </button>
                                </div>
                              </FormControl>
                              {form.formState.errors.password &&
                                  <FormMessage>{form.formState.errors.password.message}</FormMessage>}
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
                              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm
                                Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <KeyRound
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"/>
                                  <Input type={showPassword ? "text" : "password"}

                                         placeholder="••••••••" {...field}
                                         className="pl-10 h-12 bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all"
                                         required
                                         minLength={8}/>
                                  <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                  >
                                    {showPassword ? <EyeOff className="h-5 w-5"/> :
                                      <Eye className="h-5 w-5"/>}
                                  </button>
                                </div>
                              </FormControl>
                              {form.formState.errors.confirmPassword &&
                                  <FormMessage>{form.formState.errors.confirmPassword.message}</FormMessage>}
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="terms"
                          checked={agreeToTerms}
                          onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                          className="rounded-xl mt-1"
                        />
                        <Label
                          htmlFor="terms"
                          className="text-sm text-gray-600 dark:text-gray-300 cursor-pointer leading-relaxed"
                        >
                          I agree to the{" "}
                          <Link href="/terms"
                                className="text-orange-600 dark:text-orange-400 hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy"
                                className="text-orange-600 dark:text-orange-400 hover:underline">
                            Privacy Policy
                          </Link>
                        </Label>

                      </div>
                      <div className="relative my-6">
                        <div className="relative flex  text-sm">
                          {checkboxsWarning && !agreeToTerms &&

                              <Label
                                  className="text-sm text-red-600 dark:text-red-600 cursor-pointer leading-relaxed"
                              >
                                  Please agree to the checkbox above to proceed with registration
                              </Label>
                          }
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading || !agreeToTerms}
                        className="w-full bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-700 hover:to-rose-700 text-white h-12 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                        Creating account...
                      </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                        Get Started
                        <ArrowRight className="w-5 h-5"/>
                      </span>
                        )}
                      </Button>
                    </form>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200 dark:border-gray-600"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white dark:bg-gray-800 text-gray-500">Or sign up with</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant="outline"
                        className="h-12 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all"
                        onClick={() => {
                          if (agreeToTerms) signInOAuth("google")
                          else setCheckboxsWarning(true)
                        }}
                      >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                          <path fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-12 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all"
                        onClick={() => {
                          if (agreeToTerms) signInOAuth("github")
                          else setCheckboxsWarning(false)
                        }}
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path
                            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-12 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all"
                        onClick={() => {
                          if (agreeToTerms) signInOAuth("discord")
                        }}
                      >
                        <FontAwesomeIcon icon={faDiscord} color="#5865F2"/>
                      </Button>
                    </div>
                  </Form>
                </CardContent>

                <CardFooter className="relative text-center pb-8 pt-6">
                  <p className="text-sm text-gray-600 dark:text-gray-300 w-full">
                    Already have an account?{" "}
                    <Link href="/login"
                          className="font-semibold text-orange-600 dark:text-orange-400 hover:underline">
                      Sign in instead
                    </Link>
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}