import express from 'express'
import { CommentControllers } from './comment.controller'
import authGuard from '../../middlewares/authGuard'
import { UserRole } from '@prisma/client'
import { userRoutes } from '../User/user.routes'
const router = express.Router()
router.get("/:blogId", CommentControllers.getAllComments)
router.delete('/:id',authGuard(UserRole.ADMIN,UserRole.SUBSCRIBER,UserRole.MODERATOR,UserRole.SUPER_ADMIN,UserRole.BLOGGER),CommentControllers.deleteComment)
router.patch('/update-comment/:id',authGuard(UserRole.ADMIN,UserRole.SUBSCRIBER,UserRole.MODERATOR,UserRole.SUPER_ADMIN,UserRole.BLOGGER),CommentControllers.updateMyComment)
router.post('/create-comment',
 authGuard(UserRole.ADMIN,UserRole.SUBSCRIBER,UserRole.MODERATOR,UserRole.SUPER_ADMIN,UserRole.BLOGGER), 
 CommentControllers.createComment)
 router.get('/get-single-comment/:id', authGuard(UserRole.ADMIN,UserRole.SUBSCRIBER,UserRole.MODERATOR,UserRole.SUPER_ADMIN,UserRole.BLOGGER),  CommentControllers.getSingleComment)



export const CommentRoutes=router