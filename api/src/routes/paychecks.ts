import { Response, Request, Router, NextFunction } from "express";
import { User } from "../models/User";
import { Paycheck } from "../models/Paycheck";
const router = Router();

router.get("/paycheck", (req: Request, res: Response, next: NextFunction) => {
    User.findAll( {
      include: {
        model: Paycheck,
        attributes: ["hasSigned", "id"],
        through: {
          attributes: [],
        },
      },
    })
      .then((users) => {
        console.log(users)
        return res.send(users);
      })
      .catch((error) => {
        return res.status(404).send(error);
      });
  });
