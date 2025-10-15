"use server"
import {createClient} from "@/utils/supabase/server";

export type ModType = {
  id: string
  title: string
  description: string
  url: string
  downloads: number
  icon: string
  User: {
    id: string,
    user_name: string
  }
}

export async function fetchMods() {
  const supabase = await createClient();

  const {data} = await supabase
    .from("Mod")
    .select('*,User(*)')
  return data as ModType[];
}

export type SignedUrl = {
  error: string | null;
  path: string | null;
  signedUrl: string;
}