"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuth = void 0;
const jwtService_1 = require("../services/jwtService");
const userService_1 = require("../services/userService");
function ensureAuth(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({ message: 'Access denied: no tokens were found' });
    }
    const token = authorizationHeader.replace(/Bearer /, '');
    jwtService_1.jwtService.verifyToken(token, (err, decoded) => {
        if (err || typeof decoded === 'undefined') {
            return res.status(401).json({ message: 'Access denied: invalid token' });
        }
        userService_1.userService.findByEmail(decoded.email).then(user => {
            req.user = user;
            next();
        });
    });
}
exports.ensureAuth = ensureAuth;
