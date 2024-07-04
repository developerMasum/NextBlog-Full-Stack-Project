import { hashedPassword } from "./../src/app/modules/User/user.utils";
import { UserRole } from "@prisma/client";
import prisma from "../src/shared/prismaClient";

import * as bcrypt from "bcrypt";

const seedSuperAdmin = async () => {
  const newPassword = await hashPassword("111111");
  try {
    const isExistSuperAdmin = await prisma.user.findFirst({
      where: {
        role: UserRole.SUPER_ADMIN,
      },
    });
    console.log(isExistSuperAdmin)
    if (isExistSuperAdmin) {
      console.log("super  admin already exist");
    }

    const superAdminData = await prisma.user.create({
      data: {
        email: "superadmin1@gmail.com",
        name: "sobuj sorker",
        password: newPassword,
        role: UserRole.SUPER_ADMIN,
    
        admin: {
          create: {
            name: "sobuj sorker",
            contactNumber: "01717722085",
          profilePhoto:'https://i.ibb.co/6vFL1kB/super-Admin.jpg'
    
          },
        },
      },
    });
    console.log("superAdmin created successfully", superAdminData);
  } catch (err: any) {
    console.log(err.message);
  }
};

const hashPassword = async (password: string): Promise<string> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

seedSuperAdmin();
