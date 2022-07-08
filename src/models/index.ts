import { Category } from "./Category";
import { Product } from "./Product";
import { User } from './User'
Category.hasMany(Product, { as: 'products' })

Product.belongsTo(Category)

export {
    Category,
    Product,
    User
}