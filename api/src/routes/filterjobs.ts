import { Response, Request, Router, NextFunction } from "express";
import { UsersJobs } from "../models/UsersJobs";
import { User } from "../models/User";
const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const JobId: any = req.query.JobId;
  console.log("1");
  if (JobId) {
    const usersFilter = await UsersJobs.findAll({
      where: {
        JobId,
      },
    });
    const cuils = usersFilter.map((e) => e.UserCuil);
    const users = await User.findAll({
      where: { cuil: cuils } as any,
    });
    res.json(users);
  } else {
    console.log("2");
    const users = await User.findAll();
    res.send(users);
  }
});

export default router;
