import { Subscription, userDetails } from "@/types";
import { User } from "@supabase/auth-helpers-nextjs";
import { useSession, useSessionContext, useUser as useSupaUser} from "@supabase/auth-helpers-react";
import { error } from "console";
import { createContext, useContext, useEffect, useState } from "react";
type UserContextType={
    accessToken: string;
    user:User| null;
    userDetails: userDetails|null;
    isLoading: boolean;
    subscription: Subscription;
};
export const UserContext= createContext<UserContextType | undefined>(
    undefined
)
export interface Props{
[propName:string]:any
};

export const MyUserContextProvider =(props:Props)=>{
    const {
        session,
        isLoading: isLoadingUser,
        supabaseClient: supabase
     
    } = useSessionContext();
    const user = useSupaUser();
    const accessToken=session?.access_token?? null;
    const [isLoadingData,setisLoadingData] = useState(false);
    const [userDetails,setuserDetails]= useState<userDetails | null>(null);
    const [subscription,setsubscription]= useState<Subscription | null>(null);
    const getUserDetails =()=>supabase.from('users').select('*').single();
    const getSubscription =()=>supabase.from('Subscriptions').select('*,prices(*,products(*))').in('status',['trailing','active']).single();
    useEffect(()=>{if(user && !isLoadingData && !userDetails && !subscription ){
        setisLoadingData(true)
        Promise.allSettled([getUserDetails(),getSubscription()]).then(
            (results)=>{
            const userDetailsPromise=results[0];
            const SubscriptionPromise=results[1];
            if(userDetailsPromise.status==="fulfilled"){
            setuserDetails(userDetailsPromise.value.data as userDetails);
            }
            if(SubscriptionPromise.status==="fulfilled"){
                setsubscription(SubscriptionPromise.value.data as Subscription);
                }
                setisLoadingData(false);
                } 
                );
   
   }else if(!user && !isLoadingData && !isLoadingUser){
   setuserDetails(null);
    setsubscription(null);
   } }
,[user,isLoadingUser])
    
    const value ={
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingUser || isLoadingData,
        subscription

    };
    return<UserContext.Provider value={value}{...props}/>
};
export const useUser=()=>{
    const context = useContext(UserContext);
    if(context===undefined){
        throw new Error('useUser must be used within a MyUserContextProvider');
    }
    return context;

};