import { Response, Request, Router, NextFunction } from "express";
import { json } from "stream/consumers";
import { WageConcept } from "../models/WageConcept";
import { userInfo } from "os";
import { Paycheck } from "../models/Paycheck";
import { Paycheck as PaycheckI } from "../../../src/redux/interfaces";
import { wagingJson } from "./excel";
import { number } from "joi";
import { UsersJobs } from "../models/UsersJobs";
import { Job } from "../models/Job";
import fs from "fs";

import excelToJson from "convert-excel-to-json";
const router = Router();

//   CGO: "000000", // Cargo
//   DENOMINACION: "CARGO INEXISTENTE", //nombre del cargo
//   P001: 0, // codigo del basico
//   C100003: 0, // MONTO DEL BASICO -> baseWage
//   P1723: 0, // codigo del Ded. Funcional
//   C117230: 0, // MONTO DEL Ded. Funcional -> generalDeductions (no lo uso)
//   P1763: 0, // codigo del Ded. Excl (dias no laborados)
//   C117630: 0, // MONTO DEL Ded. Excl (dias no laborados) -> absencesDeductions
//   P1821: 0, // codigo del Compl. Esp.
//   C118210: 0, // MONTO del Compl. Esp.
//   C118360: 0, // MONTO Antigüedad (por cada año) -> seniority
//   C110230: 0, // MONTO Ad. Rem -> additionals
//   C117730: 0, // MONTO Est. Doc (ni idea)
//   C117430: 0, // MONTO Supl. Cap (lo uso para horas extra)
//   C112620: 0, // MONTO Gtos. Inh. Lab. Doc. (ni idea)
//   C118420: 0, // MONTO P. Cal Ed
//   C117930: 0, // MONTO Func. Jer
//   G112335: 0, // MONTO Gremio (%)

router.post(
  "/:cuil",
  async (req: Request, res: Response, next: NextFunction) => {
    const userCuil: string = req.params.cuil;
    // console.log("ENTRA AL POST DEL USUARIO ", userCuil);
    // console.log("LA WAGING JSON ES ", wagingJson);
    const period = "202205"; // ME TIENEN QUE PASAR FECHA EN EL BODY
    const currentYear = new Date().getFullYear();
    var UserJobsArray = await UsersJobs.findAll({
      where: { UserCuil: userCuil },
    });
    var jobs = UserJobsArray.map((UserJobs) => UserJobs.getDataValue("JobId"));

    var monthAndYear: string = period;
    var baseWage: number; //  + baseWage * 30
    var seniority: number; // + seniority * (currentYear - _fecha escalafon en ese job_)
    var underTimeDeductions: number; // not used
    var absencesDeductions: number; // - absencesDeductions* _ausencias no justificadas_
    var additionals: number; // + additionals
    var overTimeAdditional: number; // + overTimeAdditional * overTimeHours
    var unionDeductions: number; // - remunWage * unionDeductions
    var baseWageCode: number; // used in PDF ↓
    var underTimeDeductionsCode: number;
    var absencesDeductionsCode: number;
    var jobId: string;
    var jobName: string;

    if (UserJobsArray) {
      var resultado: string = "";
      //Una vez encontrado el usuario, analizamos su cargo
      // var paychecks: PaycheckI[] = [];

      jobs?.map(async (job) => {
        wagingJson?.map(
          (position: {
            CGO: string;
            DENOMINACION: string;
            C100003: number;
            C117230: number;
            C117630: number;
            C118360: number;
            C110230: number;
            G112335: number;
            C117430: number;
            P001: number;
            P1723: number;
            P1763: number;
          }) => {
            // recorre todos los objetos del array buscando...
            if (job == position.CGO) {
              // compara si el job es el CGO del objeto y usa los valores.
              jobId = position.CGO;
              jobName = position.DENOMINACION;
              baseWage = position.C100003; // SALARIO BASICO (remunerativo)
              underTimeDeductions = position.C117230; // DEDUCCIONES GENERALES (lo uso para horas de menos)
              absencesDeductions = position.C117630; // DEDUCCION POR AUSENCIAS
              seniority = position.C118360; // ANTIGUEDAD (remunerativo)
              additionals = position.C110230; // ADICIONALES (NO REMUNERATIVOS)
              unionDeductions = position.G112335; // GREMIO (porcentaje de remunerativos)
              overTimeAdditional = position.C117430;
              // LOS DE ARRIBA SON LOS VALORES A USAR EN LOS CALCULOS
              baseWageCode = position.P001;
              underTimeDeductionsCode = position.P1723;
              absencesDeductionsCode = position.P1763;
            }
          }
        );

        var daysAbsent = 0; //BUSCAR DE MODEL CONTINGENCIAS
        var overTimeHours = 0; //BUSCAR DE MODEL CONTINGENCIAS
        var underTimeHours = 0; //BUSCAR DE MODEL CONTINGENCIAS
        var seniorityDateYear = currentYear; // TRAER DE USERJOBS
        var seniorityYears = currentYear - seniorityDateYear;

        var paycheck = {
          userCuil: userCuil,
          jobId,
          period,
          jobName,
          baseWage$: baseWage * 30,
          additionals$: additionals,
          seniority$: seniority * seniorityYears,
          overTimeAdditionals$: overTimeHours * overTimeAdditional,
          absencesDeductions$: -(absencesDeductions * daysAbsent),
          underTimeDeductions$: -(underTimeDeductions * underTimeHours),
          unionDeductions$:
            -(baseWage * 30 + seniority * seniorityYears) * unionDeductions,
          baseWageCode,
          underTimeDeductionsCode,
          absencesDeductionsCode,
        };

        try {
          const [newPaycheck, created] = await Paycheck.findOrCreate({
            where: {
              userCuil: paycheck.userCuil,
              jobId: paycheck.jobId,
            },
            defaults: {
              ...paycheck,
            },
          });
        } catch (err) {
          resultado = `El recibo de sueldo de ${userCuil} para el trabajo ${jobName} de ${period} ya está creado`;
        }
        // paychecks.push(paycheck);
      });
      if (!resultado) {
        resultado = "Recibos de sueldo creados";
      }
      res.json(resultado);
    }
  }
);



router.get("/:cuil/:period",
async (req: Request, res: Response, next: NextFunction) => {
  const cuil =  req.params.cuil;
  const period = req.params.period;  //debe llegar asi "202205"
  let paychecks = await Paycheck.findAll({where:{ userCuil: cuil,period: period}})
  
  //return res.send(paychecks)

  var array =[
    {
        jobId: 1012,
        jobName: "profe",
        baseWage$: 50070,
        additionals$: 14881.98,
        seniority$: 0,
        overTimeAdditionals$: 0,
        absencesDeductions$: 0,
        underTimeDeductions$: 0,
        unionDeductions$: 1001.4,
        baseWageCode: 100,
        underTimeDeductionsCode: 3779,
        absencesDeductionsCode: 1226
    },
    {
        jobId: 1013,
        jobName: "profe inicial",
        baseWage$: 53574.899999999994,
        additionals$: 14881.98,
        seniority$: 0,
        overTimeAdditionals$: 0,
        absencesDeductions$: 0,
        underTimeDeductions$: 0,
        unionDeductions$: 1071.4979999999998,
        baseWageCode: 107,
        underTimeDeductionsCode: 3779,
        absencesDeductionsCode: 219
    },
    
  ]
  
  return res.send(array)

});

export default router;
