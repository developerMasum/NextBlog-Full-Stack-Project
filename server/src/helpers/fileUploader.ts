// // import multer from 'multer';
// // import path from 'path';
// // import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
// // import fs from 'fs';
// // import { UploadedFile } from '../app/interfaces/file';

// // const storage = multer.diskStorage({
// //    destination: function (req, file, cb) {
// //       cb(null, path.join(process.cwd(), '/uploads'));
// //    },
// //    filename: function (req, file, cb) {
// //       cb(null, file.originalname);
// //    },
// // });

// // const upload = multer({ storage: storage });

// // // cloudinary.config({
// // //    cloud_name: 'mizan-ph',
// // //    api_key: '448877366715569',
// // //    api_secret: 'BsXpD1ngFJYBfvlbKcgdPC4wUcc',
// // // });

// // cloudinary.config({
// //   cloud_name: 'sobuj-ph',
// //   api_key: '778578577171575',
// //   api_secret: 'FTTMW86uKvJEcg9BChI_KbWPl5M'
// // });

// // const saveToCloudinary = (
// //    file: UploadedFile
// // ): Promise<UploadApiResponse | undefined> => {
// //    return new Promise((resolve, reject) => {
// //       cloudinary.uploader.upload(
// //          file.path,
// //          { public_id: file.originalname },
// //          (error, result) => {
// //             fs.unlinkSync(file.path);
// //             if (error) {
// //                reject(error);
// //             } else {
// //                resolve(result);
// //             }
// //          }
// //       );
// //    });
// // };

// // export const fileUploader = {
// //    upload,
// //    saveToCloudinary,
// // };

// import { ICloudinaryResponse, IFile } from "./../app/interfaces/file";
// import multer from "multer";
// import path from "path";
// import fs from "fs";

// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: "dr4tvtzda",
//   api_key: "993492718988977",
//   api_secret: "uysc2wfEkSOJqfbHw9o6WBl5bBk",
// });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(process.cwd(), "uploads"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// const uploadToCloudinary = async (
//   file: IFile
// ): Promise<ICloudinaryResponse | undefined> => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(
//       file.path,

//       (error: Error, result: ICloudinaryResponse) => {
//         fs.unlinkSync(file.path);
//         if (error) {
//           reject(error);
//         } else {
//           resolve(result);
//         }
//       }
//     );
//   });
// };

// export const fileUpLoader = {
//   upload,
//   uploadToCloudinary,
// };

import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import * as fs from "fs";
import config from "../config/config";
import { ICloudinaryResponse, IUploadFile } from "../app/interfaces/file";

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadToCloudinary = async (
  file: IUploadFile
): Promise<ICloudinaryResponse | undefined> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      (error: Error, result: ICloudinaryResponse) => {
        fs.unlinkSync(file.path);
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const FileUploadHelper = {
  uploadToCloudinary,
  upload,
};
