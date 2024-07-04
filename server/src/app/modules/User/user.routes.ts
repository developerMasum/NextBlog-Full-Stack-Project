import express from "express";

import authGuard from "../../middlewares/authGuard";
import { UserRole } from "@prisma/client";

import { userController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { userValidationSchema } from "./user.validationSchema";



const router = express.Router();
router.get('/',authGuard(UserRole.ADMIN,UserRole.SUPER_ADMIN),userController.getAllUsers)
router.get(
  '/me',
  authGuard(UserRole.ADMIN,UserRole.BLOGGER,UserRole.MODERATOR,UserRole.SUPER_ADMIN),
  userController.getMyProfile
)

router.patch(
  '/update-my-profile',
  authGuard(UserRole.ADMIN,UserRole.BLOGGER,UserRole.MODERATOR,UserRole.SUPER_ADMIN),
  userController.updateMyProfile

);
router.patch(
  '/:id/status',
  authGuard(UserRole.ADMIN,UserRole.SUPER_ADMIN),
  validateRequest(userValidationSchema.userUpdateStatus),
  userController.changeProfileStatus,
);

router.post(
  '/create-admin',
authGuard(UserRole.ADMIN,UserRole.SUPER_ADMIN),
validateRequest(userValidationSchema.createAdminSchema),
  userController.createAdmin
);

router.post('/create-author',
//  authGuard(UserRole.ADMIN,UserRole.SUPER_ADMIN),validateRequest(userValidationSchema.createAuthorSchema), 
userController.createAuthor)
router.post('/create-moderator', 

// authGuard(UserRole.ADMIN,UserRole.SUPER_ADMIN),

validateRequest(userValidationSchema.createModaratorSchema), userController.createModarator)
router.post('/create-subscriber', userController.createSubscriber)

export const userRoutes = router;
