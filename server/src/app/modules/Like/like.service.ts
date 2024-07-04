import httpStatus from "http-status";
import prisma from "../../../shared/prismaClient";
import { HTTPError } from "../../errors/HTTPError";

const like = async (blogId: string, userId: string) => {
  console.log({ blogId, userId });
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  const existingLike = await prisma.like.findFirst({
    where: {
      blogId: blogId,
      userId: userData.id,
    },
  });

  console.log(existingLike);

  if (existingLike) {
    return await prisma.$transaction(async (tx) => {
      await tx.like.delete({
        where: {
          id: existingLike.id,
        },
      });

      const updatedBlog = await tx.blog.update({
        where: {
          id: blogId,
        },
        data: { likeCount: { decrement: 1 } },
      });
      return updatedBlog;
    });
  }

  if (!existingLike) {
    return await prisma.$transaction(async (tx) => {
      const createLike = await tx.like.create({
        data: {
          blogId: blogId,
          userId: userId,
        },
      });
      const updatedBlog = await tx.blog.update({
        where: {
          id: blogId,
        },
        data: { likeCount: { increment: 1 } },
      });
      return updatedBlog;
    });
  }
};

export const LikeServices = {
  like,
};
