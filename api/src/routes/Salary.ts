import { Response, Request, Router, NextFunction } from "express";


import { User } from "../models/User";
import { Job } from "../models/Job";
import { userInfo } from "os";
import { Paycheck } from "../models/Paycheck";

const router = Router();

router.get("/:cuil/:month"),
  async (req: Request, res: Response, next: NextFunction) => {
    const month = req.params.month;
    const cuil = req.params.cuil;

    let selected_user = await User.findByPk(cuil);

    if (selected_user) {
      //Una vez encontrado el usuario, analizamos su cargo
      // selected_user.jobs?.map((job) => {
      //   let charge_db = Paycheck.findByPk(job.id);
      // //esto
      //   const year = selected_user.seniorityDate.getFullYear();
      //   var final_year = actualYear - year;
      //   if (!final_year) {
      //     final_year = 1;
      //   }
      // });
      // res.json(paycheck);
    }
  };



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

    
    return{cuil: 2043078093,name: "Santiago", lastName: "Montion" , remunerative: 20456, NoRemunerative: 5464,assignments:4000,deductions: 5433, totalSalary: 104665}

  };

export default router;
