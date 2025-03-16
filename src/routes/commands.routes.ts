import { Hono } from 'hono'
import CommandsController from '../controllers/commands.controller.js'
import CommandsValidator from '../lib/validators/commands.validator.js'

const commandsRoutes = new Hono()
const commandsController = new CommandsController()
const commandsValidator = new CommandsValidator()

commandsRoutes.post(
  '/run',
  commandsValidator.runCommand(),
  commandsController.runCommand
)
commandsRoutes.get(
  '/status',
  commandsValidator.checkServiceStatus(),
  commandsController.checkServiceStatus
)
commandsRoutes.post(
  '/start',
  commandsValidator.manageService(),
  commandsController.startService
)
commandsRoutes.post(
  '/stop',
  commandsValidator.manageService(),
  commandsController.stopService
)
commandsRoutes.post(
  '/restart',
  commandsValidator.manageService(),
  commandsController.restartService
)

export { commandsRoutes }
