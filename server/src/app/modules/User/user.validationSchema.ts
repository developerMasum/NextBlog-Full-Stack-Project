import { z } from "zod";

const createAdminSchema = z.object({
  body: z.object({
    password: z.string(),
    email: z.string().email(),
    name: z.string(),
    contactNumber: z.string(),
  }),
});
const createAuthorSchema = z.object({
  body: z.object({
    password: z.string(),
    email: z.string().email(),
    name: z.string(),
    contactNumber: z.string(),
    gender: z.enum(["MALE", "FEMALE"]),
  }),
});
const createModaratorSchema = z.object({
  body: z.object({
    password: z.string(),
    email: z.string().email(),
    name: z.string(),
    contactNumber: z.string(),
    gender: z.enum(["MALE", "FEMALE"]),
  }),
});

const userUpdateStatus = z.object({
  body: z.object({
    status: z.enum(["ACTIVE", "BLOCKED", "DELETED"]),
  }),
});

export const userValidationSchema = {
  createAdminSchema,
  userUpdateStatus,
  createAuthorSchema,
  createModaratorSchema
};
