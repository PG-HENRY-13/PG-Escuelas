import { Response, Request, Router, NextFunction, raw } from "express";
import { where } from "sequelize/types";
import { User } from "../models/User";
import { Contingencies } from "../models/Contingencies";
import { UsersJobs } from "../models/UsersJobs";
import { Job } from "../models/Job";
import { sequelize } from "../db";
import {
  getExtraHours,
  getMissedHours,
  getAbsences,
} from "../utils/searchFunctions";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contingencies = await Contingencies.findAll({
      include: [
        {
          model: UsersJobs,
          attributes: ["UserCuil", "JobId"],
          include: [
            {
              model: User,
              attributes: ["name", "lastName"],
            },
            {
              model: Job,
              attributes: ["name"],
            },
          ],
        },
      ],
    });
    console.log(contingencies);
    return res.status(200).send(contingencies);
  } catch (err) {
    console.log(err);
    return res.status(404).send("Error :" + err);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  const { cuil, jobId } = req.body;
  try {
    const newCont = await Contingencies.create(req.body);
    console.log("---Nueva cont creada!!!!!!!---");
    const UserJob = await UsersJobs.findOne({
      where: {
        UserCuil: cuil,
        JobId: jobId,
      },
    });
    await UserJob?.$add("contingencies", newCont);
    // await newCont?.$set("userJob", UserJob);

    const toSend = await Contingencies.findAll({
      include: [
        {
          model: UsersJobs,
          as: "userJob",
          attributes: ["UserCuil", "JobId"],
          include: [
            {
              model: User,
              attributes: ["name", "lastName"],
            },
            {
              model: Job,
              attributes: ["name"],
            },
          ],
        },
        // {
        //   model: UsersJobs,
        //   as: "userjobs2",
        //   attributes: ["UserCuil", "JobId"],
        //   include: [
        //     {
        //       model: User,
        //       attributes: ["name", "lastName"],
        //     },
        //     {
        //       model: Job,
        //       attributes: ["name"],
        //     },
        //   ],
        // },
      ],
    });
    console.log("Exito");

    return res.send(toSend);
  } catch (err) {
    console.log(err);
    return res.status(404).send("Error: " + err);
  }
});

// router.delete("/", async (req: Request, res: Response, next: NextFunction) => {
//   const { id } = req.body;
//   const removedContingency = await Contingencies.findByPk(id);
//   if (!removedContingency) {
//     res.status(404).send("Not found");
//   }
//   if (removedContingency) {
//     removedContingency
//       .destroy()
//       .then(() => {
//         return res.status(202).send("Removed correctly");
//       })
//       .catch((error: any) => {
//         return res.status(404).send(error);
//       });
//   }
// });

router.put("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, resolve } = req.body;
    console.log(id, resolve);
    const toModify = await Contingencies.findByPk(id);
    if (!toModify) {
      res.status(404).send("Not found");
      2;
    }
    await toModify?.update({
      state: resolve,
    });
    res.status(200).send("Contingencia Modificada");
  } catch (err) {
    res.status(404).send("Error: " + err);
  }
});

router.post(
  "/values",
  async (req: Request, res: Response, next: NextFunction) => {
    const { cuil, jobId, date } = req.body;
    try {
      const extraHours = await getExtraHours(cuil, jobId, date);
      console.log("Horas extra:" + extraHours);
      const missedHours = await getMissedHours(cuil, jobId, date);
      console.log("Horas de menos:" + missedHours);
      const absences = await getAbsences(cuil, jobId, date);
      console.log("Ausencias:" + absences);
      res.status(200).send({ ...absences, extraHours, missedHours });
    } catch (err) {
      console.log(err);
      res.status(404).send("Error: " + err);
    }
  }
);

export default router;
