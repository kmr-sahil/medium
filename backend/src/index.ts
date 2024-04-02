import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
		JWT_SECRET: string
	}
}>();

app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", blogRouter)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})





export default app

// postgresql://sk2003311:V8scdRwBQIF7@ep-blue-bush-a5wcdh11.us-east-2.aws.neon.tech/medium?sslmode=require

// DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNmEyMWUzZTItZTdkNy00ODlkLWFjYWEtZDk3YzhlMDJlMjlhIiwidGVuYW50X2lkIjoiZjM1NDFjNDJjZjhhNzAxNjU3NTMyMmM4YTA4MmZjNzI5ZmZiZDg4N2VlZmQyZjY2YWVjYmFkMzdhZmIwN2UwMyIsImludGVybmFsX3NlY3JldCI6ImJhYzg2NGQ3LTEwZDQtNGQzZS04NjBhLTE5M2IwY2Q5ZWRiYiJ9.DK3383RvZE-L365z0M-WlgOza9fCayQMjySyWjBJR84"