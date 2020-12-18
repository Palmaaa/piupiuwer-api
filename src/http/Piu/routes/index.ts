import Router from 'express';

import PiusController from '../controller/PiusController';
import PiusLikesController from '../controller/PiusLikesController';

import ensureAuthenticated from 'shared/middlewares/ensureAuthenticated';


const userRouter = Router();

const piusController = new PiusController();
const piusLikesController = new PiusLikesController();

userRouter.post('/', ensureAuthenticated, piusController.create);
userRouter.get('/', ensureAuthenticated, piusController.index);
userRouter.post('/like', ensureAuthenticated, piusLikesController.create);

export default userRouter;