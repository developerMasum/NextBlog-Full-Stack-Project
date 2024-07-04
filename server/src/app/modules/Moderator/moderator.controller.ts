import { Request, Response } from 'express';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';

import catchAsync from '../../../shared/catchAsync';
import { filterValidQueryParams } from '../../../shared/filterValidQueryParams';

import { paginationAndSortingParams } from '../../../shared/appConstants';
import { authorValidParams } from '../Author/author.constant';
import { ModeratorService } from './moderator.service';


const getAllModerator = catchAsync(async (req: Request, res: Response) => {
   const validQueryParams = filterValidQueryParams(req.query, authorValidParams);
   const paginationAndSortingQueryParams = filterValidQueryParams(
      req.query,
      paginationAndSortingParams
   );

   const result = await ModeratorService.getAllModeratorFomDB(
      validQueryParams,
      paginationAndSortingQueryParams
   );

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Moderator data fetched!',
      meta: result.meta,
      data: result.result,
   });
});

const getSingleModerator = catchAsync(async (req: Request, res: Response) => {
   const { id } = req.params;

   const result = await ModeratorService.getSingleModeratorFromDB(id);
   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Moderator data fetched successfully!',
      data: result,
   });
});

const updateModerator = catchAsync(async (req: Request, res: Response) => {
   const { id } = req.params;

   const result = await ModeratorService.updateModeratorIntoDB(id, req.body);
   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Moderator data updated successfully!',
      data: result,
   });
});

const deleteModerator = catchAsync(async (req: Request, res: Response) => {
   const { id } = req.params;

   const result = await ModeratorService.deleteModeratorFromDB(id);
   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Moderator data deleted successfully!',
      data: result,
   });
});

const softDeleteModerator = catchAsync(async (req: Request, res: Response) => {
   const { id } = req.params;

   const result = await ModeratorService.softDeleteModeratorFromDB(id);
   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Moderator data deleted!',
      data: result,
   });
});

export const ModeratorController = {
   getAllModerator,
   getSingleModerator,
   updateModerator,
   deleteModerator,
   softDeleteModerator,
};
