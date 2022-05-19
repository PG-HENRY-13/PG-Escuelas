import { Router } from "express";
import userRoutes from "./user";
import jobRoutes from "./job";
import authentifyRoutes from "./authentify";
import employeesRoutes from "./employees";
import roleRoutes from "./role";
import filterJobsRoutes from "./filterjobs";
import excelRoutes from "./excel";
import testRoutes from "./test";
import mail from "./mail";
import paychecksRoute from "./paycheck";
import newsRoutes from "./news";

import contingenciesRoutes from "./contingencies";
import salary from "./salary";

import salaryRoute from "./salary";
import loginRoute from "./login";
const router = Router();

router.use("/user", userRoutes);
router.use("/job", jobRoutes);
router.use("/login", loginRoute);
router.use("/authentify", authentifyRoutes);
router.use("/role", roleRoutes);
router.use("/employees", employeesRoutes);
router.use("/excel", excelRoutes);
router.use("/filterjobs", filterJobsRoutes);
router.use("/test", testRoutes);
router.use("/mail", mail);

router.use("/contingencies", contingenciesRoutes);
router.use("/salary", salaryRoute);
router.use("/paychecks", paychecksRoute);

router.use('/news', newsRoutes);
export default router;
