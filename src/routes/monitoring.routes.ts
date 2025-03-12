import { Hono } from 'hono'

const monitoringRoutes = new Hono()

monitoringRoutes.get('/stats', (c) => c.text('stats'))
monitoringRoutes.get('/processes', (c) => c.text('processes'))
monitoringRoutes.get('/disk', (c) => c.text('disk'))
monitoringRoutes.get('/service/:name', (c) => c.text('service'))

export { monitoringRoutes }
