import { Product } from "./Product";
import { User } from './User'
User.hasMany(Product, { 
    as: 'products',
    foreignKey: {
        name: 'user_id',
        field: 'user_id'
    }
})

Product.belongsTo(User)

export {
    Product,
    User
}