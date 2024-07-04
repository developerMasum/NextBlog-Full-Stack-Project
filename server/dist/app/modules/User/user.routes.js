"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
var express_1 = __importDefault(require("express"));
var authGuard_1 = __importDefault(require("../../middlewares/authGuard"));
var client_1 = require("@prisma/client");
var user_controller_1 = require("./user.controller");
var validateRequest_1 = require("../../middlewares/validateRequest");
var user_validationSchema_1 = require("./user.validationSchema");
var router = express_1.default.Router();
router.get('/', (0, authGuard_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN), user_controller_1.userController.getAllUsers);
router.get('/me', (0, authGuard_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.BLOGGER, client_1.UserRole.MODERATOR, client_1.UserRole.SUPER_ADMIN), user_controller_1.userController.getMyProfile);
router.patch('/update-my-profile', (0, authGuard_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.BLOGGER, client_1.UserRole.MODERATOR, client_1.UserRole.SUPER_ADMIN), user_controller_1.userController.updateMyProfile);
router.patch('/:id/status', (0, authGuard_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN), (0, validateRequest_1.validateRequest)(user_validationSchema_1.userValidationSchema.userUpdateStatus), user_controller_1.userController.changeProfileStatus);
router.post('/create-admin', (0, authGuard_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN), (0, validateRequest_1.validateRequest)(user_validationSchema_1.userValidationSchema.createAdminSchema), user_controller_1.userController.createAdmin);
router.post('/create-author', 
//  authGuard(UserRole.ADMIN,UserRole.SUPER_ADMIN),validateRequest(userValidationSchema.createAuthorSchema), 
user_controller_1.userController.createAuthor);
router.post('/create-moderator', 
// authGuard(UserRole.ADMIN,UserRole.SUPER_ADMIN),
(0, validateRequest_1.validateRequest)(user_validationSchema_1.userValidationSchema.createModaratorSchema), user_controller_1.userController.createModarator);
router.post('/create-subscriber', user_controller_1.userController.createSubscriber);
exports.userRoutes = router;
