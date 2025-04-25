// routes/message.routes.js
import { Router } from 'express'
import { MessageController } from '../controllers/message.controller.js'

const router = Router()

router.post('/', MessageController.create)
router.get('/', MessageController.getAll)
router.get('/user/:senderId', MessageController.getBySenderId)

export default router