"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
var zod_1 = require("zod");
var createAdminSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string(),
        email: zod_1.z.string().email(),
        name: zod_1.z.string(),
        contactNumber: zod_1.z.string(),
    }),
});
var createAuthorSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string(),
        email: zod_1.z.string().email(),
        name: zod_1.z.string(),
        contactNumber: zod_1.z.string(),
        gender: zod_1.z.enum(["MALE", "FEMALE"]),
    }),
});
var createModaratorSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string(),
        email: zod_1.z.string().email(),
        name: zod_1.z.string(),
        contactNumber: zod_1.z.string(),
        gender: zod_1.z.enum(["MALE", "FEMALE"]),
    }),
});
var userUpdateStatus = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["ACTIVE", "BLOCKED", "DELETED"]),
    }),
});
exports.userValidationSchema = {
    createAdminSchema: createAdminSchema,
    userUpdateStatus: userUpdateStatus,
    createAuthorSchema: createAuthorSchema,
    createModaratorSchema: createModaratorSchema
};
