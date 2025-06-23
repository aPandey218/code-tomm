import { Router } from 'express';
import { login, logout } from '../controllers/authControllers'

export const authRouter = Router()
  .post('/login', login)
  .post('/logout', logout);