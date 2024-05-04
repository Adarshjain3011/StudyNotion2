
import CredentialsProvider from 'next-auth/providers/credentials';

import GoogleProvider from "next-auth/providers/google";

import GitHubProvider from "next-auth/providers/github";

import { signIn } from 'next-auth/react';

export const NEXT_AUTH_CONFIG = {

    providers: [

        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'email', type: 'text', placeholder: '' },
                password: { label: 'password', type: 'password', placeholder: '' },
            },
            async authorize(credentials: any) {

                return {
                    id: "user1",
                    name: "asd",
                    userId: "asd",
                    email: "ramdomEmail"
                };
            },
        }),

        GoogleProvider({

            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",

        }),

        GitHubProvider({

            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SCERET || "",

        })

    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: async ({ user, token }: any) => {
            if (user) {
                token.uid = user.id;
            }
            return token;
        },
        session: ({ session, token, user }: any) => {
            if (session.user) {
                session.user.id = token.uid
            }
            return session
        }
    },
    pages:{

        signIn:"/auth/signin",
        // error: '/auth/error',
        // verifyRequest: '/auth/verify-request',
        // newUser: '/auth/new-user',
        // newUserDone: '/auth/new-user-done',
        // newUserError: '/auth/new-user-error',
        // newUserVerifyRequest: '/auth/new-user-verify-request',
        // newUserVerifyRequestDone: '/auth/new-user-verify-request-done',
        // newUserVerifyRequestError: '/auth/new-user-verify-request-error',
        // newUserVerifyRequestSent: '/auth/new-user-verify-request-sent',
        // newUserVerifyRequestSentDone: '/auth/new-user-verify-request-sent-done',
    }
    
}



