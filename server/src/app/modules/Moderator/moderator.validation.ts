import { z } from 'zod';

const updateModeratorSchema = z.object({
   body: z.object({
      name: z.string().optional(),
      contactNumber: z.string().optional(),
   }),
});

export const moderatorValidationSchemas = {
   updateModeratorSchema,
};