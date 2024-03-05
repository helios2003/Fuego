import { z } from 'zod'

export const signUpuserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
})

export const signInUserSchema = signUpuserSchema.omit({ name: true })

export const blogSchema = z.object({
    title: z.string(),
    content: z.string(),
    authorId: z.number()
})

