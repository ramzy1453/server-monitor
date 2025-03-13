import { Hono } from 'hono'
import MonitoringController from '../controllers/monitoring.controller.js'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const monitoringRoutes = new Hono()
const monitoringController = new MonitoringController()

monitoringRoutes.get('/stats', monitoringController.getStats)
monitoringRoutes.get('/processes', monitoringController.getProcesses)
monitoringRoutes.get('/disk', monitoringController.getDiskUsage)
monitoringRoutes.get(
  '/service/:serviceName',
  zValidator('param', z.object({ serviceName: z.string() })),
  monitoringController.checkServiceStatus
)

export { monitoringRoutes }
