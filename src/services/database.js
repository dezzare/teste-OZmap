import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../config/index.js';
import User from '../models/User.js'

export default async () => {

  try {
    if (NODE_ENV === 'test' || NODE_ENV === 'dev') {
      console.log(`NODE_ENV == ${NODE_ENV}`)
      await mongoose.connect('mongodb://admin:admin@mongo:27017/users')
      await User.deleteMany({}).then(function() {
        console.log("DADOS APAGADOS PARA TESTE!")
      })
    } else {
      console.log(`NODE_ENV == ${NODE_ENV}`)
      await mongoose.connect(DB_URI)
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

}
