import fs from 'fs/promises'
import path from 'path'

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
    try {
      await fs.writeFile(filePath, content, 'utf-8')
      return 'File created successfully'
    } catch (error) {
      throw new Error('Error creating file')
    }
  }

  async deleteFile(filePath: string) {
    try {
      await fs.unlink(filePath)
      return 'File deleted successfully'
    } catch (error) {
      throw new Error('Error deleting file')
    }
  }

  async editFile(filePath: string, newContent: string) {
    try {
      await fs.writeFile(filePath, newContent, 'utf-8')
      return 'File edited successfully'
    } catch (error) {
      throw new Error('Error editing file')
    }
  }
}
