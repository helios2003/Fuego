import { Hono } from 'hono'
import { verify } from 'hono/jwt'

const authMiddleware = new Hono<{
	Bindings: {
        JWT_SECRET: string
	}
    Variables: {
        jwtPayload: string
    }
}>()

authMiddleware.use("/blog/*", async (c, next) => {
    const jwt = c.req.header("Authorization")
    if (!jwt) {
        c.status(403)
        return c.json({ msg: "You are not authorized" })
    }
    const token = jwt.split(' ')[1]
    const payload = await verify(token, c.env.JWT_SECRET)
    if (!payload) {
        c.status(403)
        return c.json({ msg: "You are not authorized "})
    }
    c.set('jwtPayload', payload.username)
    await next()
})

export default authMiddleware