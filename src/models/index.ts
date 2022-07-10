import { Product } from "./Product";
import { User } from './User'
User.hasMany(Product, { 
    as: 'products',
    foreignKey: {
        name: 'userId',
        field: 'user_id'
    }
})

Product.belongsTo(User)

export {
    Product,
    User
}