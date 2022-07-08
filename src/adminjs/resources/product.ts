import uploadFileFeature from "@adminjs/upload";
import { FeatureType, ResourceOptions } from "adminjs";
import path from "path";

export const productResourceOptions: ResourceOptions = {
  navigation: 'Store',
  editProperties: ['name', 'description', 'uploadThumbnail', 'featured', 'categoryId', 'price'],
  filterProperties: ['name', 'description', 'featured', 'categoryId', 'createdAt', 'updatedAt', 'price'],
  listProperties: ['id', 'name', 'featured', 'categoryId'],
  showProperties: ['id', 'name', 'description', 'featured', 'thumbnailUrl', 'categoryId', 'createdAt', 'updatedAt', 'price']
}

export const productResourceFeatures: FeatureType[] = [
  uploadFileFeature({
    provider: {
      local: {
        bucket: path.join(__dirname, '..', '..', '..', 'uploads')
      }
    },
    properties: {
      key: 'thumbnailUrl',
      file: 'uploadThumbnail'
    },
    uploadPath: (record, filename) => `images/product-${record.get('categoryId')}/${filename}`
  })
]