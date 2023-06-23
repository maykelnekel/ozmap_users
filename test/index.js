const chai = require("chai");
const chaiHttp = require("chai-http");
const chaiJson = require("chai-json-schema");

const app = require("../src/server.js");
const validUsers = require("./mocks/validUsers.js");
const invalidUsers = require("./mocks/invalidUsers.js");
const errorMessages = require("./mocks/erroMessages.js");

chai.use(chaiHttp);
chai.use(chaiJson);

const expect = chai.expect;

describe("Testes iniciais", () => {
  it("o servidor esta online", function (done) {
    chai
      .request(app)
      .get("/")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it("deveria ser uma lista vazia de usuarios", function (done) {
    chai
      .request(app)
      .get("/users")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.eql([]);
        done();
      });
  });
});

describe("Testes de criação de usuários - POST /user", () => {
  it("SUCESSO - deveria criar o usuario raupp", function (done) {
    chai
      .request(app)
      .post("/user")
      .send(validUsers.raupp)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        done();
      });
  });

  it("FALHA - não deveria criar usuário sem campo nome", function (done) {
    chai
      .request(app)
      .post("/user")
      .send(invalidUsers.semNome)
      .end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.be.eql(
          errorMessages.campoFaltandoOuTipoInvalidoPOST
        );

        done();
      });
  });

  it("FALHA - campo nome deveria ser uma string", function (done) {
    chai
      .request(app)
      .post("/user")
      .send(invalidUsers.nomeInvalido)
      .end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.be.eql(
          errorMessages.campoFaltandoOuTipoInvalidoPOST
        );

        done();
      });
  });

  it("FALHA - não deveria criar usuário sem campo email", function (done) {
    chai
      .request(app)
      .post("/user")
      .send(invalidUsers.semEmail)
      .end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.be.eql(
          errorMessages.campoFaltandoOuTipoInvalidoPOST
        );

        done();
      });
  });

  it("FALHA - campo email deveria ser uma string", function (done) {
    chai
      .request(app)
      .post("/user")
      .send(invalidUsers.emailInvalido)
      .end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.be.eql(
          errorMessages.campoFaltandoOuTipoInvalidoPOST
        );

        done();
      });
  });

  it("FALHA - não deveria criar usuário sem campo idade", function (done) {
    chai
      .request(app)
      .post("/user")
      .send(invalidUsers.semIdade)
      .end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.be.eql(
          errorMessages.campoFaltandoOuTipoInvalidoPOST
        );

        done();
      });
  });

  it("FALHA - campo idade deveria ser um number", function (done) {
    chai
      .request(app)
      .post("/user")
      .send(invalidUsers.idadeInvalida)
      .end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.be.eql(
          errorMessages.campoFaltandoOuTipoInvalidoPOST
        );

        done();
      });
  });

  it("FALHA - não deveria criar usuário com idade menor que 18", function (done) {
    chai
      .request(app)
      .post("/user")
      .send(invalidUsers.menorDeIdade)
      .end(function (err, res) {
        expect(res).to.have.status(409);
        expect(res.body.error).to.be.eql(errorMessages.menorDeIdade);

        done();
      });
  });

  it("FALHA - não deveria criar usuário com email já registrado", function (done) {
    chai
      .request(app)
      .post("/user")
      .send(invalidUsers.emailJaRegistrado)
      .end(function (err, res) {
        expect(res).to.have.status(409);
        expect(res.body.error).to.be.eql(errorMessages.emailJaRegistrado);

        done();
      });
  });

  it("FALHA - não deveria criar com um campo não permitido", function (done) {
    chai
      .request(app)
      .post(`/user`)
      .send(invalidUsers.campoInvalido)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body).to.be.an("object");
        expect(res.body.error).to.be.eql(errorMessages.campoInvalido);
        done();
      });
  });
});

describe("Testes de leitura de todos os usuários - GET /users", () => {
  it("SUCESSO - deveria ser uma lista com pelomenos 5 usuarios", function (done) {
    chai.request(app).post("/user").send(validUsers.ana).end();
    chai.request(app).post("/user").send(validUsers.joao).end();
    chai.request(app).post("/user").send(validUsers.jordana).end();
    chai.request(app).post("/user").send(validUsers.marcio).end();
    chai.request(app).post("/user").send(validUsers.maria).end();
    chai
      .request(app)
      .get("/users")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.length).greaterThan(4);
        done();
      });
  });

  it("FALHA - não deveria ser um único objeto", function (done) {
    chai
      .request(app)
      .get("/users")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.not.be.an("object");
        done();
      });
  });
});

