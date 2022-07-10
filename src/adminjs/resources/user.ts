import { ResourceOptions } from "adminjs";

const userResourceOptions: ResourceOptions = {
  navigation: 'User Management',
  properties: {
    password: {
      type: 'password'
    },
    role: {
      availableValues: [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'Common User' }
      ]
    }
  },
  editProperties: [
    'name',
    'surname',
    'email',
    'password',
    'role'
  ],
  filterProperties: [
    'name',
    'surname',
    'email',
    'role',
    'createdAt',
    'updatedAt'
  ],
  listProperties: [
    'id',
    'name',
    'email',
    'role'
  ],
  showProperties: [
    'id',
    'name',
    'surname',
    'email',
    'role',
    'createdAt',
    'updatedAt'
  ],
}

export { userResourceOptions }