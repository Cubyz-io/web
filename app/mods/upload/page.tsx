"use server"
import Head from "next/head"
import {Navbar} from "@/components/navbar";
import React from "react";
import ModsUploadComponent from "@/components/pages/mods/upload";
import LoginFallback from "@/components/pages/login-fallback";
import {createClient} from "@/utils/supabase/server";

export default async function ModsUploadPage() {
  const supabase = await createClient();
  const {
    data: {session}
  } = await supabase.auth.getSession();

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_TITLE} » Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

      </Head>
      <div className="flex min-h-screen flex-col">
        <Navbar/>
        {session == null
          ?
          <LoginFallback/>
          :
          <ModsUploadComponent/>
        }
      </div>
    </>
  )
}