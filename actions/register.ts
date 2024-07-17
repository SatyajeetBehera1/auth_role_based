"use server"
import * as z from "zod"
import * as bcrypt from "bcrypt"

import { RegisterSchema } from "@/schemas"
import { db } from "@/lib/db"

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

    const existingUser = await db.user.findUnique({
        where:{
            email,
        }
    })

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
    
    return {
        sucess: "You have make a ID in our Database"
    }
}