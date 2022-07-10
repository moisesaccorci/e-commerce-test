import { Request, Response } from "express"
import { Product } from "../models"
import { ProductCreationAttributes } from "../models/Product"
import { productService } from '../services/productService'

export const productsController = {
    index: async (req: Request, res: Response) => {
        const { page, perPage } = req.query

        const perPageNumber = typeof perPage === 'string' && parseInt(perPage, 10) > 0
            ? parseInt(perPage, 10)
            : 10

        const pageNumber = typeof page === 'string' && parseInt(page, 10) > 0
            ? parseInt(page, 10)
            : 1

        const offset = (pageNumber - 1) * perPageNumber

        try {
            const { count, rows } = await Product.findAndCountAll({
                attributes: ['id', 'name', 'description', 'price', 'thumbnail_url'],
                order: [['name', 'ASC']],
                limit: perPageNumber,
                offset
            })

            return res.json({
                page: pageNumber,
                perPage: perPageNumber,
                total: count
            })
        } catch (err) {

            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },

    show: async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const course = await productService.findByIdWithDetails(id)
            return res.json(course)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },
    create: async (req: Request, res: Response) => {
        const { name, description, price, user_id } = req.body

        try {
                               
            const product = await productService.create({
                name,
                description,
                price,
                user_id,
            })

            return res.status(201).json(product)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },
}   