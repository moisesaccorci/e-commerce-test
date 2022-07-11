"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const productsController_1 = require("./controllers/productsController");
const authController_1 = require("./controllers/authController");
const cors_1 = __importDefault(require("cors"));
// import { ensureAuth } from './middlewares/auth'
const app = (0, express_1.default)();
const router = express_1.default.Router();
exports.router = router;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// User and login
router.post('/auth/register', authController_1.authController.register);
router.post('/auth/login', authController_1.authController.login);
router.get('/auth/login', authController_1.authController.index);
router.get('/auth/login/getuser', authController_1.authController.get);
// Products index and registration
router.post('/products', productsController_1.productsController.create);
router.get('/products', productsController_1.productsController.index);
router.get('/products/:id', productsController_1.productsController.show);
router.put('/products/:id', productsController_1.productsController.update);
router.delete('/products/:id', productsController_1.productsController.delete);
