"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwtHelper_1 = require("../../helpers/jwtHelper");
var config_1 = __importDefault(require("../../config/config"));
var HTTPError_1 = require("../errors/HTTPError");
var http_status_1 = __importDefault(require("http-status"));
var authGuard = function () {
    var roles = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        roles[_i] = arguments[_i];
    }
    return function (req, _res, next) {
        var token = req.headers.authorization;
        if (!token) {
            throw new HTTPError_1.HTTPError(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
        }
        try {
            var verifiedUser = jwtHelper_1.jwtHelpers.verifyToken(token, config_1.default.jwt.jwt_secret);
            if (roles.length && !roles.includes(verifiedUser.role)) {
                throw new HTTPError_1.HTTPError(http_status_1.default.UNAUTHORIZED, "You don't have the permission");
            }
            req.user = verifiedUser;
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.default = authGuard;
