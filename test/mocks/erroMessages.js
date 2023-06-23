const userSchema = require("../schemas");

const errorMessages = {
  campoFaltando: `Os campos a seguir são obrigatórios: ${userSchema.properties}`,
  campoInvalido: "Os campos permitidos são apenas: nome, email, idade",
  menorDeIdade: "Usuários com menos de 18 anos não são permitidos",
  emailJaRegistrado: "O email já está registrado",
  usuarioNaoEncontrado: "Usuário não encontrado",
};

module.exports = errorMessages;
