import { Response, Request, Router, NextFunction } from "express";
import { json } from "stream/consumers";
import { Job } from "../models/Job";
const router = Router();

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  console.log("body", req.body);
  const job = req.body;
  Job.create(job)
    .then((createdJob) => {
      return res.send(createdJob);
    })
    .catch((error) => {
      return res.status(424).send(error);
    });
});

export default router;
