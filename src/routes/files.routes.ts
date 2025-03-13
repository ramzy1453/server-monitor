import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import FilesController from '../controllers/files.controller.js'
import { z } from 'zod'

const filesRoutes = new Hono()
const filesController = new FilesController()

const dirValidator = zValidator(
  'query',
  z.object({
    dirPath: z.string().optional()
  })
)
const fileValidator = zValidator(
  'query',
  z.object({
    filePath: z.string()
  })
)

filesRoutes.get('/list', dirValidator, filesController.listFiles)
filesRoutes.get('/read', fileValidator, filesController.readFile)

export { filesRoutes }
