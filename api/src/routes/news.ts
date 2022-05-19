import { Response, Request, Router, NextFunction } from "express";
import { json } from "stream/consumers";
import { News } from "../models/News";
import { User } from "../models/User";
import { NewsI } from "../models/News";
const router = Router();

router.post("/", (req, res) => {
  const { cuil, title, text } = req.body;

  if (cuil && title && text) {
    News.create({
      userCuil: cuil,
      title: title,
      text: text,
    } as NewsI)
      .then((resu) => {
        console.log(res);
        return res.status(200).send(resu);
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).send(err);
      });
  }
});

router.get("/", (req, res) => {
  News.findAll({
    where: {},
    order: [["createdAt", "DESC"]],
  })
    .then((resu) => {
      return res.status(200).send(resu);
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});

export default router;
