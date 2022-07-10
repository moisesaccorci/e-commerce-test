import { Request, Response } from "express"
import { Product } from "../models"
import { ProductCreationAttributes } from "../models/Product"
import { productService } from '../services/productService'

export const productsController = {
    index: async (req: Request, res: Response) => {
        try {
          const products = await Product.findAll({
            attributes: ['id', 'name', 'description', 'price', 'user_id', 'created_at' ],
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
            const course = await productService.findByIdWithDetails(id)
            return res.json(course)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },
    create: async (req: Request, res: Response) => {
        const { name, description, price, user_id, created_at, updated_at } = req.body

        try {
                               
            const product = await productService.create({
                name,
                description,
                price,
                user_id,
                created_at,
                updated_at
            })

            return res.status(201).json(product)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },
}   