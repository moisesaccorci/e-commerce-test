import { Product } from "../models"

export const productService = {
  findByIdWithDetails: async (id: string) => {
    const productWithDetails = await Product.findByPk(id, {
      attributes: ['id', 'name', 'description', ['thumbnail_url', 'thumbnailUrl']],
     
    })

    return productWithDetails
  },
}