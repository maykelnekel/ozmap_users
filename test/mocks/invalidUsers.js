const invalidUsers = {
  semNome: { email: "semnome@devoz.com.br", idade: 35 },
  semIdade: { nome: "sem idade", email: "semidade@devoz.com.br" },
  semEmail: { nome: "sem email", idade: 18 },
  menorDeIdade: {
    nome: "sem email",
    email: "menordeidade@devoz.com.br",
    idade: 16,
  },
  emailJaRegistrado: {
    nome: "Marcinho",
    email: "marcio@devoz.com.br",
    idade: 50,
  },
  nomeInvalido: {
    nome: true,
    email: "nomeInvalido@devoz.com.br",
    idade: 29,
  },
  emailInvalido: {
    nome: "emailInvalido",
    email: [],
    idade: 29,
  },
  idadeInvalida: {
    nome: "idadeInvalida",
    email: "idadeInvalida@mail.com",
    idade: false,
  },
  campoInvalido: {
    nome: "campoInvalido",
    email: "campoinvalido@devoz.com.br",
    idade: 50,
    campoInvalido: true,
  },
};

module.exports = invalidUsers;
