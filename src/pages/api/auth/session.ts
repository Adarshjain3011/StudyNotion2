import { getServerSession } from 'next-auth';

import { NEXT_AUTH_CONFIG } from '@/app/lib/auth';

export default async function handler(req:any, res:any) {

  const session = await getServerSession(req, res, NEXT_AUTH_CONFIG);
  if (session) {
    // User is authenticated
    return session

  } else {
    // User is not authenticated
        return "";
  }

}



