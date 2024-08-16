import NextAuth from "next-auth"
import authConfig from "./auth.config"
const { auth } = NextAuth(authConfig)
export default auth((req)=>{
    const isLoggedIn = !!req.auth


})

export const config={
    mmatcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}