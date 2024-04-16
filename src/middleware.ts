export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/((?!avatar|$).*)"],
  pages: {
    signOut: "/",
    signIn: "/",
  },
};
