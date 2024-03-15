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
        const salt = generateSalt(16)
        const hashedPassword = CryptoJS.SHA256(payload.password + salt).toString()
        const user = await prisma.user.create({
            data: {
                name: payload.data.name,
                email: payload.data.email,
                password: hashedPassword,
                salt: salt
            }
        })
        const token = await sign({ id: user.id }, c.env?.JWT_SECRET)
        c.status(201)
        return c.json({ "token": token, "name": user.name, "email": user.email, "authorId": user.id, "blogs": user.blogs })
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
    console.log(payload)
    payload = signInUserSchema.safeParse(payload)

    if (!payload.success) {
        c.status(400)
        return c.json({ msg: 'Invalid request data' })
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: payload.data.email,
            }
        })
        if (!user) {
            c.status(404)
            return c.json({ msg: "User doesn't exist" })
        }
        const hashedPassword = CryptoJS.SHA256(payload.password + user.salt).toString()
        if (hashedPassword !== user.password) {
            c.status(401)
            return c.json({ msg: "Invalid password" })
        }
        const token = await sign({ id: user.id }, c.env?.JWT_SECRET)
        c.status(200)
        return c.json({ "token": token, "name": user.name, "email": user.email, "authorId": user.id, "blogs": user.blogs })
    } catch(err) {
        c.status(503)
        return c.json({ msg : "Oops, Please try again later" })
    }
})

export default authRouter
