import { sequelize } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'
import bcrypt from 'bcrypt'

type CheckPasswordCallback = (err: Error | undefined, isSame: boolean) => void

export interface UserAttributes {
    id: number
    name: string
    surname: string
    email: string
    password: string
    role: 'admin' | 'user'
}

export interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
    checkPassword: (password: string, callbackfn: CheckPasswordCallback) => void
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
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    surname: {
        allowNull: false,
        type: DataTypes.STRING
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
},
 {
    hooks: {
        beforeSave: async (user) => {
            if (user.isNewRecord || user.changed('password')) {
                user.password = await bcrypt.hash(user.password.toString(), 10)
            }
        }
    },
    underscored: true
})
User.prototype.checkPassword = function (password: string, callbackfn: (err: Error | undefined, isSame: boolean) => void) {
    bcrypt.compare(password, this.password, (err, isSame) => {
        if (err) {
            callbackfn(err, false)
        } else {
            callbackfn(err, isSame)
        }
    })
}