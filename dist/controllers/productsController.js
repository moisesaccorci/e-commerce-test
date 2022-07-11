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
exports.productsController = void 0;
const models_1 = require("../models");
const productService_1 = require("../services/productService");
exports.productsController = {
    index: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const products = yield models_1.Product.findAll({
                attributes: ['id', 'name', 'description', 'price', 'user_id', 'created_at', 'thumbnail_url'],
                order: [['id', 'ASC']]
            });
            return res.json(products);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    }),
    show: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const course = yield productService_1.productService.findByIdWithDetails(id);
            return res.json(course);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    }),
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, description, price, user_id, created_at, updated_at, thumbnail_url } = req.body;
        try {
            const product = yield productService_1.productService.create({
                name,
                description,
                price,
                user_id,
                created_at,
                updated_at,
                thumbnail_url
            });
            return res.status(201).json(product);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // const { id, name, description, price, updated_at } = req.body
        const values = req.body;
        const obj = yield models_1.Product.findOne({
            where: values.id
        });
        if (obj) {
            try {
                return obj.update(values);
            }
            catch (err) {
                console.log(err);
            }
            return res.status(201).json(obj);
        }
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.body;
        const obj = yield models_1.Product.findOne({
            where: id
        });
        if (obj) {
            try {
                return obj.destroy(id);
            }
            catch (error) {
                console.log(error);
            }
            return res.status(201).json(obj);
        }
    })
};
