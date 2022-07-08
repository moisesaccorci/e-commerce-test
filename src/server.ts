import express from "express"
import { adminJs, adminJsRouter } from "./adminjs"
import { router } from './routes'
import { sequelize } from "./database"

const app = express()

app.use(express.static('public'))

app.use(router)

app.use(adminJs.options.rootPath, adminJsRouter)

app.use(express.static('public'))
app.use(adminJs.options.rootPath, adminJsRouter)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
     sequelize.authenticate().then(() => {
        console.log('Connected to database!')
    })
    console.log(`Server running on http://localhost:${PORT}/admin`)
})