import express from 'express'
import { categoriesController } from './controllers/categoriesController'
import { productsController } from './controllers/productsController'
import { authController } from './controllers/authController'
import { ensureAuth } from './middlewares/auth'

const router = express.Router()
router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)


router.get('/categories', ensureAuth, categoriesController.index)
router.get('/categories/:id', ensureAuth, categoriesController.show)


router.get('/products', productsController.index)
router.get('/products/:id', productsController.show)


export { router }