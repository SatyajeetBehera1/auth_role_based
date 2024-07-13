import * as z from "zod"

export const LoginSchema = z.object({
    email : z.string().email({
        message:"Email is required"
    }),
    password : z.string().min(6, {
        message:"Minimum 6 character requires"
    })
})
export const RegisterSchema = z.object({
    email : z.string().email({
        message:"Email is required"
    }),
    name : z.string().min(2, {
        message:"Name is Required"
    }),
    password : z.string().min(6, {
        message:"Minimum 6 character requires"
    })
})