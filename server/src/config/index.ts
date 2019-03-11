import * as dotenv from 'dotenv';

dotenv.config();

let path;

switch (process.env.NODE_ENV) {
  case 'test':
    path = `${__dirname}/../../.env.test`;
    break;
  case 'production':
    path = `${__dirname}/../../.env.production`;
    break;
  default:
    path = `${__dirname}/../../.env.development`;
}

dotenv.config({ path });

export const DB_NAME = process.env.DB_NAME;
export const DB_USER = process.env.DB_USER;
export const DB_PWD = process.env.DB_PWD;

export const PORT = process.env.PORT;

export const JWT_ENCRYPTION = process.env.JWT_ENCRYPTION
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION
