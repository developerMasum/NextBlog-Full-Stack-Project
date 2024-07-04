import express, { Request, Response, NextFunction } from "express";

import authGuard from "../../middlewares/authGuard";
import { UserRole } from "@prisma/client";
// import { fileUploader } from "../../../helpers/fileUploader";
import { blogValidationSchema } from "./blog.validation";
import { blogController } from "./blog.controller";
import { userController } from "../User/user.controller";
import { validateRequest } from "../../middlewares/validateRequest";

const router = express.Router();
router.get(
  "/",
  // authGuard(UserRole.ADMIN,UserRole.SUPER_ADMIN,UserRole.BLOGGER),
  blogController.getAllBlogs
);
// router.get('/get-single-blog/:id',)

router.get(
  "/my-blogs",
  authGuard(UserRole.BLOGGER),
  blogController.getMyAllBlogs
);
router.get("/:id",   authGuard(UserRole.ADMIN,UserRole.SUPER_ADMIN,UserRole.BLOGGER,UserRole.SUBSCRIBER,UserRole.MODERATOR),  blogController.getSingleBlog);

router.get("/get-single-blog/:id",  
//  authGuard(UserRole.ADMIN,UserRole.SUPER_ADMIN,UserRole.SUBSCRIBER),
   blogController.getSingleBlogBYModerator);


router.post(
  "/create-blog",

  authGuard(UserRole.BLOGGER),
  // validateRequest(blogValidationSchema.createBlog),
  blogController.createBlog
);
router.delete(
  "/:id",
  authGuard(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.BLOGGER,
    UserRole.MODERATOR
  ),
  blogController.deleteBlog
);

router.patch(
  "/update-blog/:id",
  authGuard(UserRole.MODERATOR,UserRole.BLOGGER,UserRole.ADMIN,UserRole.SUPER_ADMIN),
  validateRequest(blogValidationSchema.updateBlog),
  blogController.updateBlog
);
router.patch(
  "/change-approval-status/:id",
  // authGuard(UserRole.MODERATOR,UserRole.ADMIN,UserRole.SUPER_ADMIN),
  validateRequest(blogValidationSchema.updateChangeApprovalStatusBlog),
  blogController.changeApprovalStatusBlog
);

export const blogRoutes = router;
