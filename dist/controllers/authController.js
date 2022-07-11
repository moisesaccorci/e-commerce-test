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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const userService_1 = require("../services/userService");
const jwtService_1 = require("../services/jwtService");
const models_1 = require("../models");
exports.authController = {
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, surname, email, password } = req.body;
        try {
            const userAlreadyExists = yield userService_1.userService.findByEmail(email);
            if (userAlreadyExists) {
                throw new Error('This e-mail already exists on our database');
            }
            const user = yield userService_1.userService.create({
                name,
                surname,
                email,
                password,
                role: 'user',
            });
            return res.status(201).json(user);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const user = yield userService_1.userService.findByEmail(email);
            if (!user) {
                return res.status(401).json({ message: 'This e-mail is not registered' });
            }
            user.checkPassword(password, (err, isSame) => {
                if (err) {
                    return res.status(400).json({ message: err.message });
                }
                if (!isSame) {
                    return res.status(401).json({ message: 'Password is incorrect' });
                }
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                };
                const token = jwtService_1.jwtService.getToken(payload, '7d');
                return res.json({ authenticated: true, user, token });
            });
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    }),
    get: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email } = req.params;
        const obj = yield models_1.User.findOne({
            attributes: [
                'id',
            ],
            where: { email }
        });
        return res.status(201).json(obj === null || obj === void 0 ? void 0 : obj.id);
    })
};
