import express from 'express';
import authGuard from '../../middlewares/authGuard';
import { UserRole } from '@prisma/client';
import { LikeControllers } from './like.controller';
const router=express.Router()
// router.post("/:id/unlike", authGuard(UserRole.ADMIN,UserRole.MODERATOR,UserRole.SUBSCRIBER,UserRole.SUPER_ADMIN), LikeControllers.unlike);
router.post("/:blogId",
//  authGuard(UserRole.ADMIN,UserRole.MODERATOR,UserRole.SUBSCRIBER,UserRole.SUPER_ADMIN),
 
 LikeControllers.like);



export const LikeRoutes=router;