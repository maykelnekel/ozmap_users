# OZmapUsers

### Uma API simples e intuitiva para cadastro, leitura, atualização e deleção de usuários.

Desenvolvida utilizando as ferramentas mais atuais do mercado:

- [Node.js](https://nodejs.org/en)
- [Koa](https://nodejs.org/en)
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)

#
### [Visite a nossa documentação](https://maykelnekel.github.io/ozmap_users/)
#
### Iniciando o projeto

Para iniciar o projeto siga os seguintes passos:

- Baixe o repositório mais atualizado utilizando HTTPS ou SSH

```sh
# para clone com ssh
git clone git@github.com:maykelnekel/ozmap_users.git
```

```sh
# para clone com HTTPS
git clone https://github.com/maykelnekel/ozmap_users.git
```

- Acesse o diretório baixado

```sh
cd ozmap_users
```

- Instale as dependências de projeto utilizando o gerenciador de pacotes npm

```sh
npm install
```

- Crie um arquivo chamado `.env` e popule com as informações necessárias com base no arquivo `.env.example`

```sh
# você pode criar diretamente pelo terminal utilizando o comando
cp .env.example .env
```

- Com as variáveis de ambiente atualizadas no `.env` basta iniciar o servidor, use algum dos comandos abaixo

```sh
# utilize esse comando se estiver em ambiente de desenvolvimento
# ele facilita o debug, pois o servidor é reiniciado a cada mudança no código
npm run dev
```

```sh
# utilize esse comando se estiver em ambiente de teste ou produção
npm run start
```
