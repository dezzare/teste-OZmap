//sample test
//Para rodar os testes, use: npm test
//PS: Os testes não estão completos e alguns podem comnter erros.

// veja mais infos em:
//https://mochajs.org/
//https://www.chaijs.com/
//https://www.chaijs.com/plugins/chai-json-schema/
//https://developer.mozilla.org/pt-PT/docs/Web/HTTP/Status (http codes)

// const app =  require('../src/index.js');

// const assert = require('assert');
// const chai = require('chai')
// const chaiHttp = require('chai-http');
// const chaiJson = require('chai-json-schema');

import server from '../src/index.js';
import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiJson from 'chai-json-schema';

process.env.NODE_ENV = 'test';

const app = server;

chai.use(chaiHttp);
chai.use(chaiJson);

const expect = chai.expect;

//Define o minimo de campos que o usuário deve ter. Geralmente deve ser colocado em um arquivo separado
const userSchema = {
  title: "Schema do Usuario, define como é o usuario, linha 24 do teste",
  type: "object",
  required: ['nome', 'email', 'idade'],
  properties: {
    nome: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    idade: {
      type: 'number',
      minimum: 18
    }
  }
}

//Inicio dos testes

//este teste é simplesmente pra enteder a usar o mocha/chai
describe('Um simples conjunto de testes', function() {
  it('deveria retornar -1 quando o valor não esta presente', function() {
    assert.equal([1, 2, 3].indexOf(4), -1);
  });
});

//testes da aplicação
describe('Testes da aplicaçao', () => {
  it('o servidor esta online', function(done) {
    chai.request(app)
      .get('/')
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('deveria ser uma lista vazia de usuarios', function(done) {
    chai.request(app)
      .get('/users')
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.rows).to.eql([]);
        done();
      });
  });

  it('deveria criar o usuario raupp', function(done) {
    chai.request(app)
      .post('/user')
      .send({ nome: "raupp", email: "jose.raupp@devoz.com.br", idade: 35 })
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        done();
      });
  });
  //...adicionar pelo menos mais 5 usuarios. se adicionar usuario menor de idade, deve dar erro. Ps: não criar o usuario naoExiste

  it('o usuario naoExiste não existe no sistema', function(done) {
    chai.request(app)
      .get('/user/naoExiste')
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res.body.message).to.be.equal('User not found');
        expect(res).to.have.status(404);
        expect(res.body).to.be.jsonSchema({});
        done();
      });
  });

  it('o usuario raupp existe e é valido', function(done) {
    chai.request(app)
      .get('/user/raupp')
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(userSchema);
        done();
      });
  });

  it('deveria excluir o usuario raupp', function(done) {
    chai.request(app)
      .delete('/user/raupp')
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(userSchema);
        done();
      });
  });

  it('o usuario raupp não deve existir mais no sistema', function(done) {
    chai.request(app)
      .get('/user/raupp')
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(userSchema);
        done();
      });
  });


  {
    const createUsers = async (i) => {
      await chai
        .request(app)
        .post('/user')
        .send({ nome: `User${i}`, email: `user${i}@email.com`, idade: 20 + i })
    }
    for (let i = 0; i < 5; i++) {
      createUsers(i);
    }
  }


  it('deveria ser uma lista com pelomenos 5 usuarios', function(done) {
    chai.request(app)
      .get('/users')
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.total).to.be.at.least(5);
        done();
      });
  });

  it('deveria atualizar o User1', function(done) {
    chai.request(app)
      .put('/user/User1')
      .send({ nome: `Teste1`, email: `teste1@email.com`, idade: 40 })
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(userSchema);
        done();
      });
  });

  it("deveria negar o registro do usuario menor de 18", function(done) {
    chai
      .request(app)
      .post("/user")
      .send({ nome: "Menor", email: "menor@email.com", idade: 15 })
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res.body.message).to.be.equal('Usuário precisa ter no mínimo 18 anos');
        expect(res).to.have.status(400);
        done();
      });
  });

  it('deveria negar atualizar a idade do User2', function(done) {
    chai.request(app)
      .put('/user/User2')
      .send({ nome: `Teste2`, email: `teste2@email.com`, idade: 17 })
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res.body.message).to.be.equal('Usuário precisa ter no mínimo 18 anos');
        expect(res).to.have.status(400);
        done();
      });
  });
});
