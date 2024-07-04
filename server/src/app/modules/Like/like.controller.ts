import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { LikeServices } from "./like.service";

const like = catchAsync(async (req: Request & {user?:any}, res: Response) => {
  const { blogId } = req.params;
  const { userId } = req.body;
    console.log('user', blogId,userId)
  
  
    const result = await LikeServices.like(blogId, userId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "like created  successfully!",
      data: result,
    });
  });


 

  export const LikeControllers={
like
  }