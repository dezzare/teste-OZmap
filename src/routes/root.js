import Router from 'koa-router';
import { PORT } from '../config/index.js';

const root = new Router();

//rota simples pra testar se o servidor está online
root.get('/', async (ctx) => {
  ctx.body = `Seu servidor esta rodando em http://localhost:${PORT}/`;
});

export default root;
