"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminValidationSchemas = void 0;
var zod_1 = require("zod");
var update = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        contactNumber: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        profilePhoto: zod_1.z.string().optional(),
        gender: zod_1.z.enum(['MALE', 'FEMALE']).optional(),
    }),
});
exports.adminValidationSchemas = {
    update: update,
};
