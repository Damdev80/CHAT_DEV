import { Router } from 'express'
import { GroupController } from '../controllers/group.controller.js'
import { verifyToken } from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/', verifyToken, GroupController.getAll)
router.post('/', verifyToken, GroupController.create)
router.put('/:id', verifyToken, GroupController.update)
router.delete('/:id', verifyToken, GroupController.delete)

export default router
