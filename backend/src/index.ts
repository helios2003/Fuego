import { Hono } from 'hono'
import authRouter from './routes/auth/auth'

export const app = new Hono<{
  Bindings: {
      DATABASE_URL: string
      JWT_SECRET: string
  }
}>()

app.route('/api/v1/user', authRouter)

export default app
