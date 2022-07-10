import { Product } from "./Product";
import { User } from './User'
User.hasMany(Product, { as: 'products' })

Product.belongsTo(User)

export {
    Product,
    User
}