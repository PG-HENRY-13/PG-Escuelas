import { Router } from "express";
import userRoutes from "./user";
import jobRoutes from "./job";
import authentifyRoutes from "./authentify";
import employeesRoutes from "./employees";
import roleRoutes from "./role";
import filterJobsRoutes from "./filterjobs";
import contingenciesRoutes from "./contingencies";

const router = Router();

router.use("/user", userRoutes);
router.use("/job", jobRoutes);

router.use("/authentify", authentifyRoutes);
router.use("/role", roleRoutes);
router.use("/employees", employeesRoutes);
router.use("/job", jobRoutes);
router.use("/filterjobs", filterJobsRoutes);
router.use("/contingencies", contingenciesRoutes);
export default router;
