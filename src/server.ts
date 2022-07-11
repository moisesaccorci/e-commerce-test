import express from "express"
import { router } from './routes'
import { sequelize } from "./database"
import cors from 'cors'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors());

app.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
    // res.header("Access-Control-Allow-Headers", "Authorization, Content-Type")
    // res.header("Access-Control-Request-Headers", "Content-Type, Authorization")
    // res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    // res.header('Access-Control-Allow-Credentials', 'true');
    // next();
});

app.use(express.static('public'))

app.use(router)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    sequelize.authenticate().then(() => {
        console.log('Connected to database!')
    })
    console.log(`Server running on http://localhost:${PORT}/admin`)
})