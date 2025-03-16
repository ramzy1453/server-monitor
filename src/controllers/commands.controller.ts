import type { Context } from 'hono'
import CommandsService from '../services/commands.service.js'
import { createResponse } from '../utils/response.js'

export default class CommandsController {
  private commandsService: CommandsService

  constructor() {
    this.commandsService = new CommandsService()
  }

  runCommand = async (c: Context) => {
    const { command } = await c.req.json()
    const result = await this.commandsService.runCommand(command)
    return createResponse(c, result, 'Command executed successfully', 200)
  }

  checkServiceStatus = async (c: Context) => {
    const service = c.req.query('service')!
    const status = await this.commandsService.checkServiceStatus(service)
    return createResponse(c, status, 'Service status fetched successfully', 200)
  }

  startService = async (c: Context) => {
    const service = c.req.query('service')!
    await this.commandsService.startService(service)
    return createResponse(c, null, 'Service started successfully', 200)
  }

  stopService = async (c: Context) => {
    const service = c.req.query('service')!
    await this.commandsService.stopService(service)
    return createResponse(c, null, 'Service stopped successfully', 200)
  }

  restartService = async (c: Context) => {
    const service = c.req.query('service')!
    await this.commandsService.restartService(service)
    return createResponse(c, null, 'Service restarted successfully', 200)
  }
}
