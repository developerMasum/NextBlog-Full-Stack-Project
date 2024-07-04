"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorRoutes = void 0;
var express_1 = __importDefault(require("express"));
var validateRequest_1 = require("../../middlewares/validateRequest");
var author_controller_1 = require("./author.controller");
var author_validation_1 = require("./author.validation");
var router = express_1.default.Router();
router.get("/", 
// authGuard(UserRole.ADMIN, UserRole.SUPER_ADMIN),
author_controller_1.AuthorController.getAllAuthor);
router.get("/:id", author_controller_1.AuthorController.getSingleAuthor);
router.patch("/:id", (0, validateRequest_1.validateRequest)(author_validation_1.authorValidationSchemas.updateAuthorSchema), author_controller_1.AuthorController.updateAuthor);
router.delete("/:id", author_controller_1.AuthorController.deleteAuthor);
router.delete("/soft/:id", author_controller_1.AuthorController.softDeleteAuthor);
exports.AuthorRoutes = router;
