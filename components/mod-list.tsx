"use client"

import React, {use, useEffect, useMemo, useState} from "react"
import {Download, Globe, Search, Upload} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input";
import {ModType, SignedUrl} from "@/pages/api/mods/fetch";
import {createClient} from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";

export function ModList({
                          loadMods,
                        }: {
  loadMods: Promise<ModType[]>
}) {
  const [mods] = useState<ModType[]>(use(loadMods))
  const [filterValue, setFilterValue] = useState<string>("")
  const filteredMods = useMemo(() => {
    return filterValue === "" ? mods : mods.filter(mod => {
      return mod.title.toLowerCase().includes(filterValue.toLowerCase()) ||
        mod.description.toLowerCase().includes(filterValue.toLowerCase()) ||
        mod.url.toLowerCase().includes(filterValue.toLowerCase())
    });
  }, [filterValue, mods])
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage] = useState(4);
  const paginatedMods = useMemo(() => {
    return filteredMods.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  }, [page, filteredMods, rowsPerPage])
  const paginatedModsIconsPaths = useMemo(() => {
    return paginatedMods.map((mod: ModType) => `${mod.id}/${mod.icon}`);
  }, [paginatedMods])

  const [paginatedModsIcons, setPaginatedModsIcons] = useState<SignedUrl[]>();
  useEffect(() => {
    async function load() {
      const supabase = await createClient()
      console.log(paginatedModsIconsPaths)
      const resp = await supabase.storage.from("icons").createSignedUrls(paginatedModsIconsPaths, 3600);
      if (resp.data !== null) {
        setPaginatedModsIcons(resp.data)
      }

    }

    load();
  }, [paginatedModsIconsPaths]);
  const ModCard = ({mod}: { mod: ModType }) => {
    const icon = paginatedModsIcons?.find((icon) => icon.path === `${mod.id}/${mod.icon}`)?.signedUrl;
    console.log(icon);
    return (
      <Card
        className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <CardHeader className="relative pb-3">
          <div className="grid">
            <div className="grid grid-cols-8 gap-4">
              {
                icon != null && icon.length > 0
                  ?
                  <Image src={icon} alt={"Icon"} width={96} height={96} className="rounded-xl"/>
                  :
                  <div
                    className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center"/>
              }
              <div className="col-span-7">
                <div className="grid grid-cols-1">
                  <CardTitle
                    className="text-sm font-bold text-gray-600 dark:text-gray-400">
                    <div className="flex w-full justify-between ">
                      <div className="flex justify-start gap-2">
                        <Link href={mod.url}><span
                          className="dark:text-white text-2xl">{mod.title}</span></Link> by {mod.User.user_name}
                      </div>
                      <div className="col-span-1 flex flex-col justify-center items-center"><Download/> {mod.downloads}
                      </div>
                    </div>
                  </CardTitle>
                  <CardDescription
                    className="text-purple-600 dark:text-gray-300 font-semibold flex justify-start">{mod.description}</CardDescription>
                </div>
              </div>
            </div>

          </div>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="w-full sm:w-auto space-y-6">
      {/* Enhanced Filter and Controls */}
      <div
        className="flex flex-col lg:flex-row gap-4 items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
            <Input
              placeholder="Search mod..."
              value={(filterValue as string) ?? ""}
              onChange={(event) => setFilterValue(event.target.value)}
              className="pl-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-blue-500/20"
            />

          </div>
          <Button
            size="lg"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            asChild
          >
            <Link href="/mods/upload" className="flex items-center gap-2">
              Upload Mod
              <Upload className="w-5 h-5"/>
            </Link>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6">
        {(paginatedMods ?? []).map((mod) => (
          <ModCard key={mod.id} mod={mod}/>
        ))}
        {(!paginatedMods || paginatedMods.length === 0) && (
          <div className="col-span-full">
            <Card
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-lg">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div
                  className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center mb-4">
                  <Globe className="h-8 w-8 text-white"/>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No mods found</h3>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Enhanced Pagination */}
      <div
        className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredMods.length} mods
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page - 1)}
            disabled={page == 1}
            className="rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page + 1)}
            disabled={page * rowsPerPage > filteredMods.length}
            className="rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