describe("Testes de leitura de um usuário - GET /user/:nome", () => {
  it("SUCESSO - o usuario raupp existe e é valido", function (done) {
    chai
      .request(app)
      .get("/user/raupp")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(validUsers.raupp);
        done();
      });
  });

  it("FALHA - o usuario não existe no sistema", function (done) {
    chai
      .request(app)
      .get("/user/naoExiste")
      .end(function (err, res) {
        expect(res.status).to.be.eql(404);
        expect(res.body.error).to.be.eql(errorMessages.usuarioNaoEncontrado);
        done();
      });
  });
});

describe("Testes de atualização de um usuário - PATCH /user/:nome", () => {
  it("SUCESSO - deveria atualizar apenas o campo nome", function (done) {
    chai
      .request(app)
      .patch(`/user/${validUsers.joao.nome}`)
      .send(validUsers.attNomeJoao)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.nome).to.be.eql(validUsers.attNomeJoao.nome);
        done();
      });
  });

  it("SUCESSO - deveria atualizar apenas o campo email", function (done) {
    chai
      .request(app)
      .patch(`/user/${validUsers.maria.nome}`)
      .send(validUsers.attEmailMaria)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.email).to.be.eql(validUsers.attEmailMaria.email);
        done();
      });
  });

  it("SUCESSO - deveria atualizar apenas o campo idade", function (done) {
    chai
      .request(app)
      .patch(`/user/${validUsers.jordana.nome}`)
      .send(validUsers.attIdadeJordana)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.idade).to.be.eql(validUsers.attIdadeJordana.idade);
        done();
      });
  });

  it("SUCESSO - deveria atualizar todos os campos", function (done) {
    chai
      .request(app)
      .patch(`/user/${validUsers.jordana.nome}`)
      .send(validUsers.attTudoJordana)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.be.eql(validUsers.attTudoJordana);
        done();
      });
  });

  it("FALHA - não deveria atualizar se o campo nome for do tipo invalido", function (done) {
    chai
      .request(app)
      .patch(`/user/${validUsers.ana.nome}`)
      .send(invalidUsers.nomeInvalido)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body).to.be.an("object");
        expect(res.body.error).to.be.eql(
          errorMessages.campoFaltandoOuTipoInvalidoPATCH
        );
        done();
      });
  });

  it("FALHA - não deveria atualizar se o campo email for do tipo invalido", function (done) {
    chai
      .request(app)
      .patch(`/user/${validUsers.ana.nome}`)
      .send(invalidUsers.emailInvalido)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body).to.be.an("object");
        expect(res.body.error).to.be.eql(
          errorMessages.campoFaltandoOuTipoInvalidoPATCH
        );
        done();
      });
  });

  it("FALHA - não deveria atualizar se o campo idade for do tipo invalido", function (done) {
    chai
      .request(app)
      .patch(`/user/${validUsers.ana.nome}`)
      .send(invalidUsers.idadeInvalida)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body).to.be.an("object");
        expect(res.body.error).to.be.eql(
          errorMessages.campoFaltandoOuTipoInvalidoPATCH
        );
        done();
      });
  });

  it("FALHA - não deveria atualizar com um campo não permitido", function (done) {
    chai
      .request(app)
      .patch(`/user/${validUsers.maria.nome}`)
      .send(invalidUsers.campoInvalido)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body).to.be.an("object");
        expect(res.body.error).to.be.eql(errorMessages.campoInvalido);
        done();
      });
  });
});

describe("Testes de deleção de um usuário - DELETE /user/:nome", () => {
  it("SUCESSO - deveria excluir o usuario raupp", function (done) {
    chai
      .request(app)
      .delete("/user/raupp")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(204);
        expect(res.body).to.be.empty;
        done();
      });
  });

  it("SUCESSO - o usuario raupp não deve existir mais no sistema", function (done) {
    chai
      .request(app)
      .get("/user/raupp")
      .end(function (err, res) {
        expect(res.status).to.be.eql(404);
        expect(res.body.error).to.be.eql(errorMessages.usuarioNaoEncontrado);
        done();
      });
  });

  it("FALHA - o usuario informado não existe no sistema", function (done) {
    chai
      .request(app)
      .get("/user/naoexiste")
      .end(function (err, res) {
        expect(res.status).to.be.eql(404);
        expect(res.body.error).to.be.eql(errorMessages.usuarioNaoEncontrado);
        done();
      });
  });
});
