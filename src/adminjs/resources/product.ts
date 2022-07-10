import uploadFileFeature from "@adminjs/upload";
import { FeatureType, ResourceOptions } from "adminjs";
import path from "path";

export const productResourceOptions: ResourceOptions = {
  navigation: 'Store',
  editProperties: ['name', 'description', 'uploadThumbnail', 'featured', 'userId', 'price'],
  filterProperties: ['name', 'description', 'featured', 'userId', 'created_at', 'updated_at', 'price'],
  listProperties: ['id', 'name', 'featured', 'userId'],
  showProperties: ['id', 'name', 'description', 'featured', 'thumbnailUrl', 'userId', 'created_at', 'updated_at', 'price']
}

export const productResourceFeatures: FeatureType[] = [
  uploadFileFeature({
    provider: {
      local: {
        bucket: path.join(__dirname, '..', '..', '..', 'public', 'uploads')
      }
    },
    properties: {
      key: 'thumbnailUrl',
      file: 'uploadThumbnail'
    },
    uploadPath: (record, filename) => `images/${filename}`
  })
]