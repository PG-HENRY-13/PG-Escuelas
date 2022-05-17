import { Response, Request, Router, NextFunction } from "express";
import { User } from "../models/User";
import { Paycheck } from "../models/Paycheck";
const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  const { cuil, period } = req.query;

  if (cuil && period) {
    Paycheck.findAll({
      where: {
        userCuil: cuil.toString(),
        period: period.toString(),
      },
    })
      .then((payc) => {
        return res.send(payc);
      })
      .catch((error) => {
        return res.status(404).send(error);
      });
  }
});

export default router;
