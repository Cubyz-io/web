"use server"
import Head from "next/head"
import ModsComponent from "@/components/pages/mods";
import {fetchMods} from "@/pages/api/mods/fetch";
import {Navbar} from "@/components/navbar";
import React from "react";

export default async function ModsPage() {
  const mods = fetchMods()


  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_TITLE} » Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

      </Head>
      <div className="flex min-h-screen flex-col">
        <Navbar/>
        <div className="flex min-h-screen flex-col">
          <div className="flex flex-1 flex-col lg:flex-row">
            <ModsComponent loadMods={mods}/>
          </div>
        </div>
      </div>
    </>
  )
}
