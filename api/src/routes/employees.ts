import { Response, Request, Router, NextFunction } from "express";
import { where } from "sequelize/types";
import { User } from "../models/User";
const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  console.log("hola soy employee");
  const employees = await User.findAll({
    where: {
      role: "empleado",
    },
  });
  res.status(200).send(employees);
});

export default router;
