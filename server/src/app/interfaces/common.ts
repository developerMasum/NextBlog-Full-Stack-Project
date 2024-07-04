import { UserRole } from '@prisma/client';

export type VerifiedUser = {
   email: string;
   role: UserRole;
   iat: number;
   exp: number;
};



// export type IAuthUser = {
//    userId: string;
//    role: ENUM_USER_ROLE,
//    email: string
//  } | null
