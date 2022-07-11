import express from 'express'
import { productsController } from './controllers/productsController'
import { authController } from './controllers/authController'
import { ensureAuth } from './middlewares/auth'
const app = express()
const router = express.Router()



app.use(express.urlencoded({ extended: true }))
app.use(express.json())



router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

router.get('/products', productsController.index)
router.get('/products/:id', productsController.show)
router.post('/products', productsController.create)

export { router }