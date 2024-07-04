import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import { authServices } from './auth.services';

const loginUser = catchAsync(async (req: Request, res: Response) => {
   const result = await authServices.loginUser(req.body);

   const { refreshToken } = result;

   res.cookie('refreshToken', refreshToken, {
      secure: false,
      httpOnly: true,
   });

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Logged in successfully!',
      data: {
         accessToken: result.accessToken,
         passwordChangeRequired: result.passwordChangeRequired,
      },
   });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
   const { refreshToken } = req.cookies;
   console.log(refreshToken,'refreshToken')

   const result = await authServices.refreshToken(refreshToken);

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Access token generated successfully!',
      data: result,
   });
});

const changePassword = catchAsync(
   async (req: Request & { user?: any }, res: Response) => {
      const user = req.user;
      const payload = req.body;

      const result = await authServices.changePassword(user, payload);

      sendResponse(res, {
         statusCode: httpStatus.OK,
         success: true,
         message: 'Password changed successfully!',
         data: {
            status: 200,
            message: 'Password changed successfully!',
          },
      });
   }
);

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
   const result = await authServices.forgotPassword(req.body);

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Check your email to reset your password',
      data: {
         status: 200,
         message: 'Check your email for reset link!',
       },
   });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
   const token = req.headers.authorization || '';
   console.log({token})

   const result = await authServices.resetPassword(req.body,token);

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password reset successfully!',
      data: {
         status: 200,
         message: 'Password Reset Successfully',
       },
   });
});

// const resetPassword = catchAsync(async (req: Request, res: Response) => {

//    const token = req.headers.authorization || "";
//    console.log({token})
//    await authServices.resetPassword(req.body, token);

//    sendResponse(res, {
//        statusCode: 200,
//        success: true,
//        message: "Account recovered!",
//        data: {
//            status: 200,
//            message: 'Password Reset Successfully',
//          },
//    });
// });

export const authController = {
   loginUser,
   refreshToken,
   changePassword,
   forgotPassword,
   resetPassword,
};
