"use server"
import {createClient} from "@/utils/supabase/server";
import {SubmitAddonData} from "@/components/mod-upload-form";
import {nanoid} from "nanoid";

export async function submitAddon(addon: SubmitAddonData) {
  const supabase = await createClient();
  const user = await supabase.auth.getUser()
  const buffer = Buffer.from(await addon.icon.arrayBuffer());
  const id = nanoid(6)
  await supabase
    .from("Mod")
    .insert({
      id: id,
      title: addon.title,
      description: addon.description,
      url: addon.url,
      author: user.data.user?.id,
      icon: addon.icon.name,
    })
  await supabase.storage
    .from("icons")
    .upload(`/${id}/${addon.icon.name}`, buffer, {
      cacheControl: "3600",
      upsert: false
    });
  return "/mods";
}