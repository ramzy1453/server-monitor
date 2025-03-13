import { Hono } from 'hono'
import { authRoutes } from './auth.routes.js'
import { monitoringRoutes } from './monitoring.routes.js'

const routes = new Hono()

routes.route('/auth', authRoutes)
routes.route('/monitoring', monitoringRoutes)

export { routes }
