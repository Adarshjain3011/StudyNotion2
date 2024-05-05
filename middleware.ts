import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/app/lib/auth";
import { AccountType } from "@/constants/constant";

const PublicPaths = '/auth/';
const DefaultPage = ["/", "/unauthorized", "/something-went-wrong"];

export async function middleware(req: NextRequest, res: NextResponse) {
  const path = req.nextUrl.pathname;
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  if (DefaultPage.includes(path)) {
    return NextResponse.next();
  }

  const isPublicPath = path.startsWith(PublicPaths);

  if (session && isPublicPath) {
    return NextResponse.redirect(new URL(`/${(session.role)?.toLowerCase()}`, req.url));
  }

  if (!session && !isPublicPath) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  if (session) {
    const hasPermission = checkPermission(session.role, path);
    if (!hasPermission) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  return NextResponse.next();
}

function checkPermission(role: AccountType, path: any) {
    
  switch (role) {
    case AccountType.ADMIN:
      return path.includes('admin');
    case AccountType.STUDENT:
      return path.includes('student');
    case AccountType.Instructor:
      return path.includes('instructor');
    default:
      return false;
  }
}




