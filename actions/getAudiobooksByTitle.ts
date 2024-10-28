import { Audiobooks } from "@/types";
import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import getAudiobooks from "./getAudiobooks";

const getAudiobooksByTitle = async(title: string): Promise<Audiobooks[]>=>{
    const supabase=createServerComponentClient({
        
        cookies:cookies
    });
    if(!title){
        const allAudiobooks = await getAudiobooks();
        return allAudiobooks;
    }

    const {data, error}=await supabase
    .from('Audiobooks')
    .select('*')
    .ilike('title',`%${title}%`)
    .order('created_at',{ascending:false});
    if(error){
        console.log(error)
    }
    return (data as any) || []

}
export default getAudiobooksByTitle;