import {SupabaseClient} from "@supabase/auth-helpers-nextjs";
import {User} from "@supabase/auth-js";

export async function getUser(supabase: SupabaseClient): Promise<User | undefined> {
  return (await supabase.auth.getUser()).data.user!
}