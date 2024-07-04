"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
var express_1 = __importDefault(require("express"));
var authGuard_1 = __importDefault(require("../../middlewares/authGuard"));
var client_1 = require("@prisma/client");
// import { fileUploader } from "../../../helpers/fileUploader";
var blog_validation_1 = require("./blog.validation");
var blog_controller_1 = require("./blog.controller");
var validateRequest_1 = require("../../middlewares/validateRequest");
var router = express_1.default.Router();
router.get("/", 
// authGuard(UserRole.ADMIN,UserRole.SUPER_ADMIN,UserRole.BLOGGER),
blog_controller_1.blogController.getAllBlogs);
// router.get('/get-single-blog/:id',)
router.get("/my-blogs", (0, authGuard_1.default)(client_1.UserRole.BLOGGER), blog_controller_1.blogController.getMyAllBlogs);
router.get("/:id", (0, authGuard_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN, client_1.UserRole.BLOGGER, client_1.UserRole.SUBSCRIBER, client_1.UserRole.MODERATOR), blog_controller_1.blogController.getSingleBlog);
router.get("/get-single-blog/:id", 
//  authGuard(UserRole.ADMIN,UserRole.SUPER_ADMIN,UserRole.SUBSCRIBER),
blog_controller_1.blogController.getSingleBlogBYModerator);
router.post("/create-blog", (0, authGuard_1.default)(client_1.UserRole.BLOGGER), 
// validateRequest(blogValidationSchema.createBlog),
blog_controller_1.blogController.createBlog);
router.delete("/:id", (0, authGuard_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN, client_1.UserRole.BLOGGER, client_1.UserRole.MODERATOR), blog_controller_1.blogController.deleteBlog);
router.patch("/update-blog/:id", (0, authGuard_1.default)(client_1.UserRole.MODERATOR, client_1.UserRole.BLOGGER, client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN), (0, validateRequest_1.validateRequest)(blog_validation_1.blogValidationSchema.updateBlog), blog_controller_1.blogController.updateBlog);
router.patch("/change-approval-status/:id", 
// authGuard(UserRole.MODERATOR,UserRole.ADMIN,UserRole.SUPER_ADMIN),
(0, validateRequest_1.validateRequest)(blog_validation_1.blogValidationSchema.updateChangeApprovalStatusBlog), blog_controller_1.blogController.changeApprovalStatusBlog);
exports.blogRoutes = router;
