import { z } from 'zod';

const update = z.object({
   body: z.object({
      name: z.string().optional(),
      contactNumber: z.string().optional(),
      address: z.string().optional(),
      profilePhoto:z.string().optional(),
      gender: z.enum(['MALE','FEMALE']).optional(),
   }),
});

export const adminValidationSchemas = {
   update,
};
