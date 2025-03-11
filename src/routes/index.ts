import { Hono } from 'hono'
import { authRoutes } from './auth.routes.js'

const routes = new Hono()

routes.route('/auth', authRoutes)

export { routes }
