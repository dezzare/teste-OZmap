import User from '../models/User.js';

export const createUser = async (ctx) => {
  const { nome, email, idade } = ctx.request.body;

  try {
    await User.create({
      nome: nome,
      email: email,
      idade: idade,
    });
    ctx.status = 201;
  } catch (err) {
    console.log(err)
  }
}

export const getUser = async (ctx) => {
  try {
    const isUser = await User.findOne({ nome: ctx.params.nome })
    if (isUser == null) {
      ctx.status = 404;
      ctx.body = {
        message: 'User not found'
      };
    } else {
      ctx.status = 200;
      const user = {
        nome: isUser.nome,
        email: isUser.email,
        idade: isUser.idade
      }
      ctx.body = user;
    }
  } catch (err) {
    ctx.status = err.statusCode || err.status || 404;
    ctx.body = {
      message: err.message
    }
  }
}
