// import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
  //   const token = await getToken({ req: request });
  //   const url = request.nextUrl;
  
  //   if (token &&
  //     (
    //       url.pathname.startsWith("/sign-in") ||
    //       url.pathname.startsWith("/sign-up") ||
    //       url.pathname.startsWith("/verify") ||
    //       url.pathname.startsWith("/")
    //     )
    //   ) {
      //     return NextResponse.redirect(new URL("/dashboard", request.url));
      //   }
      //   return NextResponse.redirect(new URL("/Home", request.url));
      // }
      
      // // See "Matching Paths" below to learn more
      // export const config = {
        //   matcher: [
          //             "/sign-in",
          //             "/sign-up", 
          //             "/",
          //             "/dashboard/:path*",
          //             "/verify/:path*"
          //             ]
          // };
          
export { default } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// ...existing code...
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // if user is signed in, prevent access to auth pages and root -> send to dashboard
  if (token && (pathname === "/sign-in" || pathname === "/sign-up" || pathname === "/verify" || pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // if user is NOT signed in and tries to access dashboard pages, send to sign-in
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // otherwise continue (no rewrite/redirect)
}
// ...existing code...
export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/",
    "/dashboard/:path*",
    "/verify/:path*"
  ]
};