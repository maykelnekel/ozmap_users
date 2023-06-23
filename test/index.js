//sample test
//Para rodar os testes, use: npm test
//PS: Os testes não estão completos e alguns podem comnter erros.

// veja mais infos em:
//https://mochajs.org/
//https://www.chaijs.com/
//https://www.chaijs.com/plugins/chai-json-schema/
//https://developer.mozilla.org/pt-PT/docs/Web/HTTP/Status (http codes)

const app = require("../src/server.js");

const assert = require("assert");
const chai = require("chai");
const chaiHttp = require("chai-http");
const chaiJson = require("chai-json-schema");
const userSchema = require("./schemas.js");
const validUsers = require("./mocks.js");

chai.use(chaiHttp);
chai.use(chaiJson);

const expect = chai.expect;

//Inicio dos testes

//testes da aplicação
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
  //...adicionar pelo menos mais 5 usuarios. se adicionar usuario menor de idade, deve dar erro. Ps: não criar o usuario naoExiste

  it("o usuario naoExiste não existe no sistema", function (done) {
    chai
      .request(app)
      .get("/user/naoExiste")
      .end(function (err, res) {
        expect(res.status).to.be.eql(404);
        expect(res.body.error).to.be.eql("User not found");
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
        expect(res.body).to.be.jsonSchema(userSchema);
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
        expect(res.body.error).to.be.eql("User not found");
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
