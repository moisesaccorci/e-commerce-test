import { Category } from "./Category";
import { Product } from "./Product";
import { User } from './User'
Category.hasMany(Product)

Product.belongsTo(Category)

export {
    Category,
    Product,
    User
}