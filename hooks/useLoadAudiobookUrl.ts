import { Audiobooks } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadAudiobookUrl = (audiobook:Audiobooks)=>{
    const supabaseClient = useSupabaseClient ();

    if(!audiobook){
        return ''
    }
    const{data:audiobookData}= supabaseClient
    .storage
    .from('audiobooks')
    .getPublicUrl(audiobook.audiobook_path)
    
    return audiobookData.publicUrl

}
export default useLoadAudiobookUrl