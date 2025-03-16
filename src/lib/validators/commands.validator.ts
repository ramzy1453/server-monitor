import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

export default class CommandsValidator {
  runCommand() {
    return zValidator(
      'json',
      z.object({
        command: z.string().min(1, 'Command cannot be empty')
      })
    )
  }

  checkServiceStatus() {
    return zValidator(
      'query',
      z.object({
        service: z.string().min(1, 'Service name is required')
      })
    )
  }

  manageService() {
    return zValidator(
      'json',
      z.object({
        service: z.string().min(1, 'Service name is required')
      })
    )
  }
}
