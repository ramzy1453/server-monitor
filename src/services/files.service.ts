import fs from 'fs/promises'

export default class FilesService {
  async listFiles(dirPath?: string) {
    const files = await fs.readdir(dirPath || '.', { withFileTypes: true })
    return files.map((file) => ({
      name: file.name,
      isDirectory: file.isDirectory()
    }))
  }

  async readFile(filePath: string) {
    const file = await fs.readFile(filePath, 'utf-8')
    return file
  }

  async createFile(filePath: string, content: string) {
    await fs.writeFile(filePath, content, 'utf-8')
  }

  async deleteFile(filePath: string) {
    await fs.unlink(filePath)
  }

  async editFile(filePath: string, content: string) {
    await fs.writeFile(filePath, content, 'utf-8')
  }
}
