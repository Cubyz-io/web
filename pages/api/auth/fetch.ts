import {SupabaseClient} from "@supabase/supabase-js";
import {User} from "@supabase/auth-js";

export async function getUser(supabase: SupabaseClient): Promise<User | undefined> {
  return (await supabase.auth.getUser()).data.user!
}