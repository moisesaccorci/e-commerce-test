"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const categoriesController_1 = require("./controllers/categoriesController");
const productsController_1 = require("./controllers/productsController");
const authController_1 = require("./controllers/authController");
const router = express_1.default.Router();
exports.router = router;
router.post('/auth/register', authController_1.authController.register);
router.post('/auth/login', authController_1.authController.login);
router.get('/categories', categoriesController_1.categoriesController.index);
router.get('/categories/:id', categoriesController_1.categoriesController.show);
router.get('/products', productsController_1.productsController.index);
router.get('/products/:id', productsController_1.productsController.show);