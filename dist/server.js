"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const database_1 = require("./database");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    // res.header("Access-Control-Allow-Headers", "Authorization, Content-Type")
    // res.header("Access-Control-Request-Headers", "Content-Type, Authorization")
    // res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    // res.header('Access-Control-Allow-Credentials', 'true');
    // next();
});
app.use(express_1.default.static('public'));
app.use(routes_1.router);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    database_1.sequelize.authenticate().then(() => {
        console.log('Connected to database!');
    });
    console.log(`Server running on http://localhost:${PORT}/admin`);
});
