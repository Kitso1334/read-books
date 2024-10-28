"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";

import { Audiobooks } from "@/types";

interface SearchContentProps{
 audiobooks:Audiobooks[];

}

const SearchContent:React.FC<SearchContentProps> =({
    audiobooks
})=>{
    const onPlay=useOnPlay(audiobooks);
    if(audiobooks.length===0){
return (<div className="
flex
flex-col
gap-y-2
w-full
px-6
text-neutral-400">
    No audiobooks found
</div>)
    }

return(<div className="flex flex-col gap-y-2 w-full px-6 ">
    {audiobooks.map((audiobooks)=>(
        <div 
        key={audiobooks.id}
        className="flex items-center gap-x-4 w-full">
            <div className="flex-1 ">
                <MediaItem
                onClick={(id:string)=>onPlay(id)}
                data={audiobooks}/>

            </div>
            <LikeButton audiobookId={audiobooks.id}/>
            

        </div>
    ))}</div>)
}
export default SearchContent;