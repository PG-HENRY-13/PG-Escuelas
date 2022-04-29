import {Router} from 'express';
import userRoutes from './user';
import authentifyRoutes from './authentify';
import roleRoutes from './role';
const router = Router();

router.use('/user', userRoutes);
router.use('/role', roleRoutes);
router.use('/authentify', authentifyRoutes)

export default router;
