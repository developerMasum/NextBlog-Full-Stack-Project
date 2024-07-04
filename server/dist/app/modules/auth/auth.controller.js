"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
var http_status_1 = __importDefault(require("http-status"));
var catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
var sendResponse_1 = require("../../../shared/sendResponse");
var auth_services_1 = require("./auth.services");
var loginUser = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, refreshToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, auth_services_1.authServices.loginUser(req.body)];
            case 1:
                result = _a.sent();
                refreshToken = result.refreshToken;
                res.cookie('refreshToken', refreshToken, {
                    secure: false,
                    httpOnly: true,
                });
                (0, sendResponse_1.sendResponse)(res, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: 'Logged in successfully!',
                    data: {
                        accessToken: result.accessToken,
                        passwordChangeRequired: result.passwordChangeRequired,
                    },
                });
                return [2 /*return*/];
        }
    });
}); });
var refreshToken = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                refreshToken = req.cookies.refreshToken;
                console.log(refreshToken, 'refreshToken');
                return [4 /*yield*/, auth_services_1.authServices.refreshToken(refreshToken)];
            case 1:
                result = _a.sent();
                (0, sendResponse_1.sendResponse)(res, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: 'Access token generated successfully!',
                    data: result,
                });
                return [2 /*return*/];
        }
    });
}); });
var changePassword = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, payload, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                payload = req.body;
                return [4 /*yield*/, auth_services_1.authServices.changePassword(user, payload)];
            case 1:
                result = _a.sent();
                (0, sendResponse_1.sendResponse)(res, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: 'Password changed successfully!',
                    data: {
                        status: 200,
                        message: 'Password changed successfully!',
                    },
                });
                return [2 /*return*/];
        }
    });
}); });
var forgotPassword = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, auth_services_1.authServices.forgotPassword(req.body)];
            case 1:
                result = _a.sent();
                (0, sendResponse_1.sendResponse)(res, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: 'Check your email to reset your password',
                    data: {
                        status: 200,
                        message: 'Check your email for reset link!',
                    },
                });
                return [2 /*return*/];
        }
    });
}); });
var resetPassword = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.headers.authorization || '';
                console.log({ token: token });
                return [4 /*yield*/, auth_services_1.authServices.resetPassword(req.body, token)];
            case 1:
                result = _a.sent();
                (0, sendResponse_1.sendResponse)(res, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: 'Password reset successfully!',
                    data: {
                        status: 200,
                        message: 'Password Reset Successfully',
                    },
                });
                return [2 /*return*/];
        }
    });
}); });
// const resetPassword = catchAsync(async (req: Request, res: Response) => {
//    const token = req.headers.authorization || "";
//    console.log({token})
//    await authServices.resetPassword(req.body, token);
//    sendResponse(res, {
//        statusCode: 200,
//        success: true,
//        message: "Account recovered!",
//        data: {
//            status: 200,
//            message: 'Password Reset Successfully',
//          },
//    });
// });
exports.authController = {
    loginUser: loginUser,
    refreshToken: refreshToken,
    changePassword: changePassword,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword,
};
