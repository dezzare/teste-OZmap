//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev
import dbConnection from './services/database.js'
import Koa from 'koa';
import root from './routes/root.js';
import user from './routes/userRoute.js';
import { PORT } from './config/index.js'
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';


//mais infos
//https://github.com/ZijianHe/koa-router

// todas as configuraçoes devem ser passadas via environment variables

const koa = new Koa();
await dbConnection();


koa
  .use(cors())
  .use(bodyParser())
  .use(root.routes())
  .use(root.allowedMethods())
  .use(user.routes())
  .use(user.allowedMethods());



const server = koa.listen(PORT);


export default server;
