import express from 'express'
import { categoriesController } from './controllers/categoriesController'
import { productsController } from './controllers/productsController'

const router = express.Router()

router.get('/categories', categoriesController.index)
router.get('/categories/:id', categoriesController.show)
router.get('/products', productsController.index)
router.get('/products/:id', productsController.show)

export { router }