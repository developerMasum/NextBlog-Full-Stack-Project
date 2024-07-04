import { Request, Response } from 'express';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthorService } from './author.service';
import catchAsync from '../../../shared/catchAsync';
import { filterValidQueryParams } from '../../../shared/filterValidQueryParams';

import { paginationAndSortingParams } from '../../../shared/appConstants';
import { authorValidParams } from './author.constant';

const getAllAuthor = catchAsync(async (req: Request, res: Response) => {
   const validQueryParams = filterValidQueryParams(req.query, authorValidParams);
   const paginationAndSortingQueryParams = filterValidQueryParams(
      req.query,
      paginationAndSortingParams
   );

   const result = await AuthorService.getAllAuthorFomDB(
      validQueryParams,
      paginationAndSortingQueryParams
   );

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Author data fetched!',
      meta: result.meta,
      data: result.result,
   });
});

const getSingleAuthor = catchAsync(async (req: Request, res: Response) => {
   const { id } = req.params;

   const result = await AuthorService.getSingleAuthorFromDB(id);
   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Author data fetched successfully!',
      data: result,
   });
});

const updateAuthor = catchAsync(async (req: Request, res: Response) => {
   const { id } = req.params;

   const result = await AuthorService.updateAuthorIntoDB(id, req.body);
   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Author data updated successfully!',
      data: result,
   });
});

const deleteAuthor = catchAsync(async (req: Request, res: Response) => {
   const { id } = req.params;

   const result = await AuthorService.deleteAuthorFromDB(id);
   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Author data deleted successfully!',
      data: result,
   });
});

const softDeleteAuthor = catchAsync(async (req: Request, res: Response) => {
   const { id } = req.params;

   const result = await AuthorService.softDeleteAuthorFromDB(id);
   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Author data deleted!',
      data: result,
   });
});

export const AuthorController = {
   getAllAuthor,
   getSingleAuthor,
   updateAuthor,
   deleteAuthor,
   softDeleteAuthor,
};
