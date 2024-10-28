import { Audiobooks, song } from "@/types";

import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadImage= (audiobook:Audiobooks)=>{
    const supabaseClient=useSupabaseClient();
    if(!audiobook){
        return null;
    }
    const { data:imageData } = supabaseClient
    .storage
    .from('images')
    .getPublicUrl(audiobook.image_path)
    return imageData.publicUrl;
       

}


export default useLoadImage;