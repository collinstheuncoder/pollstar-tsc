import { Request, Response } from 'express';

import { UsersController } from '../controllers/index';

class UsersRoutes {
  public usersController: UsersController = new UsersController();
  
  public routes(app): void {
    // User list 
    app
      .route('/user')
	      .get(this.usersController.fetchAllUsers);

    // User by ID
    app
      .route('user/:userId')
        .put(this.usersController.fetchUserById)

    // Current user detail
    app
      .route('/me')
	      .get(this.usersController.fetchCurrentUser);
  }
}

export default UsersRoutes;
