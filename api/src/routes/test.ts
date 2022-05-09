import { Response, Request, Router, NextFunction } from "express";
import excelToJson from "convert-excel-to-json";
const path = require("path");
import fs from "fs";
import { User } from "../models/User";
// const multer = require("multer");
// const upload = multer({ dest: "/resources/uploads/" });
const router = Router();
import { json } from "./excel";

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  console.log(json);
  return res.status(200).json(json);
});

export default router;
