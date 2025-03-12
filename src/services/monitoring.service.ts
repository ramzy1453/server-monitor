import { exec } from 'child_process'
import os from 'os'
import util from 'util'

const execPromise = util.promisify(exec)

export default class MonitoringService {
  async getStats() {
    const totalMem = os.totalmem()
    const freeMem = os.freemem()
    const cpuUsage = await this.getCpuUsage()
    const uptime = os.uptime()

    return {
      totalMem: this.formatBytes(totalMem),
      freeMem: this.formatBytes(freeMem),
      usedMem: this.formatBytes(totalMem - freeMem),
      cpuUsage,
      uptime: this.formatUptime(uptime)
    }
  }

  async getDiskUsage() {
    try {
      const { stdout } = await execPromise(
        'wmic logicaldisk get Size,FreeSpace /Value'
      )
      const matches = stdout.match(/FreeSpace=(\d+).*Size=(\d+)/s)

      if (matches) {
        const [_, total, free] = matches.map(parseInt)
        return {
          total: this.formatBytes(total),
          free: this.formatBytes(free),
          used: this.formatBytes(total - free)
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
              memory: this.formatBytes(parseInt(parts.pop() || '0'))
            }
          }
          return null
        })
        .filter((p) => p !== null)
    } catch (error) {
      return []
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

  private formatBytes(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return '0 Byte'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`
  }

  private formatUptime(seconds: number): string {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    return `${h}h ${m}m`
  }
}
