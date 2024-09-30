import NextAuth, { type DefaultSession} from "next-auth"
import { UserRoles } from "@prisma/client";

export type ExtendedUser = DefaultSession["USER"] & {
    role : UserRoles
}

declare module "next-auth" {
    interface session{
        user:ExtendedUser;
    }
}
