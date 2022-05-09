import { Response, Request, Router, NextFunction } from "express";
import excelToJson from "convert-excel-to-json";
const path = require("path");
import fs from "fs";
import { User } from "../models/User";
const multer = require("multer");
const upload = multer({ dest: "/resources/uploads/" });
const router = Router();

export var json = {};

router.get("/gob", async (req: Request, res: Response, next: NextFunction) => {
  const jsonFromExcel = excelToJson({
    source: fs.readFileSync(__dirname + "/../resources/mayo22.xlsx"),
    // source: fs.readFileSync(upload),
    header: {
      // Is the number of rows that will be skipped and will not be present at our result object. Counting from top to bottom
      rows: 2,
    },
    columnToKey: {
      "*": "{{columnHeader}}",
    },
  });
  json = jsonFromExcel.salarios;
  console.log(jsonFromExcel.salarios);
  return res.status(200).json(json);
});

router.post(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("HACIENDO POST A /API/EXCEL/USERS");
    const jsonFromExcel = excelToJson({
      source: fs.readFileSync(__dirname + "/../resources/users.xlsx"),
      header: {
        // Is the number of rows that will be skipped and will not be present at our result object. Counting from top to bottom
        rows: 1,
      },
      columnToKey: {
        "*": "{{columnHeader}}",
      },
    });
    // console.log(jsonFromExcel.Users);
    await User.bulkCreate(jsonFromExcel.Users);
    return res.status(200).json(jsonFromExcel);
  }
);

export default router;
