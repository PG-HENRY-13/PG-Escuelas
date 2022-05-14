import { Response, Request, Router, NextFunction } from "express";
import {sendMail} from "../utils/mails"
const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    const {mail, type, body} = req.body;
    return res.send(sendMail(mail, type, body));
  });

  export default router;