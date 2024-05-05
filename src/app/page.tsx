
"use client "

import { signIn } from "next-auth/react"; 

import AppBar from "@/components/appBar";

export default function Home() {

  return (

    <div className="text-3xl">

      helow welcome to the default page 

      <AppBar></AppBar>

    </div>
    
  );
}





