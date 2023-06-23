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

describe("Testes da aplicaçao", () => {
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

  it("deveria criar o usuario raupp", function (done) {
    chai.request(app).post("/user").send(validUsers.ana).end();
    chai.request(app).post("/user").send(validUsers.joao).end();
    chai.request(app).post("/user").send(validUsers.jordana).end();
    chai.request(app).post("/user").send(validUsers.marcio).end();
    chai.request(app).post("/user").send(validUsers.maria).end();
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

  it("não deveria criar usuário sem campo nome", function (done) {
    chai
      .request(app)
      .post("/user")
      .send(invalidUsers.semNome)
      .end(function (err, res) {
        expect(res).to.have.status(400);
        expext(res.body.error).to.be.eql(errorMessages.campoInvalido);

        done();
      });
  });

  it("não deveria criar usuário sem campo email", function (done) {
    chai
      .request(app)
      .post("/user")
      .send(invalidUsers.semEmail)
      .end(function (err, res) {
        expect(res).to.have.status(400);
        expext(res.body.error).to.be.eql(errorMessages.campoInvalido);

        done();
      });
  });

  it("não deveria criar usuário sem campo idade", function (done) {
    chai
      .request(app)
      .post("/user")
      .send(invalidUsers.semIdade)
      .end(function (err, res) {
        expect(res).to.have.status(400);
        expext(res.body.error).to.be.eql(errorMessages.campoInvalido);

        done();
      });
  });

  it("não deveria criar usuário com idade menor que 18", function (done) {
    chai
      .request(app)
      .post("/user")
      .send(invalidUsers.menorDeIdade)
      .end(function (err, res) {
        expect(res).to.have.status(409);
        expext(res.body.error).to.be.eql(errorMessages.menorDeIdade);

        done();
      });
  });

  it("não deveria criar usuário com email já registrado", function (done) {
    chai
      .request(app)
      .post("/user")
      .send(invalidUsers.emailJaRegistrado)
      .end(function (err, res) {
        expect(res).to.have.status(409);
        expext(res.body.error).to.be.eql(errorMessages.emailJaRegistrado);

        done();
      });
  });

  it("o usuario naoExiste não existe no sistema", function (done) {
    chai
      .request(app)
      .get("/user/naoExiste")
      .end(function (err, res) {
        expect(res.status).to.be.eql(404);
        expect(res.body.error).to.be.eql(errorMessages.usuarioNaoEncontrado);
        done();
      });
  });

  it("o usuario raupp existe e é valido", function (done) {
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

  it("deveria excluir o usuario raupp", function (done) {
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

  it("o usuario raupp não deve existir mais no sistema", function (done) {
    chai
      .request(app)
      .get("/user/raupp")
      .end(function (err, res) {
        expect(res.status).to.be.eql(404);
        expect(res.body.error).to.be.eql(errorMessages.usuarioNaoEncontrado);
        done();
      });
  });

  it("deveria ser uma lista com pelomenos 5 usuarios", function (done) {
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
});
