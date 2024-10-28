"use client";

import useGetAudiobookById from "@/hooks/useGetAudiobookById";
import useLoadAudiobookUrl from "@/hooks/useLoadAudiobookUrl";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

const Player =()=>{
    const player = usePlayer();
    const {audiobook} = useGetAudiobookById(player.activeId);

    const audiobookUrl= useLoadAudiobookUrl(audiobook!);

    if(!audiobook || !audiobookUrl || !player.activeId){
        return null;


    }

    return(<div className="
        fixed
        bottom-0
        bg-black
        w-full
        py-2
        h-[80px]
        px-4"
    >
        <PlayerContent
        key={audiobookUrl}
        audiobook={audiobook}
        audiobookUrl={audiobookUrl}
        /></div>)
}
export default Player;