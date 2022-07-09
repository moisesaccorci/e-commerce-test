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
        const { page, perPage } = req.query;
        const perPageNumber = typeof perPage === 'string' && parseInt(perPage, 10) > 0
            ? parseInt(perPage, 10)
            : 10;
        const pageNumber = typeof page === 'string' && parseInt(page, 10) > 0
            ? parseInt(page, 10)
            : 1;
        const offset = (pageNumber - 1) * perPageNumber;
        try {
            const { count, rows } = yield models_1.Product.findAndCountAll({
                attributes: ['id', 'name', 'description', 'price', 'thumbnailUrl'],
                order: [['name', 'ASC']],
                limit: perPageNumber,
                offset
            });
            return res.json({
                categories: rows,
                page: pageNumber,
                perPage: perPageNumber,
                total: count
            });
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
    })
};
