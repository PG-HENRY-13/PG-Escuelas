import { Response, Request, Router, NextFunction } from "express";
import { json } from "stream/consumers";
import { Job } from "../models/Job";
import { User } from "../models/User";

const router = Router();

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  const job = req.body;
  Job.create(job)
    .then((createdJob) => {
      return res.send(createdJob);
    })
    .catch((error) => {
      return res.status(424).send(error);
    });
});

router.put("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { userCuil, jobID } = req.body;
    let userToAdd = await User.findByPk(userCuil);
    let jobToAdd = await Job.findByPk(jobID);
    await userToAdd?.$add("jobs", jobID);
    await jobToAdd?.$add("users", userCuil);
    let returnedUser = await User.findByPk(userCuil, {
      include: [Job],
    });
    return res.status(200).send(returnedUser); //Devuelve el usuario junto con el trabajo agregado
  } catch (err) {
    return res.status(404).send(err);
  }
});

export default router;
