import { Category } from "./Category";
import { Product } from "./Product";

Category.hasMany(Product)

Product.belongsTo(Category)

export {
    Category,
    Product
}