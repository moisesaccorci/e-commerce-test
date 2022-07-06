import express from "express"
import { adminJs, adminJsRouter } from "./adminjs"
import { sequelize } from "./database"

const app = express()


app.use(express.static('public'))
app.use(adminJs.options.rootPath, adminJsRouter)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
     sequelize.authenticate().then(() => {
        console.log('Conexão ao banco de dados bem sucedida!')
    })
    console.log(`Servidor rodando na porta ${PORT}`)
})