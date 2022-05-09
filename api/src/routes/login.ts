import { Response, Request, Router, NextFunction } from "express";
import { json } from "stream/consumers";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import Joi from "joi";
import { genToken } from "../utils/authToken";
const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { cuil, password } = req.body;
  const schema = Joi.object({
    cuil: Joi.string().min(11).max(11),
    password: Joi.string().min(2).max(12),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  let user = await User.findByPk(cuil);
  if (!user) return res.status(400).send("Usuario incorrecto");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(400).send({msg:'Contraseña incorrecta'});

  const token = genToken(user);
  res.send(token);
});

export default router;