import { Response, Request, Router, NextFunction } from "express";
import { json } from "stream/consumers";
import { User } from "../models/User";
import { Job } from "../models/Job";
const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  User.findAll()
    .then((users) => {
      return res.send(users);
    })
    .catch((error) => {
      return res.status(404).send(error);
    });
});

router.get("/:userID", (req: Request, res: Response, next: NextFunction) => {
  const userID = req.params.userID;
  User.findByPk(userID, {
    include: {
      model: Job,
      attributes: ["name", "id"],
      through: {
        attributes: [],
      },
    },
  })
    .then((user) => {
      if (user) return res.status(202).send(user);
      else res.status(404).send("The user does not exist");
    })
    .catch((err) => {
      return res.status(err.code).send(err.message);
    });
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jobs } = req.body;
    const user = req.body;
    console.log("llegue al user");
    const [newUser, created] = await User.findOrCreate({
      where: {
        name: req.body.name,
      },
      defaults: {
        ...user,
      },
    });
    if (jobs.length && created) {
      await Promise.all(
        jobs.map(async (job: any) => {
          let jobToAdd = await Job.findByPk(job.id);
          await newUser?.$add("jobs", job.id);
          await jobToAdd?.$add("users", user.cuil);
        })
      );
    }
    if (!created) return res.status(404).send("El usuario ya existe en la db");
    return res.status(200).send("Usuario añadido a la db");
  } catch (err) {
    res.status(404).send("error: " + err);
  }
});

router.delete("/", async (req: Request, res: Response, next: NextFunction) => {
  const { userID } = req.body;
  const removedUser = await User.findByPk(userID);
  if (!removedUser) {
    res.status(404).send("User not found");
  }
  if (removedUser) {
    removedUser
      .destroy()
      .then(() => {
        return res.status(202).send("Removed correctly");
      })
      .catch((error: any) => {
        return res.status(404).send(error);
      });
  }
});

router.put("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userUpdate = req.body;
    const { jobs } = req.body;
    //ES NECESARIO RECIBIR LOS DATOS DESDE EL BODY

    const existingUser = await User.findByPk(userUpdate.cuil);

    if (existingUser) {
      await User.update(
        {
          name: userUpdate.name,
          lastName: userUpdate.lastName,
          phoneNumber: userUpdate.phoneNumber,
          emailAddress: userUpdate.emailAddress,
          address: userUpdate.address,
          seniorityDate: userUpdate.seniorityDate,
          gender: userUpdate.gender,
          role: userUpdate.role,
          //AQUI AGREGAR LOS CAMPOS QUE SE QUIERAN MODIFICAR
        },
        {
          where: {
            cuil: userUpdate.cuil,
          },
        }
      );
      if (jobs.length) {
        await Promise.all(
          jobs.map(async (job: any) => {
            let jobToAdd = await Job.findByPk(job.id);
            await existingUser?.$add("jobs", job.id);
            await jobToAdd?.$add("users", userUpdate.cuil);
          })
        );
      }

      return res.status(200).json(userUpdate);
    } else {
      res.status(400).send("User not found");
    }
  } catch (e) {
    res.status(400).send("ERROR" + e);
  }
});

export default router;
