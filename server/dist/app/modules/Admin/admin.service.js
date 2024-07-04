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
exports.AdminService = void 0;
var client_1 = require("@prisma/client");
var prismaClient_1 = __importDefault(require("../../../shared/prismaClient"));
var paginationHelpers_1 = require("../../../helpers/paginationHelpers");
var admin_constants_1 = require("./admin.constants");
var getAllAdminFomDB = function (queryParams, paginationAndSortingQueryParams) { return __awaiter(void 0, void 0, void 0, function () {
    var q, otherQueryParams, _a, limit, skip, page, sortBy, sortOrder, conditions, searchConditions, filterData, result, total;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                q = queryParams.q, otherQueryParams = __rest(queryParams, ["q"]);
                _a = (0, paginationHelpers_1.generatePaginateAndSortOptions)(__assign({}, paginationAndSortingQueryParams)), limit = _a.limit, skip = _a.skip, page = _a.page, sortBy = _a.sortBy, sortOrder = _a.sortOrder;
                conditions = [];
                // filtering out the soft deleted users
                conditions.push({
                    isDeleted: false,
                });
                //@ searching
                if (q) {
                    searchConditions = admin_constants_1.searchableFields.map(function (field) {
                        var _a;
                        return (_a = {},
                            _a[field] = { contains: q, mode: 'insensitive' },
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
                return [4 /*yield*/, prismaClient_1.default.admin.findMany({
                        where: { AND: conditions },
                        skip: skip,
                        take: limit,
                        orderBy: (_b = {},
                            _b[sortBy] = sortOrder,
                            _b),
                    })];
            case 1:
                result = _c.sent();
                return [4 /*yield*/, prismaClient_1.default.admin.count({
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
var getSingleAdminFromDB = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prismaClient_1.default.admin.findUniqueOrThrow({
                    where: {
                        id: id,
                        isDeleted: false,
                    },
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var updateAdminIntoDB = function (id, data) { return __awaiter(void 0, void 0, void 0, function () {
    var adminData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prismaClient_1.default.admin.findUniqueOrThrow({
                    where: {
                        id: id,
                        isDeleted: false,
                    },
                })];
            case 1:
                adminData = _a.sent();
                if (!data.name) return [3 /*break*/, 3];
                return [4 /*yield*/, prismaClient_1.default.user.update({
                        where: {
                            email: adminData.email
                        },
                        data: {
                            name: data.name
                        }
                    })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [4 /*yield*/, prismaClient_1.default.admin.update({
                    where: {
                        id: id,
                    },
                    data: data,
                })];
            case 4: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var deleteAdminFromDB = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prismaClient_1.default.admin.findUniqueOrThrow({
                    where: {
                        id: id,
                        isDeleted: false,
                    },
                })];
            case 1:
                _a.sent();
                return [4 /*yield*/, prismaClient_1.default.$transaction(function (trClient) { return __awaiter(void 0, void 0, void 0, function () {
                        var deletedAdmin;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, trClient.admin.delete({
                                        where: {
                                            id: id,
                                        },
                                    })];
                                case 1:
                                    deletedAdmin = _a.sent();
                                    return [4 /*yield*/, trClient.user.delete({
                                            where: {
                                                email: deletedAdmin.email,
                                            },
                                        })];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/, deletedAdmin];
                            }
                        });
                    }); })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var softDeleteAdminFromDB = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prismaClient_1.default.admin.findUniqueOrThrow({
                    where: {
                        id: id,
                        isDeleted: false,
                    },
                })];
            case 1:
                _a.sent();
                return [4 /*yield*/, prismaClient_1.default.$transaction(function (trClient) { return __awaiter(void 0, void 0, void 0, function () {
                        var adminDeletedData;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, trClient.admin.update({
                                        where: {
                                            id: id,
                                        },
                                        data: {
                                            isDeleted: true,
                                        },
                                    })];
                                case 1:
                                    adminDeletedData = _a.sent();
                                    return [4 /*yield*/, trClient.user.update({
                                            where: {
                                                email: adminDeletedData.email,
                                            },
                                            data: {
                                                status: client_1.UserStatus.DELETED,
                                            },
                                        })];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/, adminDeletedData];
                            }
                        });
                    }); })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.AdminService = {
    getAllAdminFomDB: getAllAdminFomDB,
    getSingleAdminFromDB: getSingleAdminFromDB,
    updateAdminIntoDB: updateAdminIntoDB,
    deleteAdminFromDB: deleteAdminFromDB,
    softDeleteAdminFromDB: softDeleteAdminFromDB,
};
