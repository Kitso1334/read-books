"use client" ;

import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { Audiobooks } from "@/types";
import { AiOutlinePlus } from "react-icons/ai";
import { GiBookshelf } from "react-icons/gi";
import { TbPlaylist } from "react-icons/tb";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";

interface LibraryProps{
audiobooks:Audiobooks[];

}
const Library:React.FC<LibraryProps> = ({
    audiobooks
}) =>{
    const AuthModal = useAuthModal();
    const {user} = useUser();
    const onPlay=useOnPlay(audiobooks);
    const uploadModal = useUploadModal();
    const onClick=()=>{
        if(!user){
            return AuthModal.onOpen();
            
        }
        return uploadModal.onOpen();
        //TODO: Check subscriptions 
     }
    return(
        <div className="flex flex-col">
            <div className="
            flex
            items-center
            justfiy-between
            px-5
            pt-4
            ">
                <div className="
               
               inline-flex
               items-center
               gap-x-2"
                >
                    <GiBookshelf className="text-neutral-400" size={26}/>

                <p className="
                text-neutral-400
                font-medium
                text-md">
                    Book Library
                </p>
                </div>
                <AiOutlinePlus
                onClick={onClick}
                size={26}
                className="
                text-neutral-400
                cursor-pointer
                hover:text-white
                transition"/>
            </div>
            <div className="
            flex
            flex-col
            gap-y-2
            mt-4
            px-3">
                {audiobooks.map((item)=>(
                    <MediaItem
                onClick={(id:string)=>onPlay(id)}
                key={item.id}
                data={item}/>))}

            </div>
        
        </div>
    )
}
export default Library;