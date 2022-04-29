import { Response, Request, Router, NextFunction } from "express";
import { User } from "../models/User";
const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const { emailAddress, password } = req.body; //bring the email and password from the form
  const userAuth = await User.findOne({
    where: {
      emailAddress: emailAddress,
      password: password,
    },
  }); //gonna find just one where those two things are correct.
  if (!userAuth) {
    res.status(404).send("User not found");
  } //if there's no one with that email or name...
  if (userAuth) {
    res.send(202).send("Loged correctly");
  } // if there's one person with that...
});

export default router;
