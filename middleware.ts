import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req:NextResponse){
    const res= NextResponse.next();
    const supabase = createMiddlewareClient({
        
      res,
      req
    });
    await supabase.auth.getSession();
    return res;
}