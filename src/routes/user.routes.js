// routes/user.routes.js
import { Router } from 'express'
import { UserController } from '../controllers/user.controller.js'

const router = Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/', UserController.getAll)
router.get('/:id', UserController.getById)

export default router