import { Audiobooks } from "@/types";
import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";
const useOnPlay = (audiobooks:Audiobooks[])=>{
    const player = usePlayer();
    const authModal =useAuthModal();
    const {user}= useUser();

    const onPlay =(id:string)=>{
        if(!user){
            return authModal.onOpen();
        }
        player.setId(id)
        player.setIds(audiobooks.map((audiobook)=>audiobook.id))
    };
    return onPlay

}
export default useOnPlay;