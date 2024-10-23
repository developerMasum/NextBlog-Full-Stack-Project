import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";

const app: Application = express();

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://gym-nex-full-stack-app.vercel.app",
  ],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1", router);

// app.use((req: Request, res: Response, next: NextFunction) => {
//    res.status(httpStatus.NOT_FOUND).json({
//       success: false,
//       message: "Oops! It looks like this page doesn't exist.",
//       error: {
//          path: req.originalUrl,
//          error: `The requested URL was not found on this server.`,
//          suggestion: 'Double-check the URL',
//       },
//    });
// });

app.use(globalErrorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("BlogPlex server is running!");
});

export default app;
