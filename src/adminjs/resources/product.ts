import { ResourceOptions } from "adminjs";

export const productResourceOptions: ResourceOptions = {
  navigation: 'Produtos',
  editProperties: ['name', 'description', 'uploadThumbnail', 'featured', 'categoryId'],
  filterProperties: ['name', 'description', 'featured', 'categoryId', 'createdAt', 'updatedAt'],
  listProperties: ['id', 'name', 'featured', 'categoryId'],
  showProperties: ['id', 'name', 'description', 'featured', 'thumbnailUrl', 'categoryId', 'createdAt', 'updatedAt']
}