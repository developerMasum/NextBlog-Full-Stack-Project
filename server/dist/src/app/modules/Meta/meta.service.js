"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
exports.metaServices = void 0;
var http_status_1 = __importDefault(require("http-status"));
var prismaClient_1 = __importDefault(require("../../../shared/prismaClient"));
var client_1 = require("@prisma/client");
var HTTPError_1 = require("../../errors/HTTPError");
var fetchDashboardMetadata = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var metadata, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = user.role;
                switch (_a) {
                    case client_1.UserRole.ADMIN: return [3 /*break*/, 1];
                    case client_1.UserRole.SUPER_ADMIN: return [3 /*break*/, 3];
                    case client_1.UserRole.MODERATOR: return [3 /*break*/, 5];
                    case client_1.UserRole.BLOGGER: return [3 /*break*/, 7];
                }
                return [3 /*break*/, 9];
            case 1: return [4 /*yield*/, getAdminDashboardMetadata()];
            case 2:
                metadata = _b.sent();
                return [3 /*break*/, 10];
            case 3: return [4 /*yield*/, getSuperAdminDashboardMetadata()];
            case 4:
                metadata = _b.sent();
                return [3 /*break*/, 10];
            case 5: return [4 /*yield*/, getModeratorDashboardMetadata(user)];
            case 6:
                metadata = _b.sent();
                return [3 /*break*/, 10];
            case 7: return [4 /*yield*/, getBloggerDashboardMetadata(user)];
            case 8:
                metadata = _b.sent();
                return [3 /*break*/, 10];
            case 9: throw new Error("Invalid user role");
            case 10: return [2 /*return*/, metadata];
        }
    });
}); };
var getAdminDashboardMetadata = function () { return __awaiter(void 0, void 0, void 0, function () {
    var blogCount, bloggerCount, adminCount, commentCount, likeCount, moderatorCount, pendingBlogCount, approvedBlogCount, cancelBlogCount, barChartData, pieChartData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prismaClient_1.default.blog.count()];
            case 1:
                blogCount = _a.sent();
                return [4 /*yield*/, prismaClient_1.default.author.count()];
            case 2:
                bloggerCount = _a.sent();
                return [4 /*yield*/, prismaClient_1.default.admin.count()];
            case 3:
                adminCount = _a.sent();
                return [4 /*yield*/, prismaClient_1.default.comment.count()];
            case 4:
                commentCount = _a.sent();
                return [4 /*yield*/, prismaClient_1.default.like.count()];
            case 5:
                likeCount = _a.sent();
                return [4 /*yield*/, prismaClient_1.default.moderator.count()];
            case 6:
                moderatorCount = _a.sent();
                return [4 /*yield*/, prismaClient_1.default.blog.count({
                        where: {
                            publishedStatus: client_1.Published_status.PENDING
                        }
                    })];
            case 7:
                pendingBlogCount = _a.sent();
                return [4 /*yield*/, prismaClient_1.default.blog.count({
                        where: {
                            publishedStatus: client_1.Published_status.APPROVED
                        }
                    })];
            case 8:
                approvedBlogCount = _a.sent();
                return [4 /*yield*/, prismaClient_1.default.blog.count({
                        where: {
                            publishedStatus: client_1.Published_status.CANCEL
                        }
                    })];
            case 9:
                cancelBlogCount = _a.sent();
                return [4 /*yield*/, getBarChartData()];
            case 10:
                barChartData = _a.sent();
                return [4 /*yield*/, getPieChartData()];
            case 11:
                pieChartData = _a.sent();
                return [2 /*return*/, { blogCount: blogCount, bloggerCount: bloggerCount, adminCount: adminCount, commentCount: commentCount, likeCount: likeCount, pendingBlogCount: pendingBlogCount, approvedBlogCount: approvedBlogCount, cancelBlogCount: cancelBlogCount, pieChartData: pieChartData, barChartData: barChartData }];
        }
    });
}); };
var getSuperAdminDashboardMetadata = function () { return __awaiter(void 0, void 0, void 0, function () {
    var blogCount, bloggerCount, adminCount, userCount, commentCount, likeCount, moderatorCount, pendingBlogCount, approvedBlogCount, cancelBlogCount, barChartData, pieChartData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prismaClient_1.default.blog.count()];
            case 1:
                blogCount = _a.sent();
                return [4 /*yield*/, prismaClient_1.default.author.count()];
            case 2:
                bloggerCount = _a.sent();
                return [4 /*yield*/, prismaClient_1.default.admin.count()];
            case 3:
                adminCount = _a.sent();
                return [4 /*yield*/, prismaClient_1.default.user.count()];
            case 4:
                userCount = _a.sent();
                return [4 /*yield*/, prismaClient_1.default.comment.count()];
            case 5:
                commentCount = _a.sent();
                return [4 /*yield*/, prismaClient_1.default.like.count()];
            case 6:
                likeCount = _a.sent();
                return [4 /*yield*/, prismaClient_1.default.moderator.count()];
            case 7:
                moderatorCount = _a.sent();
                return [4 /*yield*/, prismaClient_1.default.blog.count({
                        where: {
                            publishedStatus: client_1.Published_status.PENDING
                        }
                    })];
            case 8:
                pendingBlogCount = _a.sent();
                return [4 /*yield*/, prismaClient_1.default.blog.count({
                        where: {
                            publishedStatus: client_1.Published_status.APPROVED
                        }
                    })];
            case 9:
                approvedBlogCount = _a.sent();
                return [4 /*yield*/, prismaClient_1.default.blog.count({
                        where: {
                            publishedStatus: client_1.Published_status.CANCEL
                        }
                    })];
            case 10:
                cancelBlogCount = _a.sent();
                return [4 /*yield*/, getBarChartData()];
            case 11:
                barChartData = _a.sent();
                return [4 /*yield*/, getPieChartData()];
            case 12:
                pieChartData = _a.sent();
                return [2 /*return*/, { blogCount: blogCount, bloggerCount: bloggerCount, adminCount: adminCount, commentCount: commentCount, likeCount: likeCount, pendingBlogCount: pendingBlogCount, approvedBlogCount: approvedBlogCount, cancelBlogCount: cancelBlogCount, pieChartData: pieChartData, barChartData: barChartData, userCount: userCount, moderatorCount: moderatorCount }];
        }
    });
}); };
var getModeratorDashboardMetadata = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var bloggerCount, blogCount, moderatorCount, pendingBlogCount, approvedBlogCount, cancelBlogCount, commentCount, likeCount, barChartData, pieChartData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prismaClient_1.default.user.findUniqueOrThrow({
                    where: {
                        email: user === null || user === void 0 ? void 0 : user.email
                    }
                })];
            case 1:
                _a.sent();
                return [4 /*yield*/, prismaClient_1.default.author.count()];
            case 2:
                bloggerCount = _a.sent();
                return [4 /*yield*/, prismaClient_1.default.blog.count()];
            case 3:
                blogCount = _a.sent();
                return [4 /*yield*/, prismaClient_1.default.moderator.count()];
            case 4:
                moderatorCount = _a.sent();
                return [4 /*yield*/, prismaClient_1.default.blog.count({
                        where: {
                            publishedStatus: client_1.Published_status.PENDING
                        }
                    })];
            case 5:
                pendingBlogCount = _a.sent();
                return [4 /*yield*/, prismaClient_1.default.blog.count({
                        where: {
                            publishedStatus: client_1.Published_status.APPROVED
                        }
                    })];
            case 6:
                approvedBlogCount = _a.sent();
                return [4 /*yield*/, prismaClient_1.default.blog.count({
                        where: {
                            publishedStatus: client_1.Published_status.CANCEL
                        }
                    })];
            case 7:
                cancelBlogCount = _a.sent();
                return [4 /*yield*/, prismaClient_1.default.comment.count()];
            case 8:
                commentCount = _a.sent();
                return [4 /*yield*/, prismaClient_1.default.like.count()];
            case 9:
                likeCount = _a.sent();
                return [4 /*yield*/, getBarChartData()];
            case 10:
                barChartData = _a.sent();
                return [4 /*yield*/, getPieChartData()];
            case 11:
                pieChartData = _a.sent();
                return [2 /*return*/, { blogCount: blogCount, bloggerCount: bloggerCount, commentCount: commentCount, likeCount: likeCount, moderatorCount: moderatorCount, pendingBlogCount: pendingBlogCount, approvedBlogCount: approvedBlogCount, cancelBlogCount: cancelBlogCount, barChartData: barChartData }];
        }
    });
}); };
var getBloggerDashboardMetadata = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var blogger, blogCount, pendingBlogCount, approvedBlogCount, cancelBlogCount, commentCount, viewCount, totalViews, barChartData, pieChartData;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, prismaClient_1.default.author.findUnique({
                    where: {
                        email: user === null || user === void 0 ? void 0 : user.email,
                    },
                })];
            case 1:
                blogger = _b.sent();
                if (!blogger) {
                    throw new HTTPError_1.HTTPError(http_status_1.default.BAD_REQUEST, "Patient not found!");
                }
                return [4 /*yield*/, prismaClient_1.default.blog.count({
                        where: {
                            authorId: blogger.id,
                        },
                    })];
            case 2:
                blogCount = _b.sent();
                return [4 /*yield*/, prismaClient_1.default.blog.count({
                        where: {
                            publishedStatus: client_1.Published_status.PENDING
                        }
                    })];
            case 3:
                pendingBlogCount = _b.sent();
                return [4 /*yield*/, prismaClient_1.default.blog.count({
                        where: {
                            publishedStatus: client_1.Published_status.APPROVED
                        }
                    })];
            case 4:
                approvedBlogCount = _b.sent();
                return [4 /*yield*/, prismaClient_1.default.blog.count({
                        where: {
                            publishedStatus: client_1.Published_status.CANCEL
                        }
                    })];
            case 5:
                cancelBlogCount = _b.sent();
                return [4 /*yield*/, prismaClient_1.default.comment.count({
                        where: {
                            authorId: blogger.id
                        }
                    })];
            case 6:
                commentCount = _b.sent();
                return [4 /*yield*/, prismaClient_1.default.blog.aggregate({
                        where: {
                            authorId: blogger.id,
                        },
                        _sum: {
                            views: true,
                        },
                    })];
            case 7:
                viewCount = _b.sent();
                totalViews = ((_a = viewCount._sum) === null || _a === void 0 ? void 0 : _a.views) || 0;
                return [4 /*yield*/, getBarChartData()];
            case 8:
                barChartData = _b.sent();
                return [4 /*yield*/, getPieChartData()];
            case 9:
                pieChartData = _b.sent();
                return [2 /*return*/, {
                        blogCount: blogCount,
                        cancelBlogCount: cancelBlogCount,
                        approvedBlogCount: approvedBlogCount,
                        pendingBlogCount: pendingBlogCount,
                        commentCount: commentCount,
                        totalViews: totalViews,
                        barChartData: barChartData,
                        pieChartData: pieChartData
                    }];
        }
    });
}); };
var getBarChartData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var appointmentCountByDay, formattedMetadata;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prismaClient_1.default.$queryRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        SELECT DATE_TRUNC('day', \"createdAt\") AS day,\n               COUNT(*) AS count\n        FROM \"blogs\"\n        GROUP BY day\n        ORDER BY day ASC\n    "], ["\n        SELECT DATE_TRUNC('day', \"createdAt\") AS day,\n               COUNT(*) AS count\n        FROM \"blogs\"\n        GROUP BY day\n        ORDER BY day ASC\n    "])))];
            case 1:
                appointmentCountByDay = _a.sent();
                formattedMetadata = appointmentCountByDay.map(function (_a) {
                    var day = _a.day, count = _a.count;
                    return ({
                        day: day,
                        count: Number(count), // Convert BigInt to integer
                    });
                });
                return [2 /*return*/, formattedMetadata];
        }
    });
}); };
var getPieChartData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var appointmentStatusDistribution, formattedData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prismaClient_1.default.blog.groupBy({
                    by: ["id"],
                    _count: { id: true },
                })];
            case 1:
                appointmentStatusDistribution = _a.sent();
                formattedData = appointmentStatusDistribution.map(function (_a) {
                    var id = _a.id, _count = _a._count;
                    return ({
                        id: id,
                        count: Number(_count.id), // Convert BigInt to integer
                    });
                });
                return [2 /*return*/, formattedData];
        }
    });
}); };
exports.metaServices = {
    fetchDashboardMetadata: fetchDashboardMetadata,
};
var templateObject_1;
