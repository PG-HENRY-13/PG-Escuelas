import { Response, Request, Router, NextFunction } from "express";
import {sendMail} from "../utils/mails"
const router = Router();

router.get("/mail", async (req: Request, res: Response, next: NextFunction) => {
    const {mail, type } = req.body;
    sendMail(mail, type)
  });

  export default router;