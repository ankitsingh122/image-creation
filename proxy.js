import { auth } from "@/auth";

const protectedRoutes = ["/generate", "/dashboard"];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isProtected = protectedRoutes.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );
  if (isProtected && !req.auth) {
    const url = new URL("/login", req.nextUrl);
    url.searchParams.set("callbackUrl", pathname);
    return Response.redirect(url);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
