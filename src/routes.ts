import express from 'express'
import { productsController } from './controllers/productsController'
import { authController } from './controllers/authController'
// import { ensureAuth } from './middlewares/auth'
const app = express()
const router = express.Router()



app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// User and login
router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)
router.get('auth/login:id', authController.get)

// Products index and registration
router.post('/products', productsController.create)
router.get('/products', productsController.index)
router.get('/products/:id', productsController.show)
router.put('/products/:id', productsController.update)
router.delete('/products/:id', productsController.delete)


export { router }