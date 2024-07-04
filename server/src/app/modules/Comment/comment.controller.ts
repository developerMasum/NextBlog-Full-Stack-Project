import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { CommentServices } from "./comment.service";
import { Request, Response } from "express";

const createComment = catchAsync(async (req: Request & {user?:any}, res: Response) => {
const user=req.user;
  const result = await CommentServices.createCommentIntoDB(user,req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment created successfully!",
    data: result,
  });
});

const updateMyComment = catchAsync(async (req: Request & {user?:any}, res: Response) => {
  const { id } = req.params;
  const user =req.user;
  const payload=req.body;
  console.log(payload)
  const result = await CommentServices.updateCommentIntoDb(id, req.body,user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment updated successfully!",
    data: result,
  });
});
const deleteComment = catchAsync(async (req: Request & {user?:any}, res: Response) => {
  const { id } = req.params;
  const user =req.user;
  const result = await CommentServices.deleteCommentFromDB(id,user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delete comment  successfully!",
    data: result,
  });
});
const getSingleComment = catchAsync(async (req: Request & {user?:any}, res: Response) => {
  const { id } = req.params;
  const user= req.user
  
  const result = await CommentServices.getSingleCommentFromDB(id,user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment fetched  successfully!",
    data: result,
  });
});
const getAllComments = catchAsync(async (req: Request & {user?:any}, res: Response) => {
  const { blogId } = req.params;

  const result = await CommentServices.getAllCommentsFromDB(blogId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comments fetched successfully!",
    data: result,
  });
});

export const CommentControllers = {
  createComment,updateMyComment,deleteComment,getAllComments,getSingleComment
};
