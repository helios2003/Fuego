import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import authMiddleware from "../../middlewares/middleware"
import { blogSchema } from "../../zod/schema"

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        jwtPayload: string
    }
}>()

blogRouter.post('/blog', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    let payload = await c.req.json()
    payload = blogSchema.safeParse(payload)

    if (!payload.success) {
        c.status(400)
        return c.json({ msg: 'Invalid request data' })
    }
    try {
        const blog = await prisma.blog.create({
            data: {
                title: payload.data.title,
                content: payload.data.content,
                authorId: c.var.jwtPayload
            }
        })
        c.status(201)
        return c.json({ 
            msg: "Blog successfully created",
            id: blog.id
        })
    } catch(err) {
        c.status(503)
        return c.json({ msg: "Oops, Please try again later" })
    }
})

blogRouter.put('/blog', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    let payload = await c.req.json()
    payload = blogSchema.safeParse(payload)
    
    if (!payload.success) {
        c.status(400)
        return c.json({ msg: 'Invalid request data' })
    }

    try {
        const updateBlog = await prisma.blog.update({
            where: {
                id: payload.data.id,
                authorId: c.var.jwtPayload
            },
            data: {
                title: payload.data.title,
                content: payload.data.content
            }
        })
        if (!updateBlog) {
            c.status(404)
            return c.json({ msg: "Blog not found" })
        }
        c.status(200)
        return c.json({ 
            msg: "Blog successfully updated",
            id: updateBlog.id
        })
    } catch(err) {
        c.status(503)
        return c.json({ msg: "Oops, Please try again later" })
    }
})

blogRouter.get('/blog/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogId = c.req.param('id')
    try {
        const findBlog = prisma.blog.findUnique({
            where: {
                id: parseInt(blogId)
            }
        })
        if (!findBlog) {
            c.status(404)
            return c.json({ msg: "Blog not found" })
        }
        c.status(200)
        return c.json({ msg: findBlog })
    } catch(err) {
        c.status(503)
        return c.json({ msg: "Oops, Please try again later" })
    }
})

blogRouter.get('/blog/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
})

export default blogRouter