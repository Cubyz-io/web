"use client"

import React, {useEffect, useState} from "react"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import {cn, getCapitals} from "@/lib/utils"
import {ArrowRight, Cuboid, Map, Menu, Paintbrush, Sparkles} from "lucide-react"
import {useSupabase} from "@/app/supabase-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu"
import {Avatar, AvatarFallback, AvatarImage} from "./ui/avatar"
import {signOut} from "@/pages/api/auth/actions";
import {router} from "next/client";
import {redirect} from "next/navigation";
import {useToast} from "@/hooks/use-toast";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const {session} = useSupabase();
  const user = session == null ? null : session.user;
  const [capitals, setCapitals] = useState("");
  const {toast} = useToast()
  const contents = [
    {
      title: "Mods",
      href: "/mods",
      icon: <Cuboid className="h-5 w-5"/>,
    },
    {
      title: "Textures",
      href: "/textures",
      icon: <Paintbrush className="h-5 w-5"/>,
    },
    {
      title: "Maps",
      href: "/maps",
      icon: <Map className="h-5 w-5"/>,
    },
  ]
  const doLogout = async () => {
    await signOut()
    localStorage.removeItem("isLoggedIn")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
      variant: "accent"
    })
    router.push("/login")
    redirect("/")
  }
  useEffect(() => {
    if (user === null) return;
    setCapitals(
      Object.keys(user.user_metadata).length === 0
        ? "Anonymous"
        : user?.user_metadata.firstName === undefined
          ? user?.user_metadata.full_name === undefined
            ? user?.user_metadata.name === undefined
              ? user?.user_metadata.email.substring(0, 1).toUpperCase()
              : getCapitals(user.user_metadata.name)
            : getCapitals(user.user_metadata.full_name)
          : getCapitals(`${user.user_metadata.firstName} ${user?.user_metadata.lastName}`))
  }, [user]);

  return (
    <header
      className="sticky top-0 z-50 w-full from-white to-gray-50  backdrop-blur-xl border-b border-gray-200/20 dark:border-gray-800/20 dark:bg-emeral-900">
      <div className="container flex h-20 items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 mr-8 group">
          <div className="relative">
            <div
              className="w-10 h-10 bg-gradient-to-br from-green-600 to-emeral-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Sparkles className="h-6 w-6 text-white"/>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full animate-pulse"></div>
          </div>
          <span
            className="font-black text-xl sm:inline-block bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            {process.env.NEXT_PUBLIC_TITLE}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex">
          <NavigationMenu
            className="[&_*]:!border-0 [&_[data-radix-navigation-menu-viewport]]:!border-0 [&_[data-radix-navigation-menu-viewport]]:!bg-transparent [&_[data-radix-navigation-menu-viewport]]:!shadow-none">
            <NavigationMenuList className="flex items-center space-x-2">
              {/* Products Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className="h-10 px-4 py-2 text-sm font-medium hover:rounded-xl text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-gray-800 data-[state=open]:text-blue-600 dark:data-[state=open]:text-blue-400 border-0 bg-transparent">
                  Search Content
                </NavigationMenuTrigger>
                <NavigationMenuContent className="rounded-xl border-0 shadow-xl overflow-hidden">
                  <div className="w-32  bg-white dark:bg-gray-900 rounded-xl">
                    <div className="grid grid-cols-1">
                      {contents.map((content, index) => (
                        <NavigationMenuLink key={index} asChild>
                          <Link href={content.href}
                                className="group block p-3 rounded-xl hover:bg-gray-50  dark:hover:bg-gray-800 transition-colors">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-4 h-4 rounded-xl flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-200`}>
                                {content.icon}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4
                                    className="font-semibold text-gray-900 dark:text-white text-sm">{content.title}</h4>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Side Actions */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          {session !== null ?
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Avatar className="h-9 w-9 ring-2 ring-gray-200 dark:ring-gray-700">
                    <AvatarImage alt="Avatar"/>
                    <AvatarFallback
                      className="bg-gradient-to-br from-emerald-500 to-green-600 text-white font-semibold">
                      {capitals}
                    </AvatarFallback>
                  </Avatar>
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-xl shadow-lg"
                align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Account</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.user_metadata.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={doLogout} className="cursor-pointer text-red-600 dark:text-red-400">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            :
            <nav className="flex items-center space-x-3">
              {/* Sign In Link */}
              <Link
                href="/login"
                className="hidden sm:inline-flex text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Sign In
              </Link>

              {/* CTA Button */}
              <Button
                asChild
                className="hidden sm:inline-flex bg-gradient-to-r from-green-600 to-emeral-600 hover:from-green-700 hover:to-emeral-700 text-white px-6 py-2.5 text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/register" className="flex items-center gap-2">
                  Get Started
                  <ArrowRight className="h-4 w-4"/>
                </Link>
              </Button>

              {/* Mobile Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon"
                          className="lg:hidden  border-gray-300 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-400 rounded-xl">
                    <Menu className="h-5 w-5"/>
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right"
                              className="lg:hidden w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-l border-gray-200/20 dark:border-gray-800/20 overflow-y-auto overscroll-contain">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between mb-8 rounded-xl">
                    <Link href="/" className="flex items-center space-x-3" onClick={() => setIsOpen(false)}>
                      <div
                        className="w-8 h-8 bg-gradient-to-br from-green-600 to-emeral-600 rounded-xl flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-white "/>
                      </div>
                      <span
                        className="font-black text-lg bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                      {process.env.NEXT_PUBLIC_TITLE}
                    </span>
                    </Link>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex flex-col space-y-6">

                    {/* Mobile CTA Section */}
                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
                      <Link
                        href="/login"
                        className="block w-full text-center p-3 rounded-xl border border-gray-300 dark:border-gray-600 font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Button
                        asChild
                        onClick={() => setIsOpen(false)}
                        className="w-full bg-gradient-to-r from-green-600 to-emeral-600 hover:from-green-700 hover:to-emeral-700 text-white py-3 text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Link href="/register" className="flex items-center justify-center gap-2">
                          Get Started
                          <ArrowRight className="h-4 w-4"/>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </nav>
          }
        </div>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({className, title, children, icon, ...props}, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-xl p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="flex items-center text-sm font-medium leading-none">
            {icon}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"