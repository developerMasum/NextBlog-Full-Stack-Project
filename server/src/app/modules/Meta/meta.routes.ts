import express from 'express';
import { MetaController } from './meta.controller';
import authGuard from '../../middlewares/authGuard';
import { UserRole } from '@prisma/client';


const router = express.Router();

// Routes for fetching metadata for the dashboard
router.get(
    '/',
    authGuard(UserRole.ADMIN,UserRole.BLOGGER,UserRole.MODERATOR,UserRole.SUPER_ADMIN),
    MetaController.fetchDashboardMetadata
);

export const MetaRoutes = router;