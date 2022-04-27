import {Router} from 'express';
import userRoutes from './user';
import authentifyRoutes from './authentify';
const router = Router();

router.use('/user', userRoutes);

router.use('/authentify', authentifyRoutes)

export default router;