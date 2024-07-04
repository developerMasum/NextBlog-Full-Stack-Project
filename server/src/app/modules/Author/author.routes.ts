import express, { NextFunction, Request, Response } from "express";

import { validateRequest } from "../../middlewares/validateRequest";

import authGuard from "../../middlewares/authGuard";
import { UserRole } from "@prisma/client";
import { AuthorController } from "./author.controller";
import { authorValidationSchemas } from "./author.validation";

const router = express.Router();

router.get(
  "/",
  // authGuard(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  AuthorController.getAllAuthor
);

router.get("/:id", AuthorController.getSingleAuthor);

router.patch(
  "/:id",
  validateRequest(authorValidationSchemas.updateAuthorSchema),
  AuthorController.updateAuthor
);

router.delete("/:id", AuthorController.deleteAuthor);

router.delete("/soft/:id", AuthorController.softDeleteAuthor);

export const AuthorRoutes = router;
