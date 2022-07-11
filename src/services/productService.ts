import { Product } from "../models"
import { ProductCreationAttributes } from "../models/Product"

export const productService = {
  findByIdWithDetails: async (id: string) => {
    const productWithDetails = await Product.findByPk(id, {
      attributes: ['id', 'name', 'description', ['thumbnail_url', 'thumbnail_url']],

    })

    return productWithDetails
  },

  create: async (attributes: ProductCreationAttributes) => {
    const product = await Product.create(attributes)
    return product
  },
}