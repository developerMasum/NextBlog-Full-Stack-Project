"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var http_status_1 = __importDefault(require("http-status"));
var globalErrorhandler = function (err, req, res, next) {
    var statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
    var success = false;
    var message = err.message || "something went wrong";
    var error = err;
    if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        (message = "Validation Error"), (error = err.message);
    }
    else if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            message = "Duplicate Key Error";
            error = err.meta;
        }
    }
    res.status(statusCode).json({
        success: success,
        message: message,
        error: error,
    });
};
exports.default = globalErrorhandler;
