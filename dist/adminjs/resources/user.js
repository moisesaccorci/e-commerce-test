"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResourceOptions = void 0;
const userResourceOptions = {
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
        'created_at',
        'updated_at'
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
        'created_at',
        'updated_at'
    ],
};
exports.userResourceOptions = userResourceOptions;
