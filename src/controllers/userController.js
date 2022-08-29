import User from '../models/User.js';

export const createUser = async (ctx) => {
  const { nome, email, idade } = ctx.request.body;

  if (idade < 18) {
    ctx.body = { message: 'Usuário precisa ter no mínimo 18 anos' };
    ctx.status = 400;
  } else {
    try {
      await User.create({
        nome: nome,
        email: email,
        idade: idade,
      });
      ctx.status = 201;
    } catch (err) {
      ctx.status = err.statusCode || err.status || 404;
      ctx.body = { message: err.message };
    }
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
    ctx.body = { message: err.message };

  }
}

export const getAllUsers = async (ctx) => {
  try {
    const isUsers = await User.find({});
    ctx.status = 200;
    ctx.body = { isUsers, total: isUsers.length, rows: [] };
  } catch (err) {
    ctx.status = err.statusCode || err.status || 404;
    ctx.body = { message: err.message };
  }
}

export const deleteUser = async (ctx) => {
  try {
    const user = await User.findOne({ nome: ctx.params.nome });

    User.remove({ nome: ctx.params.nome })
    ctx.status = 200;
    ctx.body = {
      nome: user.nome,
      email: user.email,
      idade: user.idade
    }
  } catch (err) {
    console.lor(err);
  }
}

export const updateUser = async (ctx) => {

  const user = await User.findOne({ nome: ctx.params.nome })
  if (!user) {
    ctx.status = 404;
    ctx.body = { message: 'User not found' };
  }

  const { nome, email, idade } = ctx.request.body;
  if (idade < 18) {
    ctx.body = { message: 'Usuário precisa ter no mínimo 18 anos' };
    ctx.status = 400;
  } else {

    if (nome != null) user.nome = nome;
    if (email != null) user.email = email;
    if (idade != null) user.idade = idade;

    await user.save();
    ctx.status = 200;
    ctx.body = user;
  }
}


