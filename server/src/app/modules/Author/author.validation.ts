import { z } from 'zod';

const updateAuthorSchema = z.object({
   body: z.object({
      name: z.string().optional(),
      contactNumber: z.string().optional(),
   }),
});

export const authorValidationSchemas = {
   updateAuthorSchema,
};
