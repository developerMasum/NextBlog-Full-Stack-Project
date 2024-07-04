"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtHelpers = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var generateToken = function (payload, secret, expiresIn) {
    var token = jsonwebtoken_1.default.sign(payload, secret, {
        algorithm: 'HS256',
        expiresIn: expiresIn,
    });
    return token;
};
var verifyToken = function (token, secret) {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.jwtHelpers = {
    generateToken: generateToken,
    verifyToken: verifyToken,
};
