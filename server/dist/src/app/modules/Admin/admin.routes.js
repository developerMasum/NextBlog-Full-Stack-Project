"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
var express_1 = __importDefault(require("express"));
var admin_controller_1 = require("./admin.controller");
var validateRequest_1 = require("../../middlewares/validateRequest");
var admin_ValidationSchema_1 = require("./admin.ValidationSchema");
var authGuard_1 = __importDefault(require("../../middlewares/authGuard"));
var client_1 = require("@prisma/client");
var router = express_1.default.Router();
router.get('/', 
// authGuard(UserRole.ADMIN, UserRole.SUPER_ADMIN),
admin_controller_1.AdminController.getAllAdmin);
router.get('/:id', (0, authGuard_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN), admin_controller_1.AdminController.getSingleAdmin);
router.patch('/:id', (0, authGuard_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN), (0, validateRequest_1.validateRequest)(admin_ValidationSchema_1.adminValidationSchemas.update), admin_controller_1.AdminController.updateAdmin);
router.delete('/:id', (0, authGuard_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN), admin_controller_1.AdminController.deleteAdmin);
router.delete('/soft/:id', (0, authGuard_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN), admin_controller_1.AdminController.softDeleteAdmin);
exports.AdminRoutes = router;
