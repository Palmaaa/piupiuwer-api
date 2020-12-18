import Router from 'express';

import UsersController from '../controller/UsersController';
import SessionsController from '../controller/SessionsController';
import ensureAuthenticated from 'shared/middlewares/ensureAuthenticated';

const userRouter = Router();

const usersController = new UsersController();
const sessionsController = new SessionsController();

userRouter.post('/register', usersController.create);
userRouter.post('/login', sessionsController.create);
userRouter.get('/users', ensureAuthenticated, usersController.show);
userRouter.get('/verification/:token', sessionsController.update);

export default userRouter;