import { Router } from 'express';

import userRouter from '../http/User/routes';
import piuRouter from '../http/Piu/routes';

const routes = Router();

routes.use('/', userRouter);
routes.use('/piu', piuRouter);

export default routes;