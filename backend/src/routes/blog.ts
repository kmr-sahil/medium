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
    const currentPath = c.req.path;
    console.log(currentPath)

    if (currentPath === '/api/v1/blog/bulk' || currentPath.startsWith('/api/v1/blog/blog')) {
        console.log("here")
        await next();
    } else {
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

blogRouter.get('/blog/:id', async (c) => {
	const id = c.req.param('id')
	
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())

    try {

        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            },
            include: {
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });

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
                published: new Date()
            }
        })

        return c.json({
            message: 'Blog posted successfully',
            blog
        })
        
    } catch (error) {

        return c.text('Server error')
        
    }

})

blogRouter.get('/editcheck/:id', async(c) => {
    console.log("got it here")
    const authorId = c.get("userId")
    const id = c.req.param('id')

    const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())

    try {
        const checkBlog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            }
        })

        if(checkBlog?.authorId == Number(authorId)){
            c.status(200)
            return c.json({
                checkBlog
            })
        } else {
            c.status(403)
            return c.json({
                checkBlog: false
            })
        }
    } catch (error) {
        return c.text('Server error')
    }


})

blogRouter.put('/', async(c) => {

	const body = await c.req.json();
    const authorId = c.get("userId")

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

        const checkBlog = await prisma.blog.findFirst({
            where: {
                id: body.id
            }
        })

        console.log("here", authorId , checkBlog)

        if(checkBlog?.authorId == Number(authorId) ){

            const updatedBlog = await prisma.blog.update({
                where: {
                    id: body.id
                },
                data:{
                    title: body.title,
                    content: body.content
                }
            })

            c.status(200)
            return c.json({
                status: true,
                message: "Updated succesfully"
            })

        } else {
            c.status(403)
            return c.json({
                status: false,
                message: "Different author"
            })
        }
        
    } catch (error) {

        return c.text('Server error')
        
    }

})

