import { Response, Request, Router, NextFunction } from "express";
import excelToJson from "convert-excel-to-json";
const path = require("path");
import fs from "fs";
import { User } from "../models/User";
// const multer = require("multer");
// const upload = multer({ dest: "/resources/uploads/" });
const router = Router();

export var wagingJson = [
  {
    CGO: "000000", // Cargo
    DENOMINACION: "CARGO INEXISTENTE", //nombre del cargo
    P001: 0, // codigo del basico
    C100003: 0, // MONTO DEL BASICO
    P1723: 0, // codigo del Ded. Funcional
    C117230: 0, // MONTO DEL Ded. Funcional
    P1763: 0, // codigo del Ded. Excl (dias no laborados)
    C117630: 0, //MONTO DEL Ded. Excl (dias no laborados)
    P1821: 0, // codigo del Compl. Esp.
    C118210: 0, // MONTO del Compl. Esp.
    C118360: 0, // MONTO Antigüedad (por cada año)
    C110230: 0, // MONTO Ad. Rem
    C117730: 0, // MONTO Est. Doc (ni idea)
    C117430: 0, // MONTO Supl. Cap (lo uso para horas extra)
    C112620: 0, // MONTO Gtos. Inh. Lab. Doc. (ni idea)
    C118420: 0, // MONTO P. Cal Ed
    C117930: 0, // MONTO Func. Jer
    G112335: 0, // MONTO Gremio (%)
  },
];

router.post("/gob", async (req: Request, res: Response, next: NextFunction) => {
  var period = req.body.period;
  if (!period) {
    period = "05-2022";
  }
  const jsonFromExcel = excelToJson({
    source: fs.readFileSync(__dirname + `/../resources/${period}.xlsx`),
    // source: fs.readFileSync(upload),
    header: {
      // Is the number of rows that will be skipped and will not be present at our result object. Counting from top to bottom
      rows: 2,
    },
    columnToKey: {
      "*": "{{columnHeader}}",
    },
  });
  wagingJson = jsonFromExcel.salarios;
  // console.log(jsonFromExcel.salarios);
  return res.status(200).json(wagingJson);
});

router.post(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    // console.log("HACIENDO POST A /API/EXCEL/USERS");
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
    try {
      // await User.bulkCreate(jsonFromExcel.Users);
      return res.status(200).json(jsonFromExcel.Users);
    } catch (error) {
      return res.status(400).json("Uno o más usuarios enviados ya existen");
    }
  }
);

export default router;
