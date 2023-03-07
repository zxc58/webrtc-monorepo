import { Router } from 'express'
import { authController } from '../controllers'
const router = Router()
router.post('/auth/signup', authController.signUp)
router.post('/auth/signin', authController.signIn)
router.get('/auth/refresh/token', authController.refreshToken)
export default router
