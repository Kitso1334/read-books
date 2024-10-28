import { Audiobooks } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast";

const useGetAudiobookById =(id?:string)=>{
    const [isLoading,setIsLoading]= useState(false);
    const [audiobook,setAudiobook]=useState<Audiobooks | undefined>(undefined)
    const {supabaseClient}=useSessionContext();

    useEffect(()=>{
        if(!id){
            return 
        }
        setIsLoading(true);
        const fecthAudiobook= async ()=>{
            const {data, error}= await supabaseClient
            .from('Audiobooks')
            .select('*')
            
            .eq('id',id)
            .single()

            if(error){
                setIsLoading(false);
                return toast.error(error.message)
            }

            setAudiobook(data as Audiobooks);
            setIsLoading(false)

        }
        fecthAudiobook();
    
    },[id, supabaseClient])

    return useMemo(()=>({
        isLoading,
        audiobook

    }),[isLoading,audiobook])
};
export default useGetAudiobookById