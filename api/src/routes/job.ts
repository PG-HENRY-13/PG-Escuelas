import { Response, Request, Router, NextFunction, raw } from "express";
import { Job } from "../models/Job";
import { User } from "../models/User";
import { UsersJobs } from "../models/UsersJobs";

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
    let { userCuil, jobID, funcJer, basico, antig, zona, addRem, dedExcl } =
      req.body;
    let userToAdd = await User.findByPk(userCuil);
    let jobToAdd = await Job.findByPk(jobID);
    await userToAdd?.$add("jobs", jobID);
    await jobToAdd?.$add("users", userCuil);
    let middle = await UsersJobs.findOne({
      where: {
        UserCuil: userCuil,
        JobId: jobID,
      },
    });
    await middle?.update({
      funcJer,
      basico,
      antig,
      zona,
      addRem,
      dedExcl,
    });
    let returnedUser = await User.findByPk(userCuil, {
      include: {
        model: Job,
        attributes: ["name", "id"],
        through: {
          attributes: [],
        },
      },
    });
    return res.status(200).send(returnedUser); //Devuelve el usuario junto con el trabajo agregado
  } catch (err) {
    return res.status(404).send(err);
  }
});

router.get(
  "/:userCuil",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCuil = req.params.userCuil;
      let returnedUser = await User.findByPk(userCuil, {
        include: {
          model: Job,
          attributes: ["name", "id"],
          through: {
            attributes: [],
          },
        },
      });
      return res.status(200).send(returnedUser?.jobs);
    } catch (err) {
      res.status(404).send("Error: " + err);
    }
  }
);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const returnedJobs = await Job.findAll();
  return res.status(200).send(returnedJobs);
});

export default router;
