"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorValidationSchemas = void 0;
var zod_1 = require("zod");
var updateAuthorSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        contactNumber: zod_1.z.string().optional(),
    }),
});
exports.authorValidationSchemas = {
    updateAuthorSchema: updateAuthorSchema,
};
