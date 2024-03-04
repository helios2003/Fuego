import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


const blogRouter = new Hono()

blogRouter.post('/blog', async (req, res) => {
    

})

blogRouter.put('/blog', async (req, res) => {

})


blogRouter.get('/blog/:id', async (req, res) => {

})

blogRouter.get('/blog/bulk', async (req, res) => {

})