const userSchema = require("../schemas");

const errorMessages = {
  campoFaltandoOuTipoInvalido: `Os campos a seguir são obrigatórios e devem ser do tipo especificado: ${userSchema.properties}`,
  campoInvalido: "Os campos permitidos são apenas: nome, email, idade",
  menorDeIdade: "Usuários com menos de 18 anos não são permitidos",
  emailJaRegistrado: "O email já está registrado",
  usuarioNaoEncontrado: "Usuário não encontrado",
};

module.exports = errorMessages;
