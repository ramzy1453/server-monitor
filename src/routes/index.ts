import { Hono } from 'hono'
import { authRoutes } from './auth.routes.js'
import { monitoringRoutes } from './monitoring.routes.js'
import { filesRoutes } from './files.routes.js'
import { errorMiddleware } from '../middlewares/error.middleware.js'

const routes = new Hono().basePath('/api/v1')

routes.route('/auth', authRoutes)
routes.route('/monitoring', monitoringRoutes)
routes.route('/files', filesRoutes)
routes.onError(errorMiddleware)

export { routes }
