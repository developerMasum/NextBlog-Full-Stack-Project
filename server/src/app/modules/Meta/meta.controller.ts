import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';

import httpStatus from 'http-status';
import { metaServices } from './meta.service';
import { sendResponse } from '../../../shared/sendResponse';

const fetchDashboardMetadata = catchAsync(async (req: Request  & {user?:any}, res: Response) => {
    const user = req.user;
    const result = await metaServices.fetchDashboardMetadata(user);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Meta data fetched successfully',
        data: result,
    });
});

export const MetaController = {
    fetchDashboardMetadata
};