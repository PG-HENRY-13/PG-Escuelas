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
    res.send(usersFilter);
  } else {
    console.log("2");
    const usersJob = await UsersJobs.findAll();
    res.send(usersJob);
  }
});
/*  const users = await User.findAll({
        where: {
    };
    where

    res.send(users);
  }
}); */

export default router;
