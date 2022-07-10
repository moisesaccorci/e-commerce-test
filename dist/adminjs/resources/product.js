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
    editProperties: ['name', 'description', 'uploadThumbnail', 'featured', 'user_id', 'price'],
    filterProperties: ['name', 'description', 'featured', 'user_id', 'created_at', 'updated_at', 'price'],
    listProperties: ['id', 'name', 'featured', 'user_id'],
    showProperties: ['id', 'name', 'description', 'featured', 'thumbnail_url', 'user_id', 'created_at', 'updated_at', 'price']
};
exports.productResourceFeatures = [
    (0, upload_1.default)({
        provider: {
            local: {
                bucket: path_1.default.join(__dirname, '..', '..', '..', 'public', 'uploads')
            }
        },
        properties: {
            key: 'thumbnail_url',
            file: 'uploadThumbnail'
        },
        uploadPath: (record, filename) => `images/${filename}`
    })
];
