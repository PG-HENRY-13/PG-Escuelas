import { Response, Request, Router, NextFunction } from "express";
import { json } from "stream/consumers";
import { WageConcept } from "../models/WageConcept";
import { User } from "../models/User";
import { userInfo } from "os";
import { Paycheck } from "../models/Paycheck";
import { wagingJson } from "./excel";
const router = Router();

router.get(
  "/:cuil",
  async (req: Request, res: Response, next: NextFunction) => {
    const cuil = req.params.cuil;
    const actualYear = new Date().getFullYear();

    let selected_user = await User.findByPk(cuil);
    //   CGO: "000000", // Cargo
    //   DENOMINACION: "CARGO INEXISTENTE", //nombre del cargo
    //   P001: 0, // codigo del basico
    //   C100003: 0, // MONTO DEL BASICO -> baseWage
    //   P1723: 0, // codigo del Ded. Funcional
    //   C117230: 0, // MONTO DEL Ded. Funcional -> generalDeductions
    //   P1763: 0, // codigo del Ded. Excl (dias no laborados)
    //   C117630: 0, // MONTO DEL Ded. Excl (dias no laborados) -> absencesDeductions
    //   P1821: 0, // codigo del Compl. Esp.
    //   C118210: 0, // MONTO del Compl. Esp.
    //   C118360: 0, // MONTO Antigüedad (por cada año) -> seniority
    //   C110230: 0, // MONTO Ad. Rem -> additionals
    //   C117730: 0, // MONTO Est. Doc (ni idea)
    //   C117430: 0, // MONTO Supl. Cap (ni idea)
    //   C112620: 0, // MONTO Gtos. Inh. Lab. Doc. (ni idea)
    //   C118420: 0, // MONTO P. Cal Ed
    //   C117930: 0, // MONTO Func. Jer
    //   G112335: 0, // MONTO Gremio (%)

    var baseWage;
    var generalDeductions;
    var absencesDeductions;
    var generalDeductions;
    var seniority;
    var additionals;
    var unionDeductions;

    let charge_db = {
      id: 1, //este id deberia ser igual a job.id
      concepts: [
        {
          basic_salary: 1785.83,
          remunerative: 208264.01,
          no_remunerative: 4430.37,
          deductions: 63071.51,
          antiquity: 10901.42,
        },
      ],
    };

    if (selected_user) {
      //Una vez encontrado el usuario, analizamos su cargo

      selected_user.jobs?.map((job) => {
        let charge_db = WageConcept.findByPk(job.id);

        wagingJson.map((position) => {
          // recorre todos los objetos del array buscando...
          if (job.id == position.CGO) {
            // compara si el cuil es el del objeto y usa los valores.
            baseWage = position.C100003; // SALARIO BASICO (remunerativo)
            generalDeductions = position.C117230; // DEDUCCIONES GENERALES
            absencesDeductions = position.C117630; // DEDUCCION POR AUSENCIAS
            seniority = position.C118360; // ANTIGUEDAD (remunerativo)
            additionals = position.C110230; // ADICIONALES (NO REMUNERATIVOS)
            unionDeductions = position.G112335; // GREMIO (porcentaje de remunerativos)
          } // ESTOS SON LOS VALORES A USAR EN LOS CALCULOS
        });
      });

      //esto
      const year = selected_user.seniorityDate.getFullYear();
      var final_year = actualYear - year;
      if (!final_year) {
        final_year = 1;
      }

      let paycheck;
      charge_db.concepts?.map((c) => {
        paycheck = {
          basic_salary: Math.round(c.basic_salary * 30), //Aca va el calculo , sabiendo los dias de trabajo
          remunerative: 208264.01,
          no_remunerative: 4430.37,
          deductions: 63071.51,
          antiquity: c.antiquity * final_year,
          totalSalary:
            c.basic_salary +
            c.remunerative -
            c.no_remunerative -
            c.deductions +
            c.antiquity * (actualYear - year),
        };
      });

      res.json(paycheck);
    }
  }
);

export default router;
