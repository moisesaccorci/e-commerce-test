"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const productsController_1 = require("./controllers/productsController");
const authController_1 = require("./controllers/authController");
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const multerStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
    },
});
const upload = (0, multer_1.default)({
    storage: multerStorage,
});
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
router.post('/upload', upload.single('file'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const newFile = yield fs_1.default.writeFile((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename, req.file, () => {
            var _a;
            // res.status(200).json({
            //     status: "success",
            //     message: "File created successfully!!",
            // });
            res.send((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename);
        });
    }
    catch (error) {
        res.json({
            error,
        });
    }
}));
