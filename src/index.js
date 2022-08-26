import Koa from 'koa';
import root from './routes/root.js';
import user from './routes/userRoute.js';
//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router

// todas as configuraçoes devem ser passadas via environment variables
const PORT = process.env.PORT || 3000;

const koa = new Koa();

koa
  .use(root.routes())
  .use(root.allowedMethods())
  .use(user.routes())
  .use(user.allowedMethods());



const server = koa.listen(PORT);


export default server;
