
import { Router } from "express";
import userRoutes from "./user";
import authentifyRoutes from "./authentify";
import employeesRoutes from "./employees";
import roleRoutes from './role';
const router = Router();

router.use("/user", userRoutes);

router.use("/authentify", authentifyRoutes);
router.use('/role', roleRoutes);
router.use("/employees", employeesRoutes);

export default router;
