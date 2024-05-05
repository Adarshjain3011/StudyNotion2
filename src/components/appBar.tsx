
"use client"

import React from "react";

import { useRouter } from "next/navigation";

import {signIn,signOut,useSession} from "next-auth/react";

export default function AppBar(){

    const session = useSession();

    const router = useRouter();

    return (

        <div>

            <button onClick={()=>{
    
                signIn();
    
            }}>Signin </button>
    
    
            <button onClick={()=>{
    
                signOut();
    
            }}>SignOut </button>

            {JSON.stringify(session)}

        </div>


    )
}




