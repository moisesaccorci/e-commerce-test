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
exports.adminJsRouter = exports.adminJs = void 0;
const adminjs_1 = __importDefault(require("adminjs"));
const express_1 = __importDefault(require("@adminjs/express"));
const sequelize_1 = __importDefault(require("@adminjs/sequelize"));
const database_1 = require("../database");
const resources_1 = require("./resources");
const models_1 = require("../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
adminjs_1.default.registerAdapter(sequelize_1.default);
exports.adminJs = new adminjs_1.default({
    databases: [database_1.sequelize],
    rootPath: '/admin',
    resources: resources_1.adminJsResources,
    dashboard: {
        component: adminjs_1.default.bundle('../adminjs/components/Dashboard'),
        handler: (req, res, context) => __awaiter(void 0, void 0, void 0, function* () {
            const category = yield models_1.Category.count();
            const product = yield models_1.Product.count();
            const standardUsers = yield models_1.User.count({ where: { role: 'user' } });
            res.json({
                'Categories': category,
                'Products': product,
                'Users': standardUsers
            });
        }),
    },
    branding: {
        companyName: 'TS-Prototype',
        logo: '/lmwflix.png',
        theme: {
            colors: {
                primary100: '#ff0043',
                primary80: '#ff1a57',
                primary60: '#ff3369',
                primary40: '#ff4d7c',
                primary20: '#ff668f',
                grey100: '#151515',
                grey80: '#333333',
                grey60: '#4d4d4d',
                grey40: '#666666',
                grey20: '#dddddd',
                filterBg: '#333333',
                accent: '#151515',
                hoverBg: '#151515',
            }
        }
    }
});
exports.adminJsRouter = express_1.default.buildAuthenticatedRouter(exports.adminJs, {
    authenticate: (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield models_1.User.findOne({ where: { email } });
        if (user && user.role === 'admin') {
            const matched = yield bcrypt_1.default.compare(password, user.password);
            if (matched) {
                return user;
            }
        }
        return false;
    }),
    cookiePassword: 'cookieSenha'
}, null, {
    resave: false,
    saveUninitialized: false
});
// Router for development issues
// export const adminJsRouter = AdminJSExpress.buildRouter(adminJs)
