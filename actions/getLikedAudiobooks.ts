import { Audiobooks } from "@/types";
import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

const getLikedAudiobooks = async(): Promise<Audiobooks[]>=>{
    const supabase=createServerComponentClient({
        
        cookies:cookies
    });
    const {data:{
        session

    }}= await supabase.auth.getSession();


    const {data, error}=await supabase
    .from('Liked_audiobooks')
    .select('*,Audiobooks(*)')
    .eq('user_id',session?.user.id)
    .order('created_at',{ascending:false});
    if(error){
        console.log(error)
        return []
    }

    if(!data){
        return [];
    }
    return data.map((item)=>({
        ...item.Audiobooks
    }))

}
export default getLikedAudiobooks;