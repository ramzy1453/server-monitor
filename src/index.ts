import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { z } from 'zod'

const app = new Hono()

app.use('*', logger())

serve(
  {
    fetch: app.fetch,
    port: 5000
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  }
)
