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
    console.log("DEU CERTO")
    console.log("DEU CERTO")
    console.log("DEU CERTO")
    console.log("DEU CERTO")
    console.log("DEU CERTO")
  } catch (err) {
    console.log(err)
    console.log(err)
    console.log(err)
    console.log(err)
    console.log(err)
    console.log(err)

  }


}
