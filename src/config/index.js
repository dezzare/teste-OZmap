import * as dotenv from 'dotenv';

dotenv.config();

export const PORT = () => {
  if (process.env.NODE_ENV === 'test') {
    return 5000;
  }
  process.env.PORT || 5000;
}
export const DB_URI = process.env.DB_URI;
