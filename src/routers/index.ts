import { Router } from 'express';

import homeRouter from './home';
import userRouter from './users';

const router: Router = Router();

router.use('/', homeRouter);
router.use('/users', userRouter);

export default router;
