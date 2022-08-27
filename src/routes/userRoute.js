import Router from 'koa-router'
// import bodyParser from 'koa-bodyparser'
import { createUser, deleteUser, getAllUsers, getUser } from '../controllers/userController.js';



const user = new Router();
// const parser = new bodyParser();

// user.use(bodyParser);

// user.get('/users', async (ctx) => {
//   ctx.status = 200;
//   ctx.body = { total: 0, count: 0, rows: [] }
// });

user.get('/users', getAllUsers);
user.get('/user/:nome', getUser);
user.post('/user', createUser);
user.delete('/user/:nome', deleteUser);



export default user;
