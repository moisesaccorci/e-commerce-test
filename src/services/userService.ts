import { User } from '../models'
import { UserCreationAttributes } from '../models/User'

export const userService = {
  findByEmail: async (email: string) => {
    const user = await User.findOne({
      attributes: [
        'id',
        'name',
        'surname',
        'email',
        'password'
      ],
      where: { email }
    })
    return user
  },

  findByIdWithDetails: async (id: string) => {
    const userWithDetails = await User.findByPk(id, {
      attributes: [
        'id',
        'email',
        'name',
        'surname',
        'role'
      ],

    })

    return userWithDetails
  },

  create: async (attributes: UserCreationAttributes) => {
    const user = await User.create(attributes)
    return user
  }
}