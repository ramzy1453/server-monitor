import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)

export default class CommandsService {
  async runCommand(command: string) {
    try {
      const { stdout, stderr } = await execPromise(command)
      if (stderr) throw new Error(stderr)
      return stdout.trim()
    } catch (error) {
      throw new Error(`Command failed: ${error}`)
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

  async startService(service: string) {
    return this.runCommand(`net start ${service}`)
  }

  async stopService(service: string) {
    return this.runCommand(`net stop ${service}`)
  }

  async restartService(service: string) {
    await this.stopService(service)
    return this.startService(service)
  }
}
