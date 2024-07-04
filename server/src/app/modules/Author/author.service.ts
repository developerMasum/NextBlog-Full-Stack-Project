import { Author, Prisma, UserStatus } from '@prisma/client';
import prisma from '../../../shared/prismaClient';
import {
   IPaginationParams,
   ISortingParams,
} from '../../interfaces/paginationSorting';

import { generatePaginateAndSortOptions } from '../../../helpers/paginationHelpers';

import { IUserFilterParams } from '../User/user.interface';
import { authorSearchableFields } from './author.constant';

const getAllAuthorFomDB = async (
   queryParams: IUserFilterParams,
   paginationAndSortingQueryParams: IPaginationParams & ISortingParams
) => {
   const { q, ...otherQueryParams } = queryParams;

   const { limit, skip, page, sortBy, sortOrder } =
      generatePaginateAndSortOptions({
         ...paginationAndSortingQueryParams,
      });

   const conditions: Prisma.AuthorWhereInput[] = [];

   // filtering out the soft deleted users
   conditions.push({
      isDeleted: false,
   });

   //@ searching
   if (q) {
      const searchConditions = authorSearchableFields.map((field) => ({
         [field]: { contains: q, mode: 'insensitive' },
      }));
      conditions.push({ OR: searchConditions });
   }

   //@ filtering with exact value
   if (Object.keys(otherQueryParams).length > 0) {
      const filterData = Object.keys(otherQueryParams).map((key) => ({
         [key]: (otherQueryParams as any)[key],
      }));
      conditions.push(...filterData);
   }

   const result = await prisma.author.findMany({
      where: { AND: conditions },
      skip,
      take: limit,
      orderBy: {
         [sortBy]: sortOrder,
      },
   });

   const total = await prisma.author.count({
      where: { AND: conditions },
   });

   return {
      meta: {
         page,
         limit,
         total,
      },
      result,
   };
};

const getSingleAuthorFromDB = async (id: string) => {
   return await prisma.author.findUniqueOrThrow({
      where: {
         id,
         isDeleted: false,
      },
   });
};

// const updateAuthorIntoDB = async (
//    id: string,
//    data: Partial<Author>
// ): Promise<Author> => {
//    await prisma.author.findUniqueOrThrow({
//       where: {
//          id,
//          isDeleted: false,
//       },
//    });

//    return await prisma.author.update({
//       where: {
//          id,
//       },
//       data,
//    });
// };



const updateAuthorIntoDB = async (
   id: string,
   data: Partial<Author>
 ): Promise<Author> => {

  

   const authorData = await prisma.author.findUniqueOrThrow({
     where: {
       id,
       isDeleted: false,
     },
   });

   if(data.name){
      await prisma.user.update({
         where:{
            email:authorData.email
         },
         data:{
            name:data.name
         }
      })
   }
   if(data.profilePhoto){
      await prisma.user.update({
         where:{
            email:authorData.email
         },
         data:{
            profilePhoto:data.profilePhoto
         }
      })
   }
 
   const result = await prisma.$transaction(async (tx) => {
     const updatedModerator = await tx.author.update({
       where: {
         id,
       },
       data,
     });
 
     if (data.name) {
       await tx.user.update({
         where: {
           email: authorData.email,
         },
         data: {
         //   profilePhoto: data.profilePhoto,
           name:updatedModerator.name
         },
       });
     }
 
     return updatedModerator;
   });
 
   return result;
 };
const deleteAuthorFromDB = async (id: string): Promise<Author> => {
   await prisma.author.findUniqueOrThrow({
      where: {
         id,
         isDeleted: false,
      },
   });

   return await prisma.$transaction(async (trClient) => {
      const deletedAuthor = await trClient.author.delete({
         where: {
            id,
         },
      });

      await trClient.user.delete({
         where: {
            email: deletedAuthor.email,
         },
      });

      return deletedAuthor;
   });
};

const softDeleteAuthorFromDB = async (id: string): Promise<Author | null> => {
   await prisma.author.findUniqueOrThrow({
      where: {
         id,
         isDeleted: false,
      },
   });

   return await prisma.$transaction(async (trClient) => {
      const authorDeletedData = await trClient.author.update({
         where: {
            id,
         },
         data: {
            isDeleted: true,
         },
      });

      await trClient.user.update({
         where: {
            email: authorDeletedData.email,
         },
         data: {
            status: UserStatus.DELETED,
         },
      });

      return authorDeletedData;
   });
};

export const AuthorService = {
   getAllAuthorFomDB,
   getSingleAuthorFromDB,
   updateAuthorIntoDB,
   deleteAuthorFromDB,
   softDeleteAuthorFromDB,
};
