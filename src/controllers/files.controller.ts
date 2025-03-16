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
  createFile = async (c: Context) => {
    const filePath = c.req.query('filePath')!
    const { content } = await c.req.json()

    try {
      await this.filesService.createFile(filePath, content)
      return createResponse(c, null, 'File created successfully', 200)
    } catch (error: any) {
      return createResponse(c, null, error.message, 404)
    }
  }

  deleteFile = async (c: Context) => {
    const filePath = c.req.query('filePath')!
    try {
      await this.filesService.deleteFile(filePath)
      return createResponse(c, null, 'File deleted successfully', 200)
    } catch (error: any) {
      return createResponse(c, null, error.message, 404)
    }
  }

  editFile = async (c: Context) => {
    const filePath = c.req.query('filePath')!
    const { content } = await c.req.json()

    try {
      await this.filesService.editFile(filePath, content)
      return createResponse(c, null, 'File edited successfully', 200)
    } catch (error: any) {
      return createResponse(c, null, error.message, 404)
    }
  }
}
