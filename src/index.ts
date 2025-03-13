import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import MonitoringService from './services/monitoring.service.js'
import { routes } from './routes/index.js'

const app = new Hono()

app.use('*', logger())
app.route('/', routes)

serve(
  {
    fetch: app.fetch,
    port: 5000
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  }
)
