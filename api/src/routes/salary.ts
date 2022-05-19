import { Response, Request, Router, NextFunction } from "express";

import { User } from "../models/User";
import { Job } from "../models/Job";
import { userInfo } from "os";
import { Paycheck } from "../models/Paycheck";

const router = Router();



router.get("/:cuil/:period", async (req: Request, res: Response, next: NextFunction) => {
  const cuil = req.params.cuil;
  const period = req.params.period;

  return res.send({ jobName: "Profe de ingles" });
  }
);

router.get(
  "/:period",
  async (req: Request, res: Response, next: NextFunction) => {
    const period = req.params.period; //debe llegar asi "202205"
    let paychecks = await Paycheck.findAll({
      where: { period: period },
    });


//RUTA PARA DEVOLVER LOS USUARIOS Y LAS SUMAS TOTALES (PRIMERA MUESTRA, ANTES DE TOCAR VER MAS +)
router.get("/:month"),
  async (req: Request, res: Response, next: NextFunction) => {
    const month = req.params.month;

    // let users = await User.findAll({
    //   include: {
    //     model: Job,
    //     attributes: ["name", "id"],
    //     through: {
    //       attributes: [],
    //     },
    //   },
    // });

    // users?.map(u=>{
    //   let paychecks = Paycheck.findAll({where:{period: month,userCuil:u.cuil}})
    // })

    return {
      cuil: 20430780930,
      name: "Santiago",
      lastName: "Montion",
      remunerative: 20456,
      NoRemunerative: 5464,
      assignments: 4000,
      deductions: 5433,
      totalSalary: 104665,
    };
  };

const groupBy = (array: any[], key: string) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
};

const arrayfy = (objectByKey: any) => {
  var array = [];
  for (const key in objectByKey) {
    array.push(objectByKey[key]);
  }
  return array;
};

router.get(
  "/paychecksByCuil",
  async (req: Request, res: Response, next: NextFunction) => {
    let paychecks = await Paycheck.findAll();
    const byUserCuil: any[] = groupBy(paychecks, "userCuil");
    const arrayByUserCuil = arrayfy(byUserCuil);

    return res.json(arrayByUserCuil);
  }
);

export default router;
