"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.authServices = void 0;
var bcrypt = __importStar(require("bcrypt"));
var client_1 = require("@prisma/client");
var prismaClient_1 = __importDefault(require("../../../shared/prismaClient"));
var jwtHelper_1 = require("../../../helpers/jwtHelper");
var config_1 = __importDefault(require("../../../config/config"));
var emailSender_1 = __importDefault(require("./emailSender"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var HTTPError_1 = require("../../errors/HTTPError");
var http_status_1 = __importDefault(require("http-status"));
var loginUser = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var userData, isCorrectPassword, accessToken, refreshToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(payload);
                return [4 /*yield*/, prismaClient_1.default.user.findUnique({
                        where: {
                            email: payload.email,
                            status: client_1.UserStatus.ACTIVE
                        },
                    })];
            case 1:
                userData = _a.sent();
                if (!userData) {
                    throw new HTTPError_1.HTTPError(http_status_1.default.BAD_REQUEST, 'Email is not valid');
                }
                return [4 /*yield*/, bcrypt.compare(payload.password, userData.password)];
            case 2:
                isCorrectPassword = _a.sent();
                if (!isCorrectPassword) {
                    throw new Error("Password is incorrect!");
                }
                accessToken = jwtHelper_1.jwtHelpers.generateToken({
                    userId: userData.id,
                    name: userData.name,
                    email: userData.email,
                    role: userData.role,
                    profilePhoto: userData.profilePhoto,
                }, config_1.default.jwt.jwt_secret, config_1.default.jwt.expires_in);
                refreshToken = jwtHelper_1.jwtHelpers.generateToken({
                    email: userData.email,
                    role: userData.role,
                }, config_1.default.jwt.refresh_token_secret, config_1.default.jwt.refresh_token_expires_in);
                return [2 /*return*/, {
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        passwordChangeRequired: userData.passwordChangeRequired,
                    }];
        }
    });
}); };
var refreshToken = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var decodedData, userData, accessToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                try {
                    decodedData = jwtHelper_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_token_secret);
                }
                catch (err) {
                    throw new Error("You are not authorized!");
                }
                return [4 /*yield*/, prismaClient_1.default.user.findUniqueOrThrow({
                        where: {
                            email: decodedData.email,
                            status: client_1.UserStatus.ACTIVE,
                        },
                    })];
            case 1:
                userData = _a.sent();
                accessToken = jwtHelper_1.jwtHelpers.generateToken({
                    userId: userData.id,
                    name: userData.name,
                    email: userData.email,
                    role: userData.role,
                    profilePhoto: userData.profilePhoto,
                }, config_1.default.jwt.jwt_secret, config_1.default.jwt.expires_in);
                return [2 /*return*/, {
                        accessToken: accessToken,
                    }];
        }
    });
}); };
var changePassword = function (user, payload) { return __awaiter(void 0, void 0, void 0, function () {
    var userData, isCorrectPassword, hashedPassword;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prismaClient_1.default.user.findUniqueOrThrow({
                    where: {
                        email: user.email,
                        status: client_1.UserStatus.ACTIVE,
                    },
                })];
            case 1:
                userData = _a.sent();
                return [4 /*yield*/, bcrypt.compare(payload.oldPassword, userData.password)];
            case 2:
                isCorrectPassword = _a.sent();
                if (!isCorrectPassword) {
                    throw new Error("Password is incorrect!");
                }
                return [4 /*yield*/, bcrypt.hash(payload.newPassword, 10)];
            case 3:
                hashedPassword = _a.sent();
                //@ updating the password and also changing the passwordChangeRequired to false
                return [4 /*yield*/, prismaClient_1.default.user.update({
                        where: {
                            email: userData.email,
                        },
                        data: {
                            password: hashedPassword,
                            passwordChangeRequired: false,
                        },
                    })];
            case 4:
                //@ updating the password and also changing the passwordChangeRequired to false
                _a.sent();
                return [2 /*return*/, {
                        message: "Password change successfully",
                    }];
        }
    });
}); };
var forgotPassword = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var userData, resetPasswordToken, link, htmlFilePath, htmlTemplate, htmlContent;
    var email = _b.email;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, prismaClient_1.default.user.findUniqueOrThrow({
                    where: {
                        email: email,
                        status: client_1.UserStatus.ACTIVE,
                    },
                })];
            case 1:
                userData = _c.sent();
                resetPasswordToken = jwtHelper_1.jwtHelpers.generateToken({
                    email: userData.email,
                    role: userData.role,
                }, config_1.default.jwt.reset_password_token_secret, config_1.default.jwt.reset_token_expires_in);
                link = "".concat(config_1.default.reset_pass_link, "?Id=").concat(userData.id, "&token=").concat(resetPasswordToken);
                htmlFilePath = path_1.default.join(process.cwd(), "/src/templates/reset_pass_template.html");
                htmlTemplate = fs_1.default.readFileSync(htmlFilePath, "utf8");
                htmlContent = htmlTemplate.replace("{{resetPasswordLink}}", link);
                return [4 /*yield*/, (0, emailSender_1.default)(userData.email, htmlContent)];
            case 2:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); };
var resetPassword = function (payload, token) { return __awaiter(void 0, void 0, void 0, function () {
    var isUserExist, isVarified, password;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prismaClient_1.default.user.findUnique({
                    where: {
                        id: payload.id,
                        status: client_1.UserStatus.ACTIVE,
                    },
                })];
            case 1:
                isUserExist = _a.sent();
                if (!isUserExist) {
                    throw new HTTPError_1.HTTPError(http_status_1.default.BAD_REQUEST, "User not found!");
                }
                isVarified = jwtHelper_1.jwtHelpers.verifyToken(token, config_1.default.jwt.reset_password_token_secret);
                if (!isVarified) {
                    throw new HTTPError_1.HTTPError(http_status_1.default.UNAUTHORIZED, "Something went wrong!");
                }
                return [4 /*yield*/, bcrypt.hash(payload.newPassword, Number(config_1.default.bycrypt_salt_rounds))];
            case 2:
                password = _a.sent();
                return [4 /*yield*/, prismaClient_1.default.user.update({
                        where: {
                            id: payload.id,
                        },
                        data: {
                            password: password,
                        },
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.authServices = {
    loginUser: loginUser,
    refreshToken: refreshToken,
    changePassword: changePassword,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword,
};
