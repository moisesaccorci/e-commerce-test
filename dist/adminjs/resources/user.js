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
        'firstName',
        'lastName',
        'email',
        'password',
        'role'
    ],
    filterProperties: [
        'firstName',
        'lastName',
        'email',
        'role',
        'createdAt',
        'updatedAt'
    ],
    listProperties: [
        'id',
        'firstName',
        'email',
        'role'
    ],
    showProperties: [
        'id',
        'firstName',
        'lastName',
        'email',
        'role',
        'createdAt',
        'updatedAt'
    ],
};
exports.userResourceOptions = userResourceOptions;
