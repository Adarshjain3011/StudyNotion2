

import NextAuth from "next-auth";


import { NEXT_AUTH_CONFIG } from "@/app/lib/auth";

const handler = NextAuth(NEXT_AUTH_CONFIG)


export const GET = handler;

export const POST = handler;







