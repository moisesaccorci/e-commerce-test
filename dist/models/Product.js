"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const database_1 = require("../database");
const sequelize_1 = require("sequelize");
exports.Product = database_1.sequelize.define('Products', {
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
    thumbnailUrl: {
        type: sequelize_1.DataTypes.STRING
    },
    featured: {
        defaultValue: false,
        type: sequelize_1.DataTypes.BOOLEAN
    },
    categoryId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: 'categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    }
});