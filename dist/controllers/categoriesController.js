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
exports.categoriesController = void 0;
const models_1 = require("../models");
const categoryService_1 = require("../services/categoryService");
exports.categoriesController = {
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
            const { count, rows } = yield models_1.Category.findAndCountAll({
                attributes: ['id', 'name', 'position'],
                order: [['position', 'ASC']],
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
            const category = yield categoryService_1.categoryService.findByIdWithProducts(id);
            return res.json(category);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    })
};
