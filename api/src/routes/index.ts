import { Router } from "express";
import userRoutes from "./user";
import jobRoutes from "./job";
import authentifyRoutes from "./authentify";
import employeesRoutes from "./employees";
import roleRoutes from "./role";
<<<<<<< HEAD
import jobRoutes from "./job";

=======
>>>>>>> 6df985113509dd7c036d011c7a890e4b4449d345
const router = Router();

router.use("/user", userRoutes);
router.use("/job", jobRoutes);

router.use("/authentify", authentifyRoutes);
router.use("/role", roleRoutes);
router.use("/employees", employeesRoutes);
router.use("/job", jobRoutes);

export default router;
