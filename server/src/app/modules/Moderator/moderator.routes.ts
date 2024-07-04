import express, { NextFunction, Request, Response } from "express";

import { validateRequest } from "../../middlewares/validateRequest";

import authGuard from "../../middlewares/authGuard";
import { UserRole } from "@prisma/client";
import { ModeratorController } from "./moderator.controller";
import { moderatorValidationSchemas } from "./moderator.validation";


const router = express.Router();

router.get(
  "/",
  authGuard(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  ModeratorController.getAllModerator
);

router.get("/:id", ModeratorController.getSingleModerator);

router.patch(
  "/:id",
  validateRequest(moderatorValidationSchemas.updateModeratorSchema),
  ModeratorController.updateModerator
);

router.delete("/:id", ModeratorController.deleteModerator);

router.delete("/soft/:id", ModeratorController.softDeleteModerator);

export const ModeratorRoutes = router;
