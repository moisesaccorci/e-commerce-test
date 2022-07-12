import { Request, Response } from "express"
import { Product } from "../models"
import { ProductCreationAttributes } from "../models/Product"
import { productService } from '../services/productService'


export const productsController = {
    index: async (req: Request, res: Response) => {
        try {
            const products = await Product.findAll({
                attributes: ['id', 'name', 'description', 'price', 'user_id', 'created_at', 'thumbnail_url'],
                order: [['id', 'ASC']]
            })

            return res.json(products)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },

    show: async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const product = await productService.findByIdWithDetails(id)
            return res.json(product)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },
    create: async (req: Request, res: Response) => {
        const { name, description, price, user_id, created_at, updated_at, thumbnail_url } = req.body

        try {

            const product = await productService.create({
                name,
                description,
                price,
                user_id,
                created_at,
                updated_at,
                thumbnail_url
            })

            return res.status(201).json(product)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },

    update: async (req: Request, res: Response) => {
        const { id, name, description, price, updated_at } = req.body
        //const values = req.body
        const obj = await productService.findByIdWithDetails(id)

        if (obj) {
            try {
                const product = await obj.update({
                    name,
                    description,
                    price,
                    updated_at
                })
                return res.status(201).json(product)
            } catch (err) {
                if (err instanceof Error)
                    return res.status(400).json({ message: err.message })
            }
        }
    },
    delete: async (req: Request, res: Response) => {
        const { id } = req.params
        const obj = await productService.findByIdWithDetails(id)

        if (obj) {
            try {
                const product = await obj.destroy(id)
                return res.status(201).json(product)

            } catch (error) {
                if (error instanceof Error)
                return res.status(400).json({ message: error.message})
            }

        }
    }

}


