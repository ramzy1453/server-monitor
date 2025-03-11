import { Hono } from 'hono'

const authRoutes = new Hono()

authRoutes.post('/login', (c) => {
  return c.json({ message: 'Login successful' })
})

export { authRoutes }
