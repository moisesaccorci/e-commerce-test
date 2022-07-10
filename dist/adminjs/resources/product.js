"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productResourceFeatures = exports.productResourceOptions = void 0;
const upload_1 = __importDefault(require("@adminjs/upload"));
const path_1 = __importDefault(require("path"));
exports.productResourceOptions = {
    navigation: 'Store',
    editProperties: ['name', 'description', 'uploadThumbnail', 'featured', 'userId', 'price'],
    filterProperties: ['name', 'description', 'featured', 'userId', 'created_at', 'updated_at', 'price'],
    listProperties: ['id', 'name', 'featured', 'userId'],
    showProperties: ['id', 'name', 'description', 'featured', 'thumbnailUrl', 'userId', 'created_at', 'updated_at', 'price']
};
exports.productResourceFeatures = [
    (0, upload_1.default)({
        provider: {
            local: {
                bucket: path_1.default.join(__dirname, '..', '..', '..', 'public', 'uploads')
            }
        },
        properties: {
            key: 'thumbnailUrl',
            file: 'uploadThumbnail'
        },
        uploadPath: (record, filename) => `images/${filename}`
    })
];
