"use client"
import React from "react"
import {ModType} from "@/pages/api/mods/fetch";
import {ModList} from "../mod-list";

export default function ModsComponent(
  {
    loadMods,
  }: {
    loadMods: Promise<ModType[]>
  }) {

  return (
    <main className="flex-1 overflow-auto">

      {/* Hero Section - Completely Redesigned */}
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
            <ModList loadMods={loadMods}/>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">


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

    </main>
  )
}
