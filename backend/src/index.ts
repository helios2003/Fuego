import { Hono } from 'hono'
import { cors } from 'hono/cors'
import authRouter from './routes/auth/auth'
import blogRouter from './routes/blogs/blogs'

export const app = new Hono<{
  Bindings: {
      DATABASE_URL: string
      JWT_SECRET: string
  }
}>()

app.use('*', cors({
  origin: '*'
}))

app.route('/api/v1/user', authRouter)
app.route('/api/v1/blogs', blogRouter)

export default app
