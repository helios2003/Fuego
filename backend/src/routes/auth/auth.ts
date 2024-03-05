import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import * as CryptoJS from "crypto-js"
import { sign } from 'hono/jwt'

const authRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
}>()

authRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const payload = await c.req.json()
    try {
        const hashedPassword = CryptoJS.SHA256(payload.password).toString()
        const user = await prisma.user.create({
            data: {
                name: payload.name,
                email: payload.email,
                password: hashedPassword
            }
        })
        const token = await sign({ id: user.id }, c.env?.JWT_SECRET)
        c.status(201)
        return c.json({ "token": token })
    } catch(err) {
        c.status(503)
        return c.json({ msg: "Oops, Please try again later" })
    }
})

authRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    const payload = await c.req.json()
    try {
        const hashedPassword = CryptoJS.SHA256(payload.password).toString()
        const user = await prisma.user.findUnique({
            where: {
                email: payload.email,
                password: hashedPassword
            }
        })
        if (!user) {
            c.status(404)
            return c.json({ msg: "You are not authenticated "})
        }
        const token = await sign({ id: user.id }, c.env?.JWT_SECRET)
        c.status(200)
        return c.json({ "token": token })
    } catch(err) {
        c.status(503)
        return c.json({ msg : "Oops, Please try again later" })
    }
})

export default authRouter
