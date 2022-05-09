import { Response, Request, Router, NextFunction } from "express";
import { where } from "sequelize/types";
import { User } from "../models/User";
import { Contingencies } from "../models/Contingencies";
import { send } from "process";
const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contingencies = await Contingencies.findAll();
    console.log(contingencies);
    return res.status(200).send(contingencies);
  } catch (err) {
    console.log(err);
    return res.status(404).send("Error :" + err);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  Contingencies.create(req.body)
    .then(() => {
      console.log("Exito");
      return res.send("Llego todo");
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).send("Error: " + err);
    });
});

router.delete("/", async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body;
  const removedContingency = await Contingencies.findByPk(id);
  if (!removedContingency) {
    res.status(404).send("Not found");
  }
  if (removedContingency) {
    removedContingency
      .destroy()
      .then(() => {
        return res.status(202).send("Removed correctly");
      })
      .catch((error: any) => {
        return res.status(404).send(error);
      });
  }
});

export default router;
