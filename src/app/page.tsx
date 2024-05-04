
"use client "

import { signIn } from "next-auth/react"; 

import AppBar from "@/components/appBar";

export default function Home() {

  return (

    <div className="text-3xl">

      hellow world 

      <AppBar></AppBar>

    </div>
    
  );
}





