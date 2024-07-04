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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogServicres = void 0;
var client_1 = require("@prisma/client");
var prismaClient_1 = __importDefault(require("../../../shared/prismaClient"));
var paginationHelpers_1 = require("../../../helpers/paginationHelpers");
var blog_constant_1 = require("./blog.constant");
var HTTPError_1 = require("../../errors/HTTPError");
var http_status_1 = __importDefault(require("http-status"));
var craeteBlogIntoDb = function (payload, user) { return __awaiter(void 0, void 0, void 0, function () {
    var authorData, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log({ user: user });
                return [4 /*yield*/, prismaClient_1.default.author.findUniqueOrThrow({
                        where: {
                            email: user.email,
                        },
                    })];
            case 1:
                authorData = _a.sent();
                return [4 /*yield*/, prismaClient_1.default.blog.create({
                        data: __assign(__assign({}, payload), { authorId: authorData.id }),
                    })];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var getAllBlogFomDB = function (queryParams, paginationAndSortingQueryParams) { return __awaiter(void 0, void 0, void 0, function () {
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
                    visibility: client_1.Visibility.PUBLIC,
                });
                //@ searching
                if (q) {
                    searchConditions = blog_constant_1.blogSearchableFields.map(function (field) {
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
                return [4 /*yield*/, prismaClient_1.default.blog.findMany({
                        where: { AND: conditions },
                        skip: skip,
                        take: limit,
                        orderBy: (_b = {},
                            _b[sortBy] = sortOrder,
                            _b),
                        include: {
                            author: true,
                        },
                    })];
            case 1:
                result = _c.sent();
                return [4 /*yield*/, prismaClient_1.default.blog.count({
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
// const getSingleBlogFromDB = async (id: string, user: any) => {
//   console.log({user})
//   const blogPost = await prisma.$transaction(async (tx) => {
//     let includeOptions = {};
//     console.log({includeOptions})
//     switch (user.role) {
//       case UserRole.ADMIN:
//         includeOptions = {
//           admin: true,
//         };
//         break;
//       case UserRole.BLOGGER:
//         includeOptions = {
//           blogger: true,
//         };
//         break;
//       case UserRole.SUBSCRIBER:
//         includeOptions = {
//           subscriber: true,
//         };
//         break;
//       default:
//         break;
//     }
//     // Find the blog post and return it
//     const post = await tx.blog.findUnique({
//       where: {
//         id,
//       },
//       include: {
//         author: true,
//         comment: {
//           include: {
//             comment: {
//               include: includeOptions
//             },
//           },
//         },
//       },
//     });
//     // const post = await tx.blog.findUnique({
//     //   where: {
//     //     id,
//     //   },
//     //   include: {
//     //     author: true,
//     //     comment: {
//     //       include: {
//     //         comment: {
//     //           select: {
//     //             id: true,
//     //             email: true,
//     //             role: true,
//     //             profilePhoto:true
//     //             ...(user:any) => {
//     //               switch (user.role) {
//     //                 case " SUBSCRIBER":
//     //                   return { subscriber: true };
//     //                 case " ADMIN":
//     //                   return { admin: true };
//     //                 case " MODERATOR":
//     //                   return { moderator: true };
//     //                 default:
//     //                   return {};
//     //               }
//     //             },
//     //           },
//     //         },
//     //       },
//     //     },
//     //   },
//     // });
//     // Increment views within the transaction
//     await tx.blog.update({
//       where: {
//         id,
//       },
//       data: {
//         views: {
//           increment: 1,
//         },
//       },
//     });
//     return post;
//   });
//   return blogPost;
// };
var getSingleBlogFromDB = function (id, user) { return __awaiter(void 0, void 0, void 0, function () {
    var blogPost;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log({ user: user });
                return [4 /*yield*/, prismaClient_1.default.$transaction(function (tx) { return __awaiter(void 0, void 0, void 0, function () {
                        var includeOptions, post;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    includeOptions = {};
                                    switch (user.role) {
                                        case client_1.UserRole.ADMIN:
                                            includeOptions = {
                                                admin: true,
                                            };
                                            break;
                                        case client_1.UserRole.BLOGGER:
                                            includeOptions = {
                                                author: true,
                                            };
                                            break;
                                        case client_1.UserRole.SUBSCRIBER:
                                            includeOptions = {
                                                subscriber: true,
                                            };
                                            break;
                                        default:
                                            break;
                                    }
                                    return [4 /*yield*/, tx.blog.findUnique({
                                            where: {
                                                id: id,
                                            },
                                            include: {
                                                author: true,
                                                comment: {
                                                    include: {
                                                        comment: {
                                                            include: includeOptions,
                                                        },
                                                    },
                                                },
                                            },
                                        })];
                                case 1:
                                    post = _a.sent();
                                    // Increment views within the transaction
                                    return [4 /*yield*/, tx.blog.update({
                                            where: {
                                                id: id,
                                            },
                                            data: {
                                                views: {
                                                    increment: 1,
                                                },
                                            },
                                        })];
                                case 2:
                                    // Increment views within the transaction
                                    _a.sent();
                                    return [2 /*return*/, post];
                            }
                        });
                    }); })];
            case 1:
                blogPost = _a.sent();
                return [2 /*return*/, blogPost];
        }
    });
}); };
var getMyAllBlogsFomDB = function (queryParams, paginationAndSortingQueryParams, user) { return __awaiter(void 0, void 0, void 0, function () {
    var userData, authorData, q, otherQueryParams, _a, limit, skip, page, sortBy, sortOrder, conditions, searchConditions, filterData, result, total;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, prismaClient_1.default.user.findUniqueOrThrow({
                    where: {
                        id: user.userId,
                    },
                })];
            case 1:
                userData = _c.sent();
                return [4 /*yield*/, prismaClient_1.default.author.findUniqueOrThrow({
                        where: {
                            email: userData.email,
                        },
                    })];
            case 2:
                authorData = _c.sent();
                q = queryParams.q, otherQueryParams = __rest(queryParams, ["q"]);
                _a = (0, paginationHelpers_1.generatePaginateAndSortOptions)(__assign({}, paginationAndSortingQueryParams)), limit = _a.limit, skip = _a.skip, page = _a.page, sortBy = _a.sortBy, sortOrder = _a.sortOrder;
                conditions = [];
                // filtering out the soft deleted users
                conditions.push({
                    visibility: client_1.Visibility.PUBLIC,
                });
                //@ searching
                if (q) {
                    searchConditions = blog_constant_1.blogSearchableFields.map(function (field) {
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
                return [4 /*yield*/, prismaClient_1.default.blog.findMany({
                        where: {
                            AND: __spreadArray(__spreadArray([], conditions, true), [{ authorId: authorData.id }], false),
                        },
                        skip: skip,
                        take: limit,
                        orderBy: (_b = {},
                            _b[sortBy] = sortOrder,
                            _b),
                    })];
            case 3:
                result = _c.sent();
                return [4 /*yield*/, prismaClient_1.default.blog.count({
                        where: {
                            AND: __spreadArray(__spreadArray([], conditions, true), [{ authorId: authorData.id }], false),
                        },
                    })];
            case 4:
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
var deleteBlogFromDB = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prismaClient_1.default.$transaction(function (tx) { return __awaiter(void 0, void 0, void 0, function () {
                    var deleteBlog;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: 
                            // Delete all comments associated with the blog
                            return [4 /*yield*/, tx.comment.deleteMany({
                                    where: {
                                        blogId: id,
                                    },
                                })];
                            case 1:
                                // Delete all comments associated with the blog
                                _a.sent();
                                return [4 /*yield*/, tx.like.deleteMany({
                                        where: {
                                            blogId: id,
                                        },
                                    })];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, tx.blog.delete({
                                        where: {
                                            id: id,
                                        },
                                    })];
                            case 3:
                                deleteBlog = _a.sent();
                                // Return the deleted blog
                                return [2 /*return*/, deleteBlog];
                        }
                    });
                }); })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var updateBlogIntoDB = function (id, data) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prismaClient_1.default.blog.findUniqueOrThrow({
                    where: {
                        id: id,
                    },
                })];
            case 1:
                _a.sent();
                return [4 /*yield*/, prismaClient_1.default.blog.update({
                        where: {
                            id: id,
                        },
                        data: data,
                    })];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var changeApprovalStatusDB = function (id, data) { return __awaiter(void 0, void 0, void 0, function () {
    var isCancel, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prismaClient_1.default.blog.findUniqueOrThrow({
                    where: {
                        id: id,
                    },
                })];
            case 1:
                _a.sent();
                return [4 /*yield*/, prismaClient_1.default.blog.findUnique({
                        where: {
                            id: id,
                            publishedStatus: client_1.Published_status.CANCEL
                        }
                    })];
            case 2:
                isCancel = _a.sent();
                if (isCancel) {
                    throw new HTTPError_1.HTTPError(http_status_1.default.BAD_REQUEST, 'Can not updated its status is cancel');
                }
                console.log(isCancel);
                return [4 /*yield*/, prismaClient_1.default.blog.update({
                        where: {
                            id: id,
                            NOT: {
                                publishedStatus: {
                                    in: [client_1.Published_status.CANCEL],
                                },
                            },
                        },
                        data: data,
                    })];
            case 3:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var getSingleBlogBYModerator = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var blogData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prismaClient_1.default.blog.findUniqueOrThrow({
                    where: {
                        id: id
                    },
                    include: {
                        author: true
                    }
                })];
            case 1:
                blogData = _a.sent();
                return [2 /*return*/, blogData];
        }
    });
}); };
exports.blogServicres = {
    getAllBlogFomDB: getAllBlogFomDB,
    craeteBlogIntoDb: craeteBlogIntoDb,
    getSingleBlogFromDB: getSingleBlogFromDB,
    getMyAllBlogsFomDB: getMyAllBlogsFomDB,
    deleteBlogFromDB: deleteBlogFromDB,
    updateBlogIntoDB: updateBlogIntoDB,
    changeApprovalStatusDB: changeApprovalStatusDB,
    getSingleBlogBYModerator: getSingleBlogBYModerator
};
