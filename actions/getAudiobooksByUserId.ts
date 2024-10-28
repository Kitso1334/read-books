import { Audiobooks } from "@/types";
import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

const getAudiobooksByUserId = async(): Promise<Audiobooks[]>=>{
    const supabase=createServerComponentClient({
        
        cookies:cookies
    });
    const {data: sessionData, 
        error:sessionError }=await supabase.auth.getSession();
        if(sessionError){
           console.log(sessionError.message);
           return[];  
        }
        const{data,error}=await supabase
        .from('Audiobooks')
        .select('*')
        .eq('user_id',sessionData.session?.user.id)
        .order('created_at',{ascending:false});
        if(error){
            console.log(error.message)
        }
        return data as any || [];

   

}
export default getAudiobooksByUserId;