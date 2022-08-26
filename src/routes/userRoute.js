import Router from 'koa-router'


const user = new Router();
//Uma rota de exemplo simples aqui.
//As rotas devem ficar em arquivos separados, /src/controllers/userController.js por exemplo
user.get('/users', async (ctx) => {
  ctx.status = 200;
  ctx.body = { total: 0, count: 0, rows: [] }
});

export default user;
