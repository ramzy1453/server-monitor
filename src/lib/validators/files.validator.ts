import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

export default class FilesValidator {
  listFiles() {
    return zValidator(
      'query',
      z.object({
        dirPath: z.string().optional()
      })
    )
  }

  getFile() {
    return zValidator(
      'query',
      z.object({
        filePath: z.string()
      })
    )
  }

  saveFile() {
    return zValidator(
      'json',
      z.object({
        filePath: z.string(),
        content: z.string()
      })
    )
  }
}
