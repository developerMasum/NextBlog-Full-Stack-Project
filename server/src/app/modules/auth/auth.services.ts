import * as bcrypt from "bcrypt";
import { Secret } from "jsonwebtoken";
import { UserStatus } from "@prisma/client";
import prisma from "../../../shared/prismaClient";
import { jwtHelpers } from "../../../helpers/jwtHelper";
import config from "../../../config/config";
import emailSender from "./emailSender";
import path from "path";
import fs from "fs";
import { HTTPError } from "../../errors/HTTPError";
import httpStatus from "http-status";
import { VerifiedUser } from "../../interfaces/common";

const loginUser = async (payload: { email: string; password: string }) => {
  console.log(payload);
  // const userData = await prisma.user.findUniqueOrThrow({
  //   where: {
  //     email: payload.email,
  //     status: UserStatus.ACTIVE,
  //   },
  // });

  const userData = await prisma.user.findUnique({
    where: {
      email: payload.email,
      status:UserStatus.ACTIVE
    },
  });

  if(!userData){
    throw new HTTPError(httpStatus.BAD_REQUEST,'Email is not valid')
  }

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password is incorrect!");
  }
  const accessToken = jwtHelpers.generateToken(
    {
      userId: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      profilePhoto: userData.profilePhoto,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    passwordChangeRequired: userData.passwordChangeRequired,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_token_secret as Secret
    );
  } catch (err) {
    throw new Error("You are not authorized!");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = jwtHelpers.generateToken(
    {
      userId: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      profilePhoto: userData.profilePhoto,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
  };
};

const changePassword = async (user: VerifiedUser, payload: any) => {
  //@ checking if the user exist
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  //@ checking if the provided old password is correct
  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password is incorrect!");
  }

  //@ hashing the new password
  const hashedPassword = await bcrypt.hash(payload.newPassword, 10);

  //@ updating the password and also changing the passwordChangeRequired to false
  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
      passwordChangeRequired: false,
    },
  });

  return {
    message: "Password change successfully",
  };
};

const forgotPassword = async ({ email }: { email: string }) => {
  //@ checking if the user exist
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: email,
      status: UserStatus.ACTIVE,
    },
  });

  //@ creating a short time token
  const resetPasswordToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.reset_password_token_secret as Secret,
    config.jwt.reset_token_expires_in as string
  );

  //@ generating a link to send via email
  let link = `${config.reset_pass_link}?Id=${userData.id}&token=${resetPasswordToken}`;

  //@ read HTML template file
  const htmlFilePath = path.join(
    process.cwd(),
    "/src/templates/reset_pass_template.html"
  );

  const htmlTemplate = fs.readFileSync(htmlFilePath, "utf8");
  const htmlContent = htmlTemplate.replace("{{resetPasswordLink}}", link);

  await emailSender(userData.email, htmlContent);
};

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string
) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: payload.id,
      status: UserStatus.ACTIVE,
    },
  });

  if (!isUserExist) {
    throw new HTTPError(httpStatus.BAD_REQUEST, "User not found!");
  }

  const isVarified = jwtHelpers.verifyToken(
    token,
    config.jwt.reset_password_token_secret as string
  );

  if (!isVarified) {
    throw new HTTPError(httpStatus.UNAUTHORIZED, "Something went wrong!");
  }

  const password = await bcrypt.hash(
    payload.newPassword,
    Number(config.bycrypt_salt_rounds)
  );

  await prisma.user.update({
    where: {
      id: payload.id,
    },
    data: {
      password,
    },
  });
};

export const authServices = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
