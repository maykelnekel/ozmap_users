const userSchema = require("../schemas");

const errorMessages = {
  campoFaltandoOuTipoInvalidoPOST:
    "Os campos a seguir são obrigatórios e devem ser do tipo especificado: nome(string), email(string), idade(number)",
  campoFaltandoOuTipoInvalidoPATCH:
    "Os campos a seguir devem ser do tipo especificado: nome(string), email(string), idade(number)",
  campoInvalido: "Os campos permitidos são apenas: nome, email, idade",
  menorDeIdade: "Usuários com menos de 18 anos não são permitidos",
  emailJaRegistrado: "Email já registrado",
  usuarioNaoEncontrado: "Usuário não encontrado",
};

module.exports = errorMessages;
