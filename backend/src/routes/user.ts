import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signupInput } from '@sahilkmr/medium-common'

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string
		JWT_SECRET: string
	}
}>();


userRouter.post('/signup', async (c) => {

	try{

	const body = await c.req.json();

	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())

    const {success} = signupInput.safeParse(body)

    if(!success) {
        c.status(411)
        return c.json({
            message: "input not correct"
        })
    }

	const user = await prisma.user.create({
		data:{
			username: body.username,
			password: body.password,
			name: body.name
		}
	})

	const jwt = await sign({
		id: user.id, 
	}, c.env.JWT_SECRET)

	return c.json({ jwt })

	} catch(e){
		c.status(411)
		return c.text('Server error')
	}

	
})

userRouter.post('/signin', async(c) => {

	try{

		const body = await c.req.json();
	
		const prisma = new PrismaClient({
			datasourceUrl: c.env.DATABASE_URL,
		}).$extends(withAccelerate())
	
		const user = await prisma.user.findFirst({
			where:{
				username: body.username,
				password: body.password
			}
		})

		if(!user){
			c.status(403)
			return c.json({message: "Incorrect details"})
		}
	
		const jwt = await sign({
			id: user.id, 
		}, c.env.JWT_SECRET)
	
		return c.json({ jwt })
	
		} catch(e){
			c.status(411)
			return c.text('Server error')
		}
	
})

