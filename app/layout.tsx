import "server-only"
import React from "react"
import "@/app/globals.css"
import type {Metadata} from "next"
import {Inter} from "next/font/google"
import {ThemeProvider} from "@/components/theme-provider"
import {Toaster} from "@/components/ui/toaster"
import './globals.css'
import {fetchUser} from "@/pages/api/auth/actions";
import {Session} from "@supabase/supabase-js"
import SupabaseListener from "@/app/supabase-listener";
import {AppProvider} from "./supabase-provider"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_TITLE} - ${process.env.NEXT_PUBLIC_SUBTITLE}`,
  description: `${process.env.NEXT_PUBLIC_DESCRIPTION}`,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session: Session | null = await fetchUser()
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AppProvider session={session}>
          <SupabaseListener serverAccessToken={session?.access_token} />
          <Toaster/>
          {children}
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
