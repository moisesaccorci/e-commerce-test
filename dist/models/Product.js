"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const database_1 = require("../database");
const sequelize_1 = require("sequelize");
exports.Product = database_1.sequelize.define('products', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    description: {
        allowNull: false,
        type: sequelize_1.DataTypes.TEXT
    },
    price: {
        allowNull: false,
        type: sequelize_1.DataTypes.FLOAT
    },
    thumbnail_url: {
        type: sequelize_1.DataTypes.STRING
    },
    featured: {
        defaultValue: false,
        type: sequelize_1.DataTypes.BOOLEAN
    },
    user_id: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    }
}, {
    freezeTableName: true,
});
