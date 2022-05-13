import { Response, Request, Router, NextFunction } from "express";
import { json } from "stream/consumers";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import Joi from "joi";
import { genToken } from "../utils/authToken";
import jwt from "jsonwebtoken";
import config from "../lib/config";

const url = config.http + config.host + (config.frontPort?":"+config.frontPort:'');

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
  if (!isValid) return res.status(400).send({ msg: "Contraseña incorrecta" });

  const token = genToken(user);
  res.send(token);
});

router.post("/forgotpwd", async (req, res) => {
  if (req.body.cuil !== undefined) {
    const cuil = req.body.cuil;

    const user = await User.findByPk(cuil);

    if (user) {
      var payload = {
        id: user.cuil,
        email: user.emailAddress,
      };
      // se crea un one time token con el pwd hasheado + la fecha creado
      var secret = user?.password + "-" + user.createdAt.getTime;

      var token = jwt.sign(payload, secret);

      // TODO: Send email containing link to reset password.
      // In our case, will just return a link to click.
      res.send(
        `<a href="${url}/resetpassword/${payload.id}/${token}">Reset password</a>`
      );
    } else {
      res.status(404).send("El cuil no existe");
    }
  } else {
    res.send("Se ha perdido el cuil");
  }
});




export default router;

