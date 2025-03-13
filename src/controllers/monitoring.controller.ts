import type { Context } from 'hono'
import MonitoringService from '../services/monitoring.service.js'
import { createResponse } from '../utils/response.js'

export default class MonitoringController {
  private monitoringService: MonitoringService
  constructor() {
    this.monitoringService = new MonitoringService()
  }

  getStats = async (c: Context) => {
    try {
      const stats = await this.monitoringService.getStats()
      return createResponse(c, stats, 'Stats fetched successfully', 200)
    } catch (error) {
      return createResponse(c, null, 'Error when fetching stats', 404)
    }
  }
  getDiskUsage = async (c: Context) => {
    try {
      const diskUsage = await this.monitoringService.getDiskUsage()
      return createResponse(
        c,
        diskUsage,
        'Disk Usage data fetched successfully',
        200
      )
    } catch {
      return createResponse(c, null, 'Error when fetching disk usage', 404)
    }
  }
  getProcesses = async (c: Context) => {
    try {
      const processes = await this.monitoringService.getProcesses()
      return createResponse(c, processes, 'Processes fetched successfully', 200)
    } catch {
      return createResponse(c, null, 'Error when fetching processes', 404)
    }
  }

  checkServiceStatus = async (c: Context) => {
    const { name } = c.req.param()
    try {
      const processes = await this.monitoringService.checkServiceStatus(name)
      return createResponse(
        c,
        processes,
        'Service status fetched successfully',
        200
      )
    } catch {
      return createResponse(c, null, 'Error when fetching service status', 404)
    }
  }
}
