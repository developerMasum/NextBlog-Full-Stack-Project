"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
var client_1 = require("@prisma/client");
var prismaClient_1 = __importDefault(require("../../../shared/prismaClient"));
var user_utils_1 = require("./user.utils");
var user_constant_1 = require("./user.constant");
var paginationHelpers_1 = require("../../../helpers/paginationHelpers");
var HTTPError_1 = require("../../errors/HTTPError");
var http_status_1 = __importDefault(require("http-status"));
var createAdmin = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var password, admin, hashPassword, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                password = payload.password, admin = __rest(payload, ["password"]);
                return [4 /*yield*/, (0, user_utils_1.hashedPassword)(password)];
            case 1:
                hashPassword = _a.sent();
                return [4 /*yield*/, prismaClient_1.default.$transaction(function (transactionClient) { return __awaiter(void 0, void 0, void 0, function () {
                        var newUser, newAdmin;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, transactionClient.user.create({
                                        data: {
                                            email: admin.email,
                                            password: hashPassword,
                                            role: client_1.UserRole.ADMIN,
                                            name: admin.name,
                                            profilePhoto: admin.profilePhoto
                                        },
                                    })];
                                case 1:
                                    newUser = _a.sent();
                                    console.log({ newUser: newUser });
                                    return [4 /*yield*/, transactionClient.admin.create({
                                            data: admin,
                                        })];
                                case 2:
                                    newAdmin = _a.sent();
                                    return [2 /*return*/, newAdmin];
                            }
                        });
                    }); })];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var createAuthor = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var password, author, hashPassword, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                password = payload.password, author = __rest(payload, ["password"]);
                return [4 /*yield*/, (0, user_utils_1.hashedPassword)(password)];
            case 1:
                hashPassword = _a.sent();
                return [4 /*yield*/, prismaClient_1.default.$transaction(function (transactionClient) { return __awaiter(void 0, void 0, void 0, function () {
                        var newUser, newAuthor;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, transactionClient.user.create({
                                        data: {
                                            email: author.email,
                                            password: hashPassword,
                                            role: client_1.UserRole.BLOGGER,
                                            name: author.name,
                                            profilePhoto: author.profilePhoto
                                        },
                                    })];
                                case 1:
                                    newUser = _a.sent();
                                    return [4 /*yield*/, transactionClient.author.create({
                                            data: author,
                                        })];
                                case 2:
                                    newAuthor = _a.sent();
                                    return [2 /*return*/, newAuthor];
                            }
                        });
                    }); })];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var createModarator = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var password, modarator, hashPassword, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                password = payload.password, modarator = __rest(payload, ["password"]);
                return [4 /*yield*/, (0, user_utils_1.hashedPassword)(password)];
            case 1:
                hashPassword = _a.sent();
                return [4 /*yield*/, prismaClient_1.default.$transaction(function (transactionClient) { return __awaiter(void 0, void 0, void 0, function () {
                        var newModarator;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, transactionClient.user.create({
                                        data: {
                                            email: modarator.email,
                                            password: hashPassword,
                                            role: client_1.UserRole.MODERATOR,
                                            name: modarator.name,
                                            profilePhoto: modarator.profilePhoto
                                        },
                                    })];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, transactionClient.moderator.create({
                                            data: modarator,
                                        })];
                                case 2:
                                    newModarator = _a.sent();
                                    return [2 /*return*/, newModarator];
                            }
                        });
                    }); })];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var createSubscriber = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var password, subscriber, isExist, hashPassword, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                password = payload.password, subscriber = __rest(payload, ["password"]);
                return [4 /*yield*/, prismaClient_1.default.user.findUnique({
                        where: {
                            email: subscriber.email
                        }
                    })];
            case 1:
                isExist = _a.sent();
                if (isExist) {
                    throw new HTTPError_1.HTTPError(http_status_1.default.BAD_REQUEST, 'The email already register');
                }
                return [4 /*yield*/, (0, user_utils_1.hashedPassword)(password)];
            case 2:
                hashPassword = _a.sent();
                return [4 /*yield*/, prismaClient_1.default.$transaction(function (transactionClient) { return __awaiter(void 0, void 0, void 0, function () {
                        var userCreate, newSubscriber;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, transactionClient.user.create({
                                        data: {
                                            name: subscriber.name,
                                            email: subscriber.email,
                                            password: hashPassword,
                                            role: client_1.UserRole.SUBSCRIBER,
                                            profilePhoto: subscriber.profilePhoto
                                        },
                                    })];
                                case 1:
                                    userCreate = _a.sent();
                                    console.log({ userCreate: userCreate });
                                    return [4 /*yield*/, transactionClient.subscriber.create({
                                            data: subscriber,
                                        })];
                                case 2:
                                    newSubscriber = _a.sent();
                                    return [2 /*return*/, newSubscriber];
                            }
                        });
                    }); })];
            case 3:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var getAllUsersFromDb = function (queryParams, paginationAndSortingQueryParams, user) { return __awaiter(void 0, void 0, void 0, function () {
    var q, otherQueryParams, _a, limit, skip, page, sortBy, sortOrder, conditions, searchConditions, filterData, result, total;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                console.log(user);
                q = queryParams.q, otherQueryParams = __rest(queryParams, ["q"]);
                _a = (0, paginationHelpers_1.generatePaginateAndSortOptions)(__assign({}, paginationAndSortingQueryParams)), limit = _a.limit, skip = _a.skip, page = _a.page, sortBy = _a.sortBy, sortOrder = _a.sortOrder;
                conditions = [];
                if (q) {
                    searchConditions = user_constant_1.userSearchableFields.map(function (field) {
                        var _a;
                        return (_a = {},
                            _a[field] = { contains: q, mode: "insensitive" },
                            _a);
                    });
                    conditions.push({ OR: searchConditions });
                }
                //@ filtering with exact value
                if (Object.keys(otherQueryParams).length > 0) {
                    filterData = Object.keys(otherQueryParams).map(function (key) {
                        var _a;
                        return (_a = {},
                            _a[key] = otherQueryParams[key],
                            _a);
                    });
                    conditions.push.apply(conditions, filterData);
                }
                return [4 /*yield*/, prismaClient_1.default.user.findMany({
                        where: { AND: conditions },
                        skip: skip,
                        take: limit,
                        orderBy: (_b = {},
                            _b[sortBy] = sortOrder,
                            _b),
                    })];
            case 1:
                result = _c.sent();
                return [4 /*yield*/, prismaClient_1.default.user.count({
                        where: { AND: conditions },
                    })];
            case 2:
                total = _c.sent();
                return [2 /*return*/, {
                        meta: {
                            page: page,
                            limit: limit,
                            total: total,
                        },
                        result: result,
                    }];
        }
    });
}); };
var getMyProfile = function (authUser) { return __awaiter(void 0, void 0, void 0, function () {
    var userData, profileData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prismaClient_1.default.user.findUnique({
                    where: {
                        email: authUser.email,
                        status: client_1.UserStatus.ACTIVE,
                    },
                    select: {
                        email: true,
                        role: true,
                        passwordChangeRequired: true,
                        status: true,
                    },
                })];
            case 1:
                userData = _a.sent();
                if (!((userData === null || userData === void 0 ? void 0 : userData.role) === client_1.UserRole.ADMIN || (userData === null || userData === void 0 ? void 0 : userData.role) === client_1.UserRole.SUPER_ADMIN)) return [3 /*break*/, 3];
                return [4 /*yield*/, prismaClient_1.default.admin.findUnique({
                        where: {
                            email: userData.email,
                        },
                    })];
            case 2:
                profileData = _a.sent();
                return [3 /*break*/, 7];
            case 3:
                if (!((userData === null || userData === void 0 ? void 0 : userData.role) === client_1.UserRole.BLOGGER)) return [3 /*break*/, 5];
                return [4 /*yield*/, prismaClient_1.default.author.findUnique({
                        where: {
                            email: userData.email,
                        },
                    })];
            case 4:
                profileData = _a.sent();
                return [3 /*break*/, 7];
            case 5:
                if (!((userData === null || userData === void 0 ? void 0 : userData.role) === client_1.UserRole.MODERATOR)) return [3 /*break*/, 7];
                return [4 /*yield*/, prismaClient_1.default.moderator.findUnique({
                        where: {
                            email: userData.email,
                        },
                    })];
            case 6:
                profileData = _a.sent();
                _a.label = 7;
            case 7: return [2 /*return*/, __assign(__assign({}, profileData), userData)];
        }
    });
}); };
var updateMyProfile = function (authUser, payload) { return __awaiter(void 0, void 0, void 0, function () {
    var userData, profileData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prismaClient_1.default.user.findUniqueOrThrow({
                    where: {
                        email: authUser.email,
                        status: client_1.UserStatus.ACTIVE,
                    },
                })];
            case 1:
                userData = _a.sent();
                if (!payload.profilePhoto) return [3 /*break*/, 3];
                return [4 /*yield*/, prismaClient_1.default.user.update({
                        where: {
                            email: authUser.email
                        },
                        data: {
                            profilePhoto: payload.profilePhoto
                        }
                    })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                if (!payload.name) return [3 /*break*/, 5];
                return [4 /*yield*/, prismaClient_1.default.user.update({
                        where: {
                            email: authUser.email
                        },
                        data: {
                            name: payload.name
                        }
                    })];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                if (!((userData === null || userData === void 0 ? void 0 : userData.role) === client_1.UserRole.ADMIN || (userData === null || userData === void 0 ? void 0 : userData.role) === client_1.UserRole.SUPER_ADMIN)) return [3 /*break*/, 7];
                return [4 /*yield*/, prismaClient_1.default.admin.update({
                        where: {
                            email: userData.email,
                        },
                        data: payload,
                    })];
            case 6:
                profileData = _a.sent();
                return [3 /*break*/, 11];
            case 7:
                if (!((userData === null || userData === void 0 ? void 0 : userData.role) === client_1.UserRole.BLOGGER)) return [3 /*break*/, 9];
                return [4 /*yield*/, prismaClient_1.default.author.update({
                        where: {
                            email: userData.email,
                        },
                        data: payload,
                    })];
            case 8:
                profileData = _a.sent();
                return [3 /*break*/, 11];
            case 9:
                if (!((userData === null || userData === void 0 ? void 0 : userData.role) === client_1.UserRole.MODERATOR)) return [3 /*break*/, 11];
                return [4 /*yield*/, prismaClient_1.default.moderator.update({
                        where: {
                            email: userData.email,
                        },
                        data: payload,
                    })];
            case 10:
                profileData = _a.sent();
                _a.label = 11;
            case 11: return [2 /*return*/, __assign(__assign({}, profileData), userData)];
        }
    });
}); };
var changeProfileStatus = function (userId, status) { return __awaiter(void 0, void 0, void 0, function () {
    var isUserExist, updatedUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prismaClient_1.default.user.findUnique({
                    where: {
                        id: userId,
                    },
                })];
            case 1:
                isUserExist = _a.sent();
                if (!isUserExist) {
                    throw new HTTPError_1.HTTPError(http_status_1.default.BAD_REQUEST, "User does not exists!");
                }
                return [4 /*yield*/, prismaClient_1.default.user.update({
                        where: {
                            id: userId,
                        },
                        data: status,
                    })];
            case 2:
                updatedUser = _a.sent();
                return [2 /*return*/, updatedUser];
        }
    });
}); };
exports.userServices = {
    createAdmin: createAdmin,
    createAuthor: createAuthor,
    createModarator: createModarator,
    createSubscriber: createSubscriber,
    getAllUsersFromDb: getAllUsersFromDb,
    getMyProfile: getMyProfile,
    updateMyProfile: updateMyProfile,
    changeProfileStatus: changeProfileStatus,
};
