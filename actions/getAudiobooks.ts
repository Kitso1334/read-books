import { Audiobooks } from "@/types";
import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

const getAudiobooks = async(): Promise<Audiobooks[]>=>{
    const supabase=createServerComponentClient({
        
        cookies:cookies
    });
   const { data, error } = await supabase
  .from('Audiobooks')
  .select(`
    *
  `)
  .order('author', { ascending: true });

    if(error){
        console.log(error)
    }
    return (data as any) || []

}
export default getAudiobooks;