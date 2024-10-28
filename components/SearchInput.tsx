"use client";
import qs from "query-string";

import { TypedEventTarget } from 'typescript-event-target';

import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "./Input";

const SeachInput=()=>{
    const router=useRouter();
    const [value,setValue]=useState<string>("")
    const debouncedValue=useDebounce<string>(value)

    useEffect(()=>{
     const query={
       title:debouncedValue, 
     };
     const url=qs.stringifyUrl({
      url:'/search',
      query:query
     });
     router.push(url);
    },[debouncedValue,router])
    
    


    return (
      
      <Input
      placeholder="what do you want to listen to?"
      value={value}
      
      onChange={(e)=>setValue((e.target as HTMLInputElement).value)}/>  
    );
}
export default SeachInput;