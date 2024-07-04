"use strict";
// // import multer from 'multer';
// // import path from 'path';
// // import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
// // import fs from 'fs';
// // import { UploadedFile } from '../app/interfaces/file';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadHelper = void 0;
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
var cloudinary_1 = require("cloudinary");
var multer_1 = __importDefault(require("multer"));
var fs = __importStar(require("fs"));
var config_1 = __importDefault(require("../config/config"));
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloudinary.cloud_name,
    api_key: config_1.default.cloudinary.api_key,
    api_secret: config_1.default.cloudinary.api_secret,
});
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
var upload = (0, multer_1.default)({ storage: storage });
var uploadToCloudinary = function (file) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                cloudinary_1.v2.uploader.upload(file.path, function (error, result) {
                    fs.unlinkSync(file.path);
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(result);
                    }
                });
            })];
    });
}); };
exports.FileUploadHelper = {
    uploadToCloudinary: uploadToCloudinary,
    upload: upload,
};
