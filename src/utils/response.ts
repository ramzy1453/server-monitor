import type { Context } from 'hono'
import type { StatusCode } from 'hono/utils/http-status'

export function createResponse<T>(
  c: Context,
  data: T,
  message: string,
  statusCode: StatusCode
) {
  c.status(statusCode)

  return c.json({
    data,
    message,
    success: statusCode >= 200 && statusCode < 300
  })
}
