import mongoose from 'mongoose';
import { DB_URI } from '../config/index.js';

export default async () => {

  try {
    await mongoose.connect(DB_URI)
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

}
