import { Response, Request, Router, NextFunction } from "express";
import { User } from "../models/User";
const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  console.log(req);
  console.log(req.query.role);
  const role: any = req.query.role;
  if (role) {
    const usersFilter = await User.findAll({
      where: {
        role,
      },
    });
    res.send(usersFilter);
    console.log(usersFilter);
  } else {
    const users = await User.findAll();
    res.send(users);
  }
});

export default router;
