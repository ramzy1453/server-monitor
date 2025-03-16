import { exec } from 'child_process'
import os from 'os'
import util from 'util'
import { formatBytes, formatUptime } from '../utils/format.js'

const execPromise = util.promisify(exec)

export default class MonitoringService {
  async getStats() {
    const totalMem = os.totalmem()
    const freeMem = os.freemem()
    const cpuUsage = await this.getCpuUsage()
    const uptime = os.uptime()

    return {
      totalMem: formatBytes(totalMem),
      freeMem: formatBytes(freeMem),
      usedMem: formatBytes(totalMem - freeMem),
      uptime: formatUptime(uptime),
      cpuUsage
    }
  }

  async getDiskUsage() {
    try {
      const { stdout } = await execPromise(
        'wmic logicaldisk get Size,FreeSpace /Value'
      )
      const matches = stdout.match(/FreeSpace=(\d+).*Size=(\d+)/s)

      if (matches) {
        const total = parseInt(matches[2])
        const free = parseInt(matches[1])
        return {
          total: formatBytes(total),
          free: formatBytes(free),
          used: formatBytes(total - free)
        }
      }
      return null
    } catch (error) {
      return null
    }
  }

  async getProcesses() {
    try {
      const { stdout } = await execPromise(
        'wmic process get ProcessId,Name,WorkingSetSize'
      )
      const lines = stdout.split('\n').slice(1)
      return lines
        .map((line) => {
          const parts = line.trim().split(/\s+/)
          if (parts.length >= 3) {
            return {
              pid: parseInt(parts.pop() || '0'),
              name: parts[0],
              memory: formatBytes(parseInt(parts.pop() || '0'))
            }
          }
          return null
        })
        .filter((p) => p !== null)
    } catch (error) {
      return []
    }
  }
  async checkServiceStatus(service: string) {
    try {
      const { stdout } = await execPromise(`sc query ${service}`)
      return stdout.includes('RUNNING') ? 'running' : 'stopped'
    } catch (error) {
      return 'unknown'
    }
  }

  private async getCpuUsage(): Promise<string> {
    try {
      const { stdout } = await execPromise('wmic cpu get LoadPercentage /Value')
      const match = stdout.match(/LoadPercentage=(\d+)/)
      return match ? `${match[1]}%` : 'N/A'
    } catch (error) {
      return 'N/A'
    }
  }
}
