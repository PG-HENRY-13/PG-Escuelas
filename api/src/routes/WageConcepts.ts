import { Response, Request, Router, NextFunction } from "express";
import { json } from "stream/consumers";
import { WageConcept } from "../models/WageConcept";
import { User } from "../models/User";
import { userInfo } from "os";
import { Paycheck } from "../models/Paycheck";
const router = Router();

router.get(
  "/:cuil",
  async (req: Request, res: Response, next: NextFunction) => {
    const cuil = req.params.cuil;
    const actualYear = new Date().getFullYear();

    let selected_user = await User.findByPk(cuil);

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

        //aca deberia seguir el resto
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
