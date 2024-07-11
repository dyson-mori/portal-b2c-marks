import { NextRequest, NextResponse } from "next/server";
// import { getUrl } from "./lib/get-url";
// import { getToken } from "next-auth/jwt";

export function getUrl(path: string) {
  const baseUrl = process.env.NEXT_URL ?? '';
  const normalizePath = path && !path.startsWith('/') ? `/${path}` : path || '';

  return `${baseUrl}${normalizePath}`;
}

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token');
  const pathname = request.nextUrl.pathname;

  // const isAuth = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // if (pathname === '/login' && !!isAuth) {
  //   return NextResponse.redirect(new URL(getUrl('/app'), request.url));
  // };

  // if (pathname.includes('/app') && !isAuth) {
  //   return NextResponse.redirect(new URL(getUrl('/login'), request.url));
  // };

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico).*)'],
}