import type { Context } from 'hono'
import FilesService from '../services/files.service.js'
import { createResponse } from '../utils/response.js'

export default class FilesController {
  private filesService: FilesService
  constructor() {
    this.filesService = new FilesService()
  }

  listFiles = async (c: Context) => {
    const dirPath = c.req.query('dirPath')

    try {
      const files = await this.filesService.listFiles(dirPath)
      return createResponse(c, files, 'Files fetched successfully', 200)
    } catch (error: any) {
      return createResponse(c, null, error.message, 404)
    }
  }
  readFile = async (c: Context) => {
    const filePath = c.req.query('filePath')!
    console.log({ filePath })
    try {
      const files = await this.filesService.readFile(filePath)
      return createResponse(c, files, 'File content fetched successfully', 200)
    } catch (error: any) {
      return createResponse(c, null, error.message, 404)
    }
  }
  createFile = async (c: Context) => {}
  deleteFile = async (c: Context) => {}
  editFile = async (c: Context) => {}
}
