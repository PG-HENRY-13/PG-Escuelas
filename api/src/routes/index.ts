import { Router } from "express";
import userRoutes from "./user";
import jobRoutes from "./job";
import authentifyRoutes from "./authentify";
import employeesRoutes from "./employees";
import roleRoutes from "./role";
import filterJobsRoutes from "./filterjobs";
import WageConcepts from "./WageConcepts";
const router = Router();

router.use("/user", userRoutes);
router.use("/job", jobRoutes);

router.use("/authentify", authentifyRoutes);
router.use("/role", roleRoutes);
router.use("/employees", employeesRoutes);
router.use("/job", jobRoutes);
router.use("/filterjobs", filterJobsRoutes);
router.use("/salary", WageConcepts);
export default router;
