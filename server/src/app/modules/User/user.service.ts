import { Admin, Prisma, UserRole, UserStatus } from "@prisma/client";

import prisma from "../../../shared/prismaClient";

import { hashedPassword } from "./user.utils";

import { userSearchableFields } from "./user.constant";
import { generatePaginateAndSortOptions } from "../../../helpers/paginationHelpers";
import {
  IPaginationParams,
  ISortingParams,
} from "../../interfaces/paginationSorting";
import { IUserFilterParams } from "./user.interface";
import { HTTPError } from "../../errors/HTTPError";
import httpStatus from "http-status";

const createAdmin = async (payload: any) => {
  const { password, ...admin } = payload;

  const hashPassword = await hashedPassword(password);

  const result = await prisma.$transaction(async (transactionClient:any) => {
    const newUser = await transactionClient.user.create({
      data: {
        email: admin.email,
        password: hashPassword,
        role: UserRole.ADMIN,
        name:admin.name,
        profilePhoto:admin.profilePhoto
      },
    });
    console.log({ newUser });
    const newAdmin = await transactionClient.admin.create({
      data: admin,
    });

    return newAdmin;
  });

  return result;
};
const createAuthor = async (payload: any) => {
  const { password, ...author } = payload;

  const hashPassword = await hashedPassword(password);

  const result = await prisma.$transaction(async (transactionClient:any) => {
    const newUser = await transactionClient.user.create({
      data: {
        email: author.email,
        password: hashPassword,
        role: UserRole.BLOGGER,
        name:author.name,
        profilePhoto:author.profilePhoto
      },
    });

    const newAuthor = await transactionClient.author.create({
      data: author,
    });

    return newAuthor;
  });

  return result;
};
const createModarator = async (payload: any) => {
  const { password, ...modarator } = payload;

  const hashPassword = await hashedPassword(password);

  const result = await prisma.$transaction(async (transactionClient:any) => {
    await transactionClient.user.create({
      data: {
        email: modarator.email,
        password: hashPassword,
        role: UserRole.MODERATOR,
        name:modarator.name,
        profilePhoto:modarator.profilePhoto
      },
    });

    const newModarator = await transactionClient.moderator.create({
      data: modarator,
    });

    return newModarator;
  });

  return result;
};
const createSubscriber = async (payload: any) => {
  const { password, ...subscriber } = payload;

  const isExist = await prisma.user.findUnique({
    where:{
      email:subscriber.email
    }
  })

  if(isExist){
    throw new HTTPError(httpStatus.BAD_REQUEST,'The email already register')
  }

  const hashPassword = await hashedPassword(password);
 

  const result = await prisma.$transaction(async (transactionClient:any) => {
    const userCreate = await transactionClient.user.create({
      data: {
        name: subscriber.name,
        email: subscriber.email,
        password: hashPassword,
        role: UserRole.SUBSCRIBER,
        profilePhoto:subscriber.profilePhoto
      },
    });

    console.log({ userCreate });

    const newSubscriber = await transactionClient.subscriber.create({
      data: subscriber,
    });

    return newSubscriber;
  });

  return result;
};

const getAllUsersFromDb = async (
  queryParams: IUserFilterParams,
  paginationAndSortingQueryParams: IPaginationParams & ISortingParams,
  user: any
) => {
  console.log(user);
  const { q, ...otherQueryParams } = queryParams;

  const { limit, skip, page, sortBy, sortOrder } =
    generatePaginateAndSortOptions({
      ...paginationAndSortingQueryParams,
    });

  const conditions: Prisma.UserWhereInput[] = [];

 
  if (q) {
    const searchConditions = userSearchableFields.map((field) => ({
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

  const result = await prisma.user.findMany({
    where: { AND: conditions },
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.user.count({
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

const getMyProfile = async (authUser: any) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: authUser.email,
      status: UserStatus.ACTIVE,
    },
    select: {
      email: true,
      role: true,
      passwordChangeRequired: true,
      status: true,
    },
  });

  let profileData;
  if (userData?.role === UserRole.ADMIN || userData?.role === UserRole.SUPER_ADMIN) {
    profileData = await prisma.admin.findUnique({
      where: {
        email: userData.email,
      },
    });
  } else if (userData?.role === UserRole.BLOGGER) {
    profileData = await prisma.author.findUnique({
      where: {
        email: userData.email,
      },
    });
  } else if (userData?.role === UserRole.MODERATOR) {
    profileData = await prisma.moderator.findUnique({
      where: {
        email: userData.email,
      },
    });
  }
  return { ...profileData, ...userData };
};

const updateMyProfile = async (authUser: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: authUser.email,
      status: UserStatus.ACTIVE,
    },
  });

  if(payload.profilePhoto){
    await prisma.user.update({
      where:{
        email:authUser.email
      },
      data:{
        profilePhoto:payload.profilePhoto
      }
    })
  }
  if(payload.name){
    await prisma.user.update({
      where:{
        email:authUser.email
      },
      data:{
        name:payload.name
      }
    })
  }

  let profileData;
  if (userData?.role === UserRole.ADMIN || userData?.role === UserRole.SUPER_ADMIN) {
    profileData = await prisma.admin.update({
      where: {
        email: userData.email,
      },
      data: payload,
    });
  } else if (userData?.role === UserRole.BLOGGER) {
    profileData = await prisma.author.update({
      where: {
        email: userData.email,
      },
      data: payload,
    });
  } else if (userData?.role === UserRole.MODERATOR) {
    profileData = await prisma.moderator.update({
      where: {
        email: userData.email,
      },
      data: payload,
    });
  }
  return { ...profileData, ...userData };
};

const changeProfileStatus = async (userId: string, status: UserStatus) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!isUserExist) {
    throw new HTTPError(httpStatus.BAD_REQUEST, "User does not exists!");
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data:status,
  });

  return updatedUser;
};
export const userServices = {
  createAdmin,
  createAuthor,
  createModarator,
  createSubscriber,
  getAllUsersFromDb,
  getMyProfile,
  updateMyProfile,
  changeProfileStatus,
};
