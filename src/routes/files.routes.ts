import { Hono } from 'hono'
import FilesController from '../controllers/files.controller.js'
import FilesValidator from '../lib/validators/files.validator.js'

const filesRoutes = new Hono()
const filesController = new FilesController()
const filesValidator = new FilesValidator()

filesRoutes.get('/list', filesValidator.listFiles(), filesController.listFiles)
filesRoutes.get('/read', filesValidator.getFile(), filesController.readFile)
filesRoutes.post('/create', filesValidator.saveFile(), filesController.readFile)
filesRoutes.put('/edit', filesValidator.saveFile(), filesController.readFile)
filesRoutes.delete(
  '/delete',
  filesValidator.getFile(),
  filesController.readFile
)

export { filesRoutes }
