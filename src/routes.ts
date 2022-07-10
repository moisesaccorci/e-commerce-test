import express from 'express'
import { categoriesController } from './controllers/categoriesController'
import { productsController } from './controllers/productsController'
import { authController } from './controllers/authController'
import { ensureAuth } from './middlewares/auth'

const app = express()
const router = express.Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)


router.get('/categories', categoriesController.index)
router.get('/categories/:id', categoriesController.show)


router.get('/products', productsController.index)
router.get('/products/:id', productsController.show)


export { router }