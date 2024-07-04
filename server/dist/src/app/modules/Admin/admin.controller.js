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
exports.AdminController = void 0;
var sendResponse_1 = require("../../../shared/sendResponse");
var http_status_1 = __importDefault(require("http-status"));
var admin_service_1 = require("./admin.service");
var catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
var filterValidQueryParams_1 = require("../../../shared/filterValidQueryParams");
var admin_constants_1 = require("./admin.constants");
var appConstants_1 = require("../../../shared/appConstants");
var getAllAdmin = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validQueryParams, paginationAndSortingQueryParams, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                validQueryParams = (0, filterValidQueryParams_1.filterValidQueryParams)(req.query, admin_constants_1.validParams);
                paginationAndSortingQueryParams = (0, filterValidQueryParams_1.filterValidQueryParams)(req.query, appConstants_1.paginationAndSortingParams);
                return [4 /*yield*/, admin_service_1.AdminService.getAllAdminFomDB(validQueryParams, paginationAndSortingQueryParams)];
            case 1:
                result = _a.sent();
                (0, sendResponse_1.sendResponse)(res, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: 'Admin data fetched!',
                    meta: result.meta,
                    data: result.result,
                });
                return [2 /*return*/];
        }
    });
}); });
var getSingleAdmin = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, admin_service_1.AdminService.getSingleAdminFromDB(id)];
            case 1:
                result = _a.sent();
                (0, sendResponse_1.sendResponse)(res, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: 'Admin data fetched successfully!',
                    data: result,
                });
                return [2 /*return*/];
        }
    });
}); });
var updateAdmin = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, admin_service_1.AdminService.updateAdminIntoDB(id, req.body)];
            case 1:
                result = _a.sent();
                (0, sendResponse_1.sendResponse)(res, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: 'Admin data updated successfully!',
                    data: result,
                });
                return [2 /*return*/];
        }
    });
}); });
var deleteAdmin = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, admin_service_1.AdminService.deleteAdminFromDB(id)];
            case 1:
                result = _a.sent();
                (0, sendResponse_1.sendResponse)(res, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: 'Admin data deleted successfully!',
                    data: result,
                });
                return [2 /*return*/];
        }
    });
}); });
var softDeleteAdmin = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, admin_service_1.AdminService.softDeleteAdminFromDB(id)];
            case 1:
                result = _a.sent();
                (0, sendResponse_1.sendResponse)(res, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: 'Admin data deleted!',
                    data: result,
                });
                return [2 /*return*/];
        }
    });
}); });
exports.AdminController = {
    getAllAdmin: getAllAdmin,
    getSingleAdmin: getSingleAdmin,
    updateAdmin: updateAdmin,
    deleteAdmin: deleteAdmin,
    softDeleteAdmin: softDeleteAdmin,
};