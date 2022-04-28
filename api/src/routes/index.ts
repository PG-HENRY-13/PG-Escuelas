import { Router } from "express";
import userRoutes from "./user";
import authentifyRoutes from "./authentify";
import employeesRoutes from "./employees";
const router = Router();

router.use("/user", userRoutes);

router.use("/authentify", authentifyRoutes);

router.use("/employees", employeesRoutes);
export default router;
