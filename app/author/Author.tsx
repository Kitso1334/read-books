"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { Audiobooks } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthorProps{
    audiobooks_one:Audiobooks[];
}
const Author:React.FC<AuthorProps>=({
    audiobooks_one
})=>{
    const onPlay=useOnPlay(audiobooks_one);
    const router = useRouter();
    const {isLoading,user} = useUser();
    useEffect(()=>{
        if(!isLoading && !user){
            router.replace('/')

        }

    },[isLoading,user,router]);

    if(audiobooks_one.length===0){
        return(<div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">No liked audiobooks</div>);
    }
    return(<div className="flex flex-col gap-y-2 w-full p-6">

{audiobooks_one.map((audiobook) => (
<div key={audiobook.id} className="flex items-center gap-x-4 w-full">
<div className="flex-1">
<MediaItem
onClick={(id:string)=>onPlay(id)}
data={audiobook}/>

</div>
<LikeButton audiobookId={audiobook.id}/>

</div>

))}
    </div>)
}
export default Author;
