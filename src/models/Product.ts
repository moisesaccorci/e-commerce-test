import { sequelize } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'

export interface Product {
  id: number
  name: string
  description: string
  price: number
  thumbnail_url: string
  featured: boolean,
  user_id: number
}

export interface ProductCreationAttributes
  extends Optional<Product, 'id' | 'thumbnail_url' | 'featured' | 'user_id'> { }

export interface ProductInstance
  extends Model<ProductAttributes, ProductCreationAttributes>, ProductAttributes { }

export const Product = sequelize.define<ProductInstance, ProductAttributes>('products', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  price: {
    allowNull: false,
    type: DataTypes.FLOAT
  },
  thumbnail_url: {
    type: DataTypes.STRING
  },
  featured: {
    defaultValue: false,
    type: DataTypes.BOOLEAN
  },
  user_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  }
},
{
  freezeTableName: true,
})