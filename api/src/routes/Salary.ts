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
      cuil: 2043078093,
      name: "Santiago",
      lastName: "Montion",
      remunerative: 20456,
      NoRemunerative: 5464,
      assignments: 4000,
      deductions: 5433,
      totalSalary: 104665,
    };
  };

export default router;
