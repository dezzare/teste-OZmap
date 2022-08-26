import Router from 'koa-router'


const root = new Router();

//rota simples pra testar se o servidor está online
root.get('/', async (ctx) => {
  ctx.body = `Seu servidor esta rodando em http://localhost:3000/`;
});

export default root;
