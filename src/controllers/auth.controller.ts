import type { Context } from 'hono'
import { AuthService } from '../services/auth.service.js'

export class AuthController {
  private authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  async reguster(c: Context) {
    const userData = await c.req.json()
    const user = await this.authService.register()
    return c.json(user, 201)
  }
}
