"use client"
import React from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";

export default function LoginFallback() {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-900/20 dark:to-emerald-900/20"></div>
      <div
        className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-30 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>

      {/* Floating Elements */}
      <div
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full blur-xl opacity-20 animate-pulse delay-1000"></div>
      <div
        className="absolute top-1/2 right-20 w-16 h-16 bg-gradient-to-r from-rose-400 to-green-500 rounded-full blur-xl opacity-20 animate-pulse delay-500"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Subtitle */}
          <p
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            You need to be logged in to upload a new mod.
          </p>


          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">

            <Button
              type="button"
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-opal-700 hover:to-green-700 text-white h-12 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Link href="/login" className="flex items-center gap-2">

                Sign In
                <ArrowRight className="w-5 h-5"/>
              </Link>
            </Button>
            <Button
              type="button"
              className="bg-gradient-to-r from-green-600 to-opal-600 hover:from-opal-700 hover:to-green-700 text-white h-12 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Link href="/register" className="flex items-center gap-2">
                Register
                <ArrowRight className="w-5 h-5"/>
              </Link>
            </Button>

          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}


