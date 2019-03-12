import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { User } from '../models/index';

import { JWT_ENCRYPTION, JWT_EXPIRATION } from '../config/index';

class UsersController {
	public async fetchAllUsers(req: Request, res: Response) {
    try {
      const users = await User.find();

      return res.status(200).json({ users });
    } catch (error) {
      res.status(404).json({ error });
    }
  }

  public async fetchUserById(req: Request, res: Response) {
    try {
      const user = await User.findById(req.params.userId);

      return res.status(200).json({ user });
    } catch (error) {
      res.status(404).json({ error });
    }
  }

  public async fetchCurrentUser(req: Request, res: Response) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token)
      return res
        .status(401)
        .json({ auth: false, message: 'Please make sure you\'re logged in' });

    try {
    	// Check for auth scheme and slice it from string
      if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
      }

      const { sub } = jwt.decode(token, JWT_ENCRYPTION);

      const currentUser = await User.findById(sub, { password: 0 });

      return res.status(200).json({ currentUser });
    } catch (error) {
      return res.status(404).json({ error });
    }
  }
}

export default UsersController;
