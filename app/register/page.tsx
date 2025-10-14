"use client"

import React from "react"
import {Navbar} from "@/components/navbar"
import {Footer} from "@/components/footer"
import Head from "next/head"
import RegisterComponent from "@/components/pages/register";

export default function RegisterPage() {

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_TITLE} » Register</title>
      </Head>
      <div className="flex min-h-screen flex-col">
        <Navbar/>

        <main className="flex-1 relative flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-900/20 dark:to-emerald-900/20"></div>
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-30 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-20 w-16 h-16 bg-gradient-to-r from-rose-400 to-green-500 rounded-full blur-xl opacity-20 animate-pulse delay-500"></div>

          <RegisterComponent/>
        </main>

        <Footer className="dark:from-green-900/90  dark:to-gray-900"/>
      </div>
    </>
  )
}