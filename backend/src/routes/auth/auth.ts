import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import * as CryptoJS from "crypto-js"
import { sign } from 'hono/jwt'
import { signInUserSchema, signUpuserSchema } from "../../zod/schema"

const authRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
}>()

function generateSalt(length: number) {
    let salt = CryptoJS.lib.WordArray.random(length / 2).toString()
    return salt;
  }

authRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    let payload = await c.req.json()
    payload = signUpuserSchema.safeParse(payload)
    if (!payload.success) {
        c.status(400)
        return c.json({ msg: 'Invalid request data' })
    }

    try {
        const hashedPassword = CryptoJS.SHA256(payload.password + generateSalt(16)).toString()
        const user = await prisma.user.create({
            data: {
                name: payload.data.name,
                email: payload.data.email,
                password: hashedPassword
            }
        })
        const token = await sign({ id: user.id }, c.env?.JWT_SECRET)
        c.status(201)
        return c.json({ "token": token, "name": user.name, "email": user.email, "authorId": user.id })
    } catch(err) {
        console.error(err)
        c.status(503)
        return c.json({ msg: "Oops, Please try again later" })
    }
})

authRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())

    let payload = await c.req.json()
    payload = signInUserSchema.safeParse(payload)

    if (!payload.success) {
        c.status(400)
        return c.json({ msg: 'Invalid request data' })
    }

    try {
        const hashedPassword = CryptoJS.SHA256(payload.password + generateSalt(16)).toString()
        const user = await prisma.user.findUnique({
            where: {
                email: payload.data.email,
                password: hashedPassword
            }
        })
        if (!user) {
            c.status(404)
            return c.json({ msg: "User doesn't exist" })
        }
        const token = await sign({ id: user.id }, c.env?.JWT_SECRET)
        c.status(200)
        return c.json({ "token": token, "name": user.name, "email": user.email })
    } catch(err) {
        c.status(503)
        return c.json({ msg : "Oops, Please try again later" })
    }
})

export default authRouter
