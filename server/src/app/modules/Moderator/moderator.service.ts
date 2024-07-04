import { Moderator, Prisma, User, UserStatus } from "@prisma/client";
import prisma from "../../../shared/prismaClient";
import {
  IPaginationParams,
  ISortingParams,
} from "../../interfaces/paginationSorting";

import { generatePaginateAndSortOptions } from "../../../helpers/paginationHelpers";

import { IUserFilterParams } from "../User/user.interface";
import { moderatorSearchableFields } from "./moderator.constant";

const getAllModeratorFomDB = async (
  queryParams: IUserFilterParams,
  paginationAndSortingQueryParams: IPaginationParams & ISortingParams
) => {
  const { q, ...otherQueryParams } = queryParams;

  const { limit, skip, page, sortBy, sortOrder } =
    generatePaginateAndSortOptions({
      ...paginationAndSortingQueryParams,
    });

  const conditions: Prisma.ModeratorWhereInput[] = [];

  // filtering out the soft deleted users
  conditions.push({
    isDeleted: false,
  });

  //@ searching
  if (q) {
    const searchConditions = moderatorSearchableFields.map((field) => ({
      [field]: { contains: q, mode: "insensitive" },
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

  const result = await prisma.moderator.findMany({
    where: { AND: conditions },
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.moderator.count({
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

const getSingleModeratorFromDB = async (id: string) => {
  return await prisma.moderator.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
};

const updateModeratorIntoDB = async (
   id: string,
   data: Partial<Moderator>
 ): Promise<Moderator> => {
   const moderatorData = await prisma.moderator.findUniqueOrThrow({
     where: {
       id,
       isDeleted: false,
     },
   });


   if(data.name){
    await prisma.user.update({
       where:{
          email:moderatorData.email
       },
       data:{
          name:data.name
       }
    })
 }
 if(data.profilePhoto){
    await prisma.user.update({
       where:{
          email:moderatorData.email
       },
       data:{
          profilePhoto:data.profilePhoto
       }
    })
 }
 
   const result = await prisma.$transaction(async (tx) => {
     const updatedModerator = await tx.moderator.update({
       where: {
         id,
       },
       data,
     });
 
     if (data.profilePhoto) {
       await tx.user.update({
         where: {
           email: moderatorData.email,
         },
         data: {
           profilePhoto: data.profilePhoto,
         },
       });
     }
 
     return updatedModerator;
   });
 
   return result;
 };
 


 


const deleteModeratorFromDB = async (id: string): Promise<Moderator> => {
  await prisma.moderator.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  return await prisma.$transaction(async (trClient) => {
    const deletedModerator = await trClient.moderator.delete({
      where: {
        id,
      },
    });

    await trClient.user.delete({
      where: {
        email: deletedModerator.email,
      },
    });

    return deletedModerator;
  });
};

const softDeleteModeratorFromDB = async (
  id: string
): Promise<Moderator | null> => {
  await prisma.moderator.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  return await prisma.$transaction(async (trClient) => {
    const ModeratorDeletedData = await trClient.moderator.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    await trClient.user.update({
      where: {
        email: ModeratorDeletedData.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });

    return ModeratorDeletedData;
  });
};

export const ModeratorService = {
  getAllModeratorFomDB,
  getSingleModeratorFromDB,
  updateModeratorIntoDB,
  deleteModeratorFromDB,
  softDeleteModeratorFromDB,
};
