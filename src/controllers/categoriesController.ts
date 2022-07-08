import { Request, Response } from 'express'
import { Category } from '../models'
import { getPaginationParams } from '../helpers/getPaginationParams'
import { categoryService } from '../services/categoryService'


export const categoriesController = {
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
            const { count, rows } = await Category.findAndCountAll({
                attributes: ['id', 'name', 'position'],
                order: [['position', 'ASC']],
                limit: perPageNumber,
                offset
            })

            return res.json({
                categories: rows,
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
            const category = await categoryService.findByIdWithProducts(id)
            return res.json(category)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    }

}