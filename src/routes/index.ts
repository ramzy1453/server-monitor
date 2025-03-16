import { Hono } from 'hono'
import { authRoutes } from './auth.routes.js'
import { monitoringRoutes } from './monitoring.routes.js'
import { filesRoutes } from './files.routes.js'
import { errorMiddleware } from '../middlewares/error.middleware.js'
import { commandsRoutes } from './commands.routes.js'

const routes = new Hono().basePath('/api/v1')

routes.onError(errorMiddleware)
routes.route('/auth', authRoutes)
routes.route('/monitoring', monitoringRoutes)
routes.route('/files', filesRoutes)
routes.route('/commands', commandsRoutes)

export { routes }
