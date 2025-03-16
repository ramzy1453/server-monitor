import type { ErrorHandler } from 'hono'
import { HTTPException } from 'hono/http-exception'
import type { BlankEnv } from 'hono/types'
import { createResponse } from '../utils/response.js'

export const errorMiddleware: ErrorHandler<BlankEnv> = async (err, c) => {
  console.error('[Error]:', err)

  if (err instanceof HTTPException) {
    const response = err.getResponse()
    const data = await response.json()
    return createResponse(c, null, data.message || err.message, err.status)
  }

  const status = err instanceof Error ? 500 : 400
  return createResponse(
    c,
    null,
    err instanceof Error ? err.message : 'Unknown error occurred',
    status
  )
}
