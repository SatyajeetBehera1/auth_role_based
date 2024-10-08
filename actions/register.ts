"use server"
import * as z from "zod"
import * as bcrypt from "bcryptjs"
import { generateVerificationToken } from "@/lib/tokens"

import { RegisterSchema } from "@/schemas"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { sendVerificationEmail } from "@/lib/mail"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)
    if (!validatedFields.success) {
        return {
            error: "Inavalid fields"
        }
    }


    const { email, password, name } = validatedFields.data


    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt)

    const existingUser = await getUserByEmail(email)
    if(existingUser){
        return {
            error:"Email already Taken!"
        }
    }

    await db.user.create({
        data:{
            name,
            email,
            password:hashedPassword,
        }
    })

    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    )
    
    return {
        sucess: "Confirmation Email sent"
    }
}