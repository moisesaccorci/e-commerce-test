import express from 'express'
import { productsController } from './controllers/productsController'
import { authController } from './controllers/authController'
import { ensureAuth } from './middlewares/auth'

const router = express.Router()
router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

router.get('/products', productsController.index)
router.get('/products/:id', productsController.show)
router.post('/products',productsController.create)

export { router }