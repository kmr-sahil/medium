import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from "hono";
import { decode, sign, verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from '@sahilkmr/medium-common'

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string
		JWT_SECRET: string
	}, 
    Variables : {
        userId: string
    }
}>();

blogRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    console.log(authHeader)
    // Split the header to extract the token part
    //const token = authHeader.split(' ')[1]; 
    // Assuming the header is "Bearer <token>"
    if (!authHeader) {
        c.status(403);
        return c.json({ message: "No token provided" });
    }
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            c.set("userId", user.id); // Assuming 'id' is the property you expect
            await next();
        } else {
            c.status(403);
            return c.json({ message: "Not logged in" });
        }
    } catch (error: any) {
        // It's good to handle specific errors for better debugging and security practices
        return c.json({ message: "Invalid or expired token", error: error.message });
    }
    
})

blogRouter.get('/bulk', async(c) => {
	
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())

    try {

        const blog = await prisma.blog.findMany({
            select:{
                content: true,
                title: true,
                id: true,
                published: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return c.json({ blog })
        
    } catch (error) {

        return c.text('Server error')
        
    }

})

blogRouter.get('/:id', async (c) => {
	const id = c.req.param('id')
	console.log(id);
	
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())

    try {

        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            },
        })

        return c.json({
            blog
        })
        
    } catch (error) {

        return c.text('Server error')
        
    }
})

blogRouter.post('/', async(c) => {

    const body = await c.req.json();
    const authorId = c.get("userId")

    const {success} = createBlogInput.safeParse(body)

    if(!success) {
        c.status(411)
        return c.json({
            message: "input not correct"
        })
    }

	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())

    try {

        const blog = await prisma.blog.create({
            data:{
                title: body.title,
                content: body.content,
                authorId: Number(authorId),
            }
        })

        return c.text('blog posted')
        
    } catch (error) {

        return c.text('Server error')
        
    }

})

blogRouter.put('/', async(c) => {

	const body = await c.req.json();

    const {success} = updateBlogInput.safeParse(body)

    if(!success) {
        c.status(411)
        return c.json({
            message: "input not correct"
        })
    }

	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())

    try {

        const blog = await prisma.blog.update({
            where: {
                id: body.id
            },
            data:{
                title: body.title,
                content: body.content
            }
        })

        return c.text('blog posted')
        
    } catch (error) {

        return c.text('Server error')
        
    }

})

