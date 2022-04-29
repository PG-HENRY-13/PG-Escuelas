import { Response, Request, Router, NextFunction } from "express";
import { User } from "../models/User";
const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const role: any = req.body.role;
  if (role) {
    const usersFilter = await User.findAll({
      where: {
        role,
      },
    });
    res.send(usersFilter);
  } else {
    const users = await User.findAll();
    res.send(users);
  }
});

export default router;
