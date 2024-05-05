import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import bcrypt from 'bcrypt';
import { dbConnection } from '@/config/dbConfig';
import { isEMailExists } from '@/helper/isEmailExists';

interface Credentials {
  username: string;
  password: string;
}

// interface User {
//   id: string;
//   name: string;
//   userId: string;
//   email: string;
// }

const credentialsProvider = CredentialsProvider({
  name: 'Credentials',
  credentials: {
    username: { label: 'email', type: 'text', placeholder: '' },
    password: { label: 'password', type: 'password', placeholder: '' },
  },
  async authorize(credentials: Credentials | undefined, req) {
    if (!credentials) {

      throw new Error('Invalid credentials');

    }

    const { username: email, password } = credentials;

    // Check if email exists
    
    const isUserExists = await isEMailExists(email);

    if (!isUserExists) {

      throw new Error('Email does not exist');

    }

    if (isUserExists && isUserExists.isVerified === false) {
      throw new Error('Email is not verified');
    }

    // Check if password is correct

    const isPasswordCorrect = await bcrypt.compare(password, isUserExists.password);

    if (!isPasswordCorrect) {

      throw new Error('Password is incorrect');
    }

    return {

      id: isUserExists?._id,
      name: isUserExists?.userName,
      email: email,
      userImage:isUserExists?.userImage,
      role: isUserExists?.role
        
    };
  },
});

const googleProvider = GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
});

const gitHubProvider = GitHubProvider({
  clientId: process.env.GITHUB_CLIENT_ID || '',
  clientSecret: process.env.GITHUB_CLIENT_SCERET || '',
});

export const NEXT_AUTH_CONFIG = {
  providers: [credentialsProvider, googleProvider, gitHubProvider],
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
        session.user.id = token.uid;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
    //...
  },
};