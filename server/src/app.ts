import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as cors from 'cors';

import { PollsRoutes, UsersRoutes } from './routes/index';
import { DB_NAME, DB_USER, DB_PWD } from './config/index';

class App {
  public app: express.Application;
  public pollsRoutes: PollsRoutes = new PollsRoutes();
  public usersRoutes: UsersRoutes = new UsersRoutes();
  public mongoUrl: string = `mongodb://${DB_USER}:${DB_PWD}@localhost:27017/${DB_NAME}`;

  constructor() {
    this.app = express();
    this.config();
    this.pollsRoutes.routes(this.app);
    this.usersRoutes.routes(this.app);
    this.mongoSetup();
  }

  private config(): void {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    // mongoose.Promise = global.Promise;
    mongoose 
    .connect(
      this.mongoUrl,
      {
        useNewUrlParser: true,
      }
    )
    .then(() => console.log('Successful DB connection'))
    .catch(error => console.log(`Connection error: ${error}`));   
  }
}

export default new App().app;
