'use client';

import {ContextType, createContext, useContext, useState} from 'react';
import {createClient} from "@/utils/supabase/client";
import {Session, SupabaseClient} from "@supabase/supabase-js";

type MaybeSession = Session | null;

const AppContext = createContext<{
    supabase: SupabaseClient;
    session: MaybeSession;
}>(null!)


export function useAppContext() {
    return useContext(AppContext);
}


export function AppProvider({session, children}: Omit<
    ContextType<typeof AppContext>,
    | "supabase"
    | "session"
> & {
    session: MaybeSession
    children: React.ReactNode;
}) {

    const [supabase] = useState(() => createClient());
    return (
        <AppContext.Provider value={{ supabase, session }}>
            <>{children}</>
        </AppContext.Provider>
    );
}

export const useSupabase = () => useContext(AppContext);

