import * as dotenv from 'dotenv';

dotenv.config();
export const NODE_ENV = process.env.NODE_ENV;
export const PORT = () => {
  if (NODE_ENV === 'test') {
    return 3000;
  } else {
    process.env, NODE_ENV || 5000;
  }
}
export const DB_URI = process.env.DB_URI;
