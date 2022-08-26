import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../config/index.js';

export default async () => {

  try {
    await mongoose.connect(DB_URI)
    if (NODE_ENV === 'test') {
      mongoose.connection.db.dropDatabase(
        console.log("DATABASE DROPED!!!!")
      )
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

}
