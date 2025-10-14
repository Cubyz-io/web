"use client"

import React from "react"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Navbar} from "@/components/navbar"
import {Footer} from "@/components/footer"
import {Badge} from "@/components/ui/badge"
import {ArrowRight, Code, Download, Gamepad2, Layers, Palette, Search, Shield, Upload, Users, Zap,} from "lucide-react"
import Link from "next/link"
import Head from "next/head"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGamepad} from "@fortawesome/free-solid-svg-icons";


export default function Home() {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_TITLE} » Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

      </Head>
      <div className="flex min-h-screen flex-col">
        <Navbar/>

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
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-green-200 dark:border-green-800 rounded-full px-6 py-2 mb-8 shadow-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  🎮 Cubyz Modding Marketplace — Discover & Share Mods
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-none">
                <span
                  className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-800 bg-clip-text text-transparent">
                  Discover Amazing
                </span>
                <br/>
                <span className="text-gray-900 dark:text-white">
                  Cubyz Mods
                </span>
              </h1>

              {/* Subtitle */}
              <p
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                Explore community‑created mods, textures and maps for the Cubyz open source game.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">

                <Button
                  size="lg"
                  className="bg-gradient-to-r from-white to-gray-600 hover:from-white hover:to-gray-700 text-black px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  asChild
                >
                  <Link href="/app" className="flex items-center gap-2">
                    Browse Mods
                    <Search className="w-5 h-5"/>
                  </Link>
                </Button>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  asChild
                >
                  <Link href="/app" className="flex items-center gap-2">
                    Upload Mod
                    <Upload className="w-5 h-5"/>
                  </Link>
                </Button>
                <Button
                  size="lg"
                  className="bg-black text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  asChild
                >
                  <a href="https://github.com/PixelGuys/Cubyz" className="flex items-center gap-2">
                    Get Cubyz
                    <FontAwesomeIcon className="w-5 h-5" icon={faGamepad}/>
                  </a>
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


        {/* Features Section - Redesigned */}
        {/* Hero Section - Completely Redesigned */}

        <section
          className="py-24 px-4 bg-gradient-to-b from-white to-gray-50 dark:to-green-900/40 dark:via-green-900/30 dark:from-emerald-900/20">
          {/* Animated Background */}
          <div className="container mx-auto">
            <div className="text-center mb-20">
              <Badge
                className="mb-4 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800 transition-colors px-4 py-2">
                Why Choose Our Marketplace
              </Badge>
              <h2
                className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Built for Modders
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Discover, share, and create amazing mods for the Cubyz open source game with our community‑driven
                platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card
                className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative">
                  <div
                    className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Search className="h-8 w-8 text-white"/>
                  </div>
                  <CardTitle className="text-xl font-bold">Easy Mod Discovery</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Browse and filter mods by category, rating, and compatibility
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Find the perfect mods for your Cubyz experience with our intuitive search and filtering system.
                  </p>
                </CardContent>
              </Card>

              <Card
                className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative">
                  <div
                    className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Download className="h-8 w-8 text-white"/>
                  </div>
                  <CardTitle className="text-xl font-bold">One-Click Installation</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Automatic mod installation and dependency management
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Install mods with a single click. Our system handles dependencies and compatibility automatically.
                  </p>
                </CardContent>
              </Card>

              <Card
                className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative">
                  <div
                    className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-8 w-8 text-white"/>
                  </div>
                  <CardTitle className="text-xl font-bold">Active Community</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Connect with modders, share feedback, and collaborate
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Join a vibrant community of Cubyz players and modders sharing their creations and experiences.
                  </p>
                </CardContent>
              </Card>

              <Card
                className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative">
                  <div
                    className="w-16 h-16 bg-gradient-to-br from-green-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-8 w-8 text-white"/>
                  </div>
                  <CardTitle className="text-xl font-bold">Safe & Verified</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    All mods are scanned for security and compatibility
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Every mod is tested and verified to ensure it&apos;s safe to use and compatible with your Cubyz version.
                  </p>
                </CardContent>
              </Card>

              <Card
                className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative">
                  <div
                    className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Code className="h-8 w-8 text-white"/>
                  </div>
                  <CardTitle className="text-xl font-bold">Creator Tools</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Upload, manage, and track your mods with ease
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Comprehensive tools for mod creators to upload, update, and manage their mods with detailed
                    analytics.
                  </p>
                </CardContent>
              </Card>

              <Card
                className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative">
                  <div
                    className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Gamepad2 className="h-8 w-8 text-white"/>
                  </div>
                  <CardTitle className="text-xl font-bold">Cross-Platform</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Works on Windows, Mac, and Linux
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Access the marketplace from any device and enjoy mods across all supported Cubyz platforms.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Use Cases Section - Modernized */}
        <section
          className="py-24 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-green-900/40 dark:via-green-900/50 dark:to-emerald-900/60">
          <div className="container mx-auto">
            <div className="text-center mb-20">
              <Badge
                className="mb-4 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800 transition-colors px-4 py-2">
                Mod Categories
              </Badge>
              <h2
                className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Mods for Every Playstyle
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                From gameplay enhancements to visual overhauls, discover mods that transform your Cubyz experience.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Gamepad2,
                  title: "Gameplay Mods",
                  description: "Enhance your gaming experience with new mechanics, items, and gameplay features.",
                  gradient: "from-orange-500 to-amber-500"
                },
                {
                  icon: Palette,
                  title: "Visual Overhauls",
                  description: "Transform the game's appearance with texture packs, shaders, and visual enhancements.",
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  icon: Layers,
                  title: "Content Packs",
                  description: "Add new biomes, structures, and world generation features to expand your adventures.",
                  gradient: "from-green-500 to-emerald-500"
                },
                {
                  icon: Zap,
                  title: "Performance Mods",
                  description: "Optimize your game with mods that improve FPS, reduce lag, and enhance stability.",
                  gradient: "from-orange-500 to-red-500"
                },
                {
                  icon: Users,
                  title: "Multiplayer Enhancements",
                  description: "Improve your multiplayer experience with server tools and collaborative features.",
                  gradient: "from-indigo-500 to-purple-500"
                },
                {
                  icon: Code,
                  title: "Developer Tools",
                  description: "Modding utilities and development tools for creators and advanced users.",
                  gradient: "from-teal-500 to-blue-500"
                }
              ].map((useCase, index) => (
                <div key={index} className="group relative">
                  <div
                    className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl blur-xl"
                    style={{background: `linear-gradient(to right, var(--tw-gradient-stops))`}}></div>
                  <Card
                    className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 h-full">
                    <CardHeader className="text-center pb-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${useCase.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <useCase.icon className="h-8 w-8 text-white"/>
                      </div>
                      <CardTitle className="text-xl font-bold">{useCase.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {useCase.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="py-24 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-green-900/80 dark:to-green-900/90">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>

          <div className="container mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Ready to Enhance Your Cubyz?
            </h2>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
              Discover amazing mods or share your own creations with the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <Link href="/app" className="flex items-center gap-2">
                  Browse Mods
                  <ArrowRight className="w-5 h-5"/>
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-black  dark:text-green-100 hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
                asChild
              >
                <Link href="/app">Upload Your Mod</Link>
              </Button>
            </div>

            <div className="mt-12 text-white/80">
              <p className="text-sm">✓ Free downloads ✓ Easy installation ✓ Active community</p>
            </div>
          </div>
        </section>

        <Footer className="dark:from-green-900/90  dark:to-gray-900"/>
      </div>
    </>
  )
}