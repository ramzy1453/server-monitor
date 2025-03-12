import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import MonitoringService from './services/monitoring.service.js'

const app = new Hono()

app.use('*', logger())

const monitoring = new MonitoringService()

serve(
  {
    fetch: app.fetch,
    port: 5000
  },
  async (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
    console.log(await monitoring.getProcesses())
  }
)
