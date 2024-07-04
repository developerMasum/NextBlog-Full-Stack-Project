import httpStatus from "http-status";
import prisma from "../../../shared/prismaClient";
import { Published_status, UserRole } from "@prisma/client";
import { HTTPError } from "../../errors/HTTPError";
import { VerifiedUser } from "../../interfaces/common";
import { any } from "zod";

const fetchDashboardMetadata = async (user: any) => {
  let metadata;
  switch (user.role) {
    case UserRole.ADMIN:
      metadata = await getAdminDashboardMetadata();
      break;
    case UserRole.SUPER_ADMIN:
      metadata = await getSuperAdminDashboardMetadata();
      break;
    case UserRole.MODERATOR:
      metadata = await getModeratorDashboardMetadata(user);
      break;
    case UserRole.BLOGGER:
      metadata = await getBloggerDashboardMetadata(user);
      break;
    default:
      throw new Error("Invalid user role");
  }

  return metadata;
};

const getAdminDashboardMetadata = async () => {
  const blogCount = await prisma.blog.count();
  const bloggerCount = await prisma.author.count();
  const adminCount = await prisma.admin.count();
  

  const commentCount = await prisma.comment.count();
  const likeCount = await prisma.like.count();
  const moderatorCount = await prisma.moderator.count();
  const pendingBlogCount= await prisma.blog.count({
    where:{
      publishedStatus:Published_status.PENDING
    }
  })
  const approvedBlogCount= await prisma.blog.count({
    where:{
      publishedStatus:Published_status.APPROVED
    }
  })
  const cancelBlogCount= await prisma.blog.count({
    where:{
      publishedStatus:Published_status.CANCEL
    }
  })

  const barChartData = await getBarChartData();
  const pieChartData = await getPieChartData();

  return { blogCount, bloggerCount, adminCount, commentCount, likeCount,pendingBlogCount,approvedBlogCount,cancelBlogCount,pieChartData,barChartData };
};
const getSuperAdminDashboardMetadata = async () => {
  const blogCount = await prisma.blog.count();
  const bloggerCount = await prisma.author.count();
  const adminCount = await prisma.admin.count();
  const userCount=await prisma.user.count()

  const commentCount = await prisma.comment.count();
  const likeCount = await prisma.like.count();
  const moderatorCount = await prisma.moderator.count();
  const pendingBlogCount= await prisma.blog.count({
    where:{
      publishedStatus:Published_status.PENDING
    }
  })
  const approvedBlogCount= await prisma.blog.count({
    where:{
      publishedStatus:Published_status.APPROVED
    }
  })
  const cancelBlogCount= await prisma.blog.count({
    where:{
      publishedStatus:Published_status.CANCEL
    }
  })

  const barChartData = await getBarChartData();
  const pieChartData = await getPieChartData();

  return { blogCount, bloggerCount, adminCount, commentCount, likeCount,pendingBlogCount,approvedBlogCount,cancelBlogCount,pieChartData,barChartData,userCount,moderatorCount };
};
const getModeratorDashboardMetadata = async (user:VerifiedUser) => {
  await prisma.user.findUniqueOrThrow({
    where:{
      email:user?.email
    }
  })
  const bloggerCount = await prisma.author.count();
  const blogCount = await prisma.blog.count();
  const moderatorCount = await prisma.moderator.count();
  const pendingBlogCount= await prisma.blog.count({
    where:{
      publishedStatus:Published_status.PENDING
    }
  })
  const approvedBlogCount= await prisma.blog.count({
    where:{
      publishedStatus:Published_status.APPROVED
    }
  })
  const cancelBlogCount= await prisma.blog.count({
    where:{
      publishedStatus:Published_status.CANCEL
    }
  })

  const commentCount = await prisma.comment.count();
  const likeCount = await prisma.like.count();

  const barChartData = await getBarChartData();
  const pieChartData = await getPieChartData();

  return { blogCount, bloggerCount,  commentCount, likeCount,moderatorCount,pendingBlogCount,approvedBlogCount,cancelBlogCount,barChartData };
};



const getBloggerDashboardMetadata = async (user: VerifiedUser) => {
  const blogger = await prisma.author.findUnique({
    where: {
      email: user?.email,
    },
  });



  if (!blogger) {
    throw new HTTPError(httpStatus.BAD_REQUEST, "Patient not found!");
  }

  const blogCount = await prisma.blog.count({
    where: {
      authorId: blogger.id,
    },
  });

  const pendingBlogCount= await prisma.blog.count({
    where:{
    publishedStatus:Published_status.PENDING
    }
  })
  const approvedBlogCount= await prisma.blog.count({
    where:{
    publishedStatus:Published_status.APPROVED
    }
  })
  const cancelBlogCount= await prisma.blog.count({
    where:{
    publishedStatus:Published_status.CANCEL
    }
  })
  const commentCount= await prisma.comment.count({
  where:{
    authorId:blogger.id
  }})

  const viewCount = await prisma.blog.aggregate({
    where: {
      authorId: blogger.id,
    },
    _sum: {
      views: true,
    },
  });

  const totalViews = viewCount._sum?.views || 0;
  const barChartData = await getBarChartData();
  const pieChartData = await getPieChartData();
  return {
    blogCount,cancelBlogCount,approvedBlogCount,pendingBlogCount,commentCount,totalViews,barChartData, pieChartData
  };
};
const getBarChartData = async () => {
  const appointmentCountByDay: { day: Date; count: bigint }[] =
    await prisma.$queryRaw`
        SELECT DATE_TRUNC('day', "createdAt") AS day,
               COUNT(*) AS count
        FROM "blogs"
        GROUP BY day
        ORDER BY day ASC
    `;

  const formattedMetadata = appointmentCountByDay.map(({ day, count }) => ({
    day,
    count: Number(count), // Convert BigInt to integer
  }));

  return formattedMetadata;
};


const getPieChartData = async () => {
  const appointmentStatusDistribution = await prisma.blog.groupBy({
    by: ["id"],
    _count: { id: true },
  });

  const formattedData = appointmentStatusDistribution.map(
    ({ id, _count }) => ({
      id,
      count: Number(_count.id), // Convert BigInt to integer
    })
  );

  return formattedData;
};

export const metaServices = {
  fetchDashboardMetadata,
};
