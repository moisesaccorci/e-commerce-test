import { sequelize } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'
import bcrypt from 'bcrypt'

export interface UserAttributes {
    id: number
    firstName: string
    lastName: string
    birth: Date
    email: string
    password: string
    role: 'admin' | 'user'
}

export interface UserCreationAttributes
    extends Optional<UserAttributes, 'id'> { }

export interface UserInstance
    extends Model<UserAttributes, UserCreationAttributes>, UserAttributes { }

export const User = sequelize.define<UserInstance, UserAttributes>('users', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    firstName: {
        allowNull: false,
        type: DataTypes.STRING
    },
    lastName: {
        allowNull: false,
        type: DataTypes.STRING
    },
    birth: {
        allowNull: false,
        type: DataTypes.DATE
    },
    email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    password: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    role: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            isIn: [['admin', 'user']]
        }
    }
}, {
    hooks: {
        beforeSave: async (user) => {
            if(user.isNewRecord || user.changed('password')) {
                user.password = await bcrypt.hash(user.password.toString(), 10)
            }
        }
    }
})