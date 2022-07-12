import express from 'express'
import { productsController } from './controllers/productsController'
import { authController } from './controllers/authController'
import cors from 'cors'
import path from "path"
import multer from 'multer'
import fs from 'fs'

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
    },
});

const upload = multer({
    storage: multerStorage,
});

// import { ensureAuth } from './middlewares/auth'
const app = express()
const router = express.Router()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors());


// User and login
router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)
router.get('/auth/login', authController.index)
router.get('/auth/login/getuser', authController.get)

// Products index and registration
router.post('/products', productsController.create)
router.get('/products', productsController.index)
router.get('/products/:id', productsController.show)
router.put('/products/:id', productsController.update)
router.delete('/products/:id', productsController.delete)
router.post('/upload', upload.single('file'), async (req, res, next) => {
    try {
        const newFile = await fs.writeFile(req.file?.filename, req.file, () => {
            // res.status(200).json({
            //     status: "success",
            //     message: "File created successfully!!",
            // });
            res.send(req.file?.filename)
        });
    } catch (error) {
        res.json({
            error,
        });
    }
})


export { router }