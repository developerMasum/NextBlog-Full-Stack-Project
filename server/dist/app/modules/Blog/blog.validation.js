"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidationSchema = void 0;
var zod_1 = require("zod");
var createBlog = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        content: zod_1.z.string(),
        conclusion: zod_1.z.string(),
        image: zod_1.z.string().optional(),
        authorId: zod_1.z.string(),
        views: zod_1.z.number().optional(),
        visibility: zod_1.z.enum(["PUBLIC", "PRIVATE"]), // Assuming Visibility is an enum
        createdAt: zod_1.z.string(), // Assuming createdAt is a string in ISO format
        updatedAt: zod_1.z.string(),
    })
});
var updateBlog = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        content: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        conclusion: zod_1.z.string().optional()
    }),
});
var updateChangeApprovalStatusBlog = zod_1.z.object({
    body: zod_1.z.object({
        publishedStatus: zod_1.z.enum(["APPROVED", "CANCEL"]).optional()
    }),
});
exports.blogValidationSchema = {
    createBlog: createBlog,
    updateBlog: updateBlog,
    updateChangeApprovalStatusBlog: updateChangeApprovalStatusBlog
};
