"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var http_status_1 = __importDefault(require("http-status"));
var globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
var routes_1 = __importDefault(require("./app/routes"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use('/api/v1', routes_1.default);
app.use(function (req, res, next) {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: "Oops! It looks like this page doesn't exist.",
        error: {
            path: req.originalUrl,
            error: "The requested URL was not found on this server.",
            suggestion: 'Double-check the URL',
        },
    });
});
app.use(globalErrorHandler_1.default);
app.get('/', function (req, res) {
    res.send('Hello World!');
});
exports.default = app;
