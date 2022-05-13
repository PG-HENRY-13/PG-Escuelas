import { Response, Request, Router, NextFunction } from "express";
import excelToJson from "convert-excel-to-json";
const path = require("path");
import fs from "fs";
import { User } from "../models/User";
// const multer = require("multer");
// const upload = multer({ dest: "/resources/uploads/" });
const router = Router();
import { wagingJson } from "./excel";

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  // console.log(wagingJson);
  return res.status(200).json(wagingJson);
});

export default router;

/*

[
  UsersJobs {
    dataValues: {
      UserCuil: '20373178578',
      JobId: '1018',
      funcJer: '',
      basico: '',
      antig: '',
      zona: '',
      addRem: '',
      dedExcl: '',
      createdAt: 2022-05-12T13:02:24.337Z,
      updatedAt: 2022-05-12T13:02:24.337Z
    },
    _previousDataValues: {
      UserCuil: '20373178578',
      JobId: '1018',
      funcJer: '',
      basico: '',
      antig: '',
      zona: '',
      addRem: '',
      dedExcl: '',
      createdAt: 2022-05-12T13:02:24.337Z,
      updatedAt: 2022-05-12T13:02:24.337Z
    },
    uniqno: 1,
    _changed: Set(0) {},
    _options: {
      isNewRecord: false,
      _schema: null,
      _schemaDelimiter: '',
      raw: true,
      attributes: [Array]
    },
    isNewRecord: false
  },
  UsersJobs {
    dataValues: {
      UserCuil: '20373178578',
      JobId: '3012',
      funcJer: '',
      basico: '',
      antig: '',
      zona: '',
      addRem: '',
      dedExcl: '',
      createdAt: 2022-05-12T13:02:24.333Z,
      updatedAt: 2022-05-12T13:02:24.333Z
    },
    _previousDataValues: {
      UserCuil: '20373178578',
      JobId: '3012',
      funcJer: '',
      basico: '',
      antig: '',
      zona: '',
      addRem: '',
      dedExcl: '',
      createdAt: 2022-05-12T13:02:24.333Z,
      updatedAt: 2022-05-12T13:02:24.333Z
    },
    uniqno: 1,
    _changed: Set(0) {},
    _options: {
      isNewRecord: false,
      _schema: null,
      _schemaDelimiter: '',
      raw: true,
      attributes: [Array]
    },
    isNewRecord: false
  }
]
*/
