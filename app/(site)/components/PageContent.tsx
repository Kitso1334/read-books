"use client";

import AudiobookItem from "@/components/AudiobookItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Audiobooks} from "@/types";

interface PageContentProps{
    audiobooks:Audiobooks[];
}
const PageContent:React.FC<PageContentProps> =({
    audiobooks
})=>{
    const onPlay = useOnPlay(audiobooks);
    if(audiobooks.length===0){
        return(<div
        className="mt-4 text-neutral-400 " >
            No audiobooks!
        </div>)
    }
    return(<div
    className="
    grid
    grid-cols-2
    sm:grid-col-3
    lg:grid-cols-4
    xl:grid-cols-5
    2xl:grid-cols-8
    gap-4
    mt-4" > 
   { audiobooks.map((item)=>(
    <AudiobookItem
    key={item.id}
    onClick={(id:string)=>onPlay(id)}
    data={item}/>
   ))}
    </div>)
}
export default  PageContent;