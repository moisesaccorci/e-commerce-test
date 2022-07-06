import { sequelize } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'

export interface Product {
  id: number
  name: string
  description: string
  thumbnailUrl: string
  featured: boolean
  categoryId: number
}

export interface ProductCreationAttributes
  extends Optional<Product, 'id' | 'thumbnailUrl' | 'featured' > {}

export interface ProductInstance
  extends Model<Product, ProductCreationAttributes>, Product {}

export const Product = sequelize.define<ProductInstance, Product>('Products', {
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
  thumbnailUrl: {
    type: DataTypes.STRING
  },
  featured: {
    defaultValue: false,
    type: DataTypes.BOOLEAN
  },
  categoryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'categories', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  }
})