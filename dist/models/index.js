"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Product = void 0;
const Product_1 = require("./Product");
Object.defineProperty(exports, "Product", { enumerable: true, get: function () { return Product_1.Product; } });
const User_1 = require("./User");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return User_1.User; } });
User_1.User.hasMany(Product_1.Product, {
    as: 'products',
    foreignKey: {
        name: 'userId',
        field: 'user_id'
    }
});
Product_1.Product.belongsTo(User_1.User);
