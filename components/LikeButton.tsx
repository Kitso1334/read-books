"use cient";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { supabase } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiFillLike, AiOutlineHeart } from "react-icons/ai";


interface LikeButtonProps{
audiobookId:string;
}

const LikeButton:React.FC<LikeButtonProps> =({
audiobookId
})=>{
const router=useRouter();
const {supabaseClient} = useSessionContext();
const authModal=useAuthModal();
const {user}=useUser();

const[isLiked,setisLiked] = useState(false);

useEffect(()=>{
if(!user?.id){
return
}
const fetchData =async ()=>{
const {data, error}= await supabaseClient
.from('Liked_audiobooks')
.select('*')
.eq('user_id',user.id)
.eq('audiobook_id',audiobookId,)
.single();

if(!error && data){
setisLiked(true);

}


};
fetchData();

},[audiobookId,supabaseClient,user?.id]);

const Icon=isLiked? AiFillLike:AiFillLike;

const handleLike = async () => {
if (!user) {
return authModal.onOpen();
}

console.log("audiobookId:", audiobookId); // Check if audiobookId is valid

if (isLiked) {
const { error } = await supabaseClient
.from('Liked_audiobooks')
.delete()
.eq('user_id', user.id)
.eq('audiobook_id', audiobookId);

if (error) {
toast.error(error.message);
} else {
setisLiked(false);
}
} else {
const { error } = await supabaseClient
.from('Liked_audiobooks')

.insert({
audiobook_id: audiobookId, // Ensure this value is not null
user_id: user.id,

});

if (error) {
toast.error(error.message);
} else {
setisLiked(true);
toast.success('Audiobook likes you too!');
}
}

router.refresh();
}




return(<button onClick={handleLike}
className="
hover:opacity-75
transition">
<Icon color={isLiked? "#deb887":"white"} size={25}
/>
</button>)
}
export default LikeButton;