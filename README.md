# Livraria Backend Express

API RESTful para gerenciamento de uma livraria, desenvolvida com **Node.js, Express e PostgreSQL**. O sistema permite gerenciar usuários, livros, autores e categorias, utilizando autenticação JWT, Refresh Tokens e controle de acesso baseado em papéis.

## Integrantes

| Nome | RA |
|---|---|
| Samuel Victor Hill Santos | 00000860090 |

## Tecnologias utilizadas

- Node.js
- Express
- PostgreSQL
- Sequelize (ORM)
- JWT (JSON Web Token)
- Argon2id (hash de senhas)
- dotenv
- Vercel
- NeonDB (banco PostgreSQL em nuvem)

## Funcionalidades

### Autenticação

- Cadastro de usuários (Sign up).
- Login com e-mail e senha.
- Logout com revogação de Refresh Token e, quando fornecido, do Access Token.
- Senhas armazenadas com hash utilizando Argon2id.
- Autenticação por JWT.
- Access Token com validade de 15 minutos.
- Refresh Token opaco, gerado com 40 bytes aleatórios e validade de 7 dias.
- Renovação de sessão com rotação de Refresh Token.
- Armazenamento dos Refresh Tokens no PostgreSQL.

### Usuários

- Consultar os próprios dados.
- Atualizar os próprios dados.
- Excluir a própria conta.
- Proteção contra alteração de dados de outros usuários.
- Controle de papéis (`user` e `admin`).

O cadastro de usuários é realizado pela rota de autenticação. As operações de consulta, atualização e exclusão do perfil são realizadas pelo próprio usuário autenticado.

### Livros

- Cadastrar livros.
- Listar livros.
- Consultar livro por ID.
- Atualizar livros.
- Excluir livros.

### Autores

- Cadastrar autores.
- Listar autores.
- Consultar autor por ID.
- Atualizar autores.
- Excluir autores.

### Categorias

- Cadastrar categorias.
- Listar categorias.
- Consultar categoria por ID.
- Atualizar categorias.
- Excluir categorias.

As operações de criação, atualização e exclusão de livros, autores e categorias são restritas a administradores.

## Relacionamentos

O projeto utiliza dois relacionamentos principais:

- **Autor e Livro:** um autor pode possuir vários livros, enquanto cada livro pertence a um autor.
- **Categoria e Livro:** uma categoria pode possuir vários livros, enquanto cada livro pertence a uma categoria.

### Associações Sequelize

```javascript
AuthorModel.hasMany(BookModel);
BookModel.belongsTo(AuthorModel);

CategoryModel.hasMany(BookModel);
BookModel.belongsTo(CategoryModel);
```

### Rotas compostas

```http
GET /authors/:authorId/books
GET /categories/:categoryId/books
```

Essas rotas permitem consultar os livros associados a um autor ou a uma categoria específica.

## Autenticação e autorização

As rotas de cadastro e login são públicas. As demais rotas de recursos exigem autenticação, com exceção das operações de renovação de sessão e logout, que utilizam o Refresh Token enviado no corpo da requisição.

O sistema utiliza middlewares para:

- Verificar a presença e validade do JWT.
- Verificar se o Access Token foi revogado.
- Identificar o usuário autenticado.
- Controlar permissões administrativas.
- Restringir as operações de perfil aos dados do próprio usuário.

### Controle de acesso

O sistema possui dois papéis:

| Papel | Permissões |
|---|---|
| `user` | Consultar livros, autores e categorias; gerenciar o próprio perfil. |
| `admin` | Todas as permissões de usuário, além de criar, atualizar e excluir livros, autores e categorias. |

### Ciclo de autenticação

1. O usuário realiza login com e-mail e senha.
2. A API verifica a senha utilizando Argon2id.
3. A API retorna um Access Token JWT e um Refresh Token.
4. O Access Token é utilizado nas rotas protegidas.
5. Quando o Access Token expira, o Refresh Token pode ser enviado para renovar a sessão.
6. Na renovação, o Refresh Token anterior é destruído e um novo par de tokens é emitido.
7. No logout, o Refresh Token é revogado e o Access Token também pode ser revogado quando fornecido.

## Estrutura do projeto

```text
livraria-backend-express/
├── src/
│   ├── configs/
│   │   ├── database.js
│   │   └── seed.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── authorBookController.js
│   │   ├── authorController.js
│   │   ├── bookController.js
│   │   ├── categoryBookController.js
│   │   ├── categoryController.js
│   │   └── userController.js
│   ├── middlewares/
│   │   ├── adminMiddleware.js
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── associations.js
│   │   ├── authorModel.js
│   │   ├── bookModel.js
│   │   ├── categoryModel.js
│   │   ├── refreshTokenModel.js
│   │   ├── revokedTokenModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── authorBookRoutes.js
│   │   ├── authorRoutes.js
│   │   ├── bookRoutes.js
│   │   ├── categoryBookRoutes.js
│   │   ├── categoryRoutes.js
│   │   └── userRoutes.js
│   └── index.js
├── .gitignore
├── package.json
├── package-lock.json
├── Livraria Backend Express.postman_collection.json
└── README.md
```

## Instalação e execução

### 1. Clonar o repositório

```bash
git clone https://github.com/samvictor250/livraria-backend-express.git
```

### 2. Entrar na pasta

```bash
cd livraria-backend-express
```

### 3. Instalar dependências

```bash
npm install
```

### 4. Configurar as variáveis de ambiente

Criar um arquivo `.env` na raiz do projeto:

```env
PORT=3000

DB_NAME=nome_do_banco
DB_USER=usuario_do_banco
DB_PASSWORD=senha_do_banco
DB_HOST=host_do_postgresql
DB_PORT=5432

JWT_SECRET=sua_chave_secreta

SEED_ADMIN_PASSWORD=senha_do_administrador
SEED_USER_PASSWORD=senha_do_usuario
```

As variáveis de banco devem corresponder às credenciais do PostgreSQL utilizado.

A conexão utiliza SSL, conforme a configuração do projeto.

As variáveis `SEED_ADMIN_PASSWORD` e `SEED_USER_PASSWORD` definem as senhas dos usuários iniciais. Caso não sejam informadas, serão utilizados os valores padrão definidos no código.

**Não publique o arquivo `.env` no GitHub.** As variáveis também devem ser configuradas no ambiente de deploy da Vercel.

### 5. Executar a aplicação

Para iniciar:

```bash
npm start
```

Para executar em modo de desenvolvimento:

```bash
npm run dev
```

Na inicialização, a aplicação:

1. Conecta ao PostgreSQL.
2. Sincroniza os models com o banco utilizando Sequelize.
3. Executa a função de cadastro dos dados iniciais.
4. Inicia o servidor Express.

## Dados iniciais

O projeto possui cadastro automático de dados iniciais utilizando `findOrCreate`, evitando duplicações durante as inicializações.

São cadastrados:

**Usuários**
- Administrador (`admin@livraria.com`).
- Usuário Teste (`usuario@livraria.com`).

**Autores**
- Machado de Assis.
- Clarice Lispector.

**Categorias**
- Romance.
- Ficção.

**Livros**
- Dom Casmurro.
- A Hora da Estrela.

Os dois livros possuem seus respectivos autores e categorias associados.

As senhas dos usuários iniciais são processadas com Argon2id.

## Rotas principais

### Autenticação

| Método | Rota | Descrição | Autenticação JWT |
|---|---|---|---|
| POST | `/auth/register` | Cadastro de usuário | Não |
| POST | `/auth/login` | Login | Não |
| POST | `/auth/refresh` | Renovação da sessão | Não |
| DELETE | `/auth/logout` | Encerramento da sessão | Não |

As rotas de refresh e logout exigem o Refresh Token no corpo da requisição. O logout também aceita o Access Token no cabeçalho para revogá-lo.

### Usuários

| Método | Rota | Descrição | Autenticação |
|---|---|---|---|
| GET | `/users/me` | Consultar o próprio perfil | Sim |
| PUT | `/users/me` | Atualizar o próprio perfil | Sim |
| DELETE | `/users/me` | Excluir a própria conta | Sim |

### Livros

| Método | Rota | Descrição | Permissão |
|---|---|---|---|
| GET | `/books` | Listar livros | Usuário autenticado |
| GET | `/books/:id` | Consultar livro por ID | Usuário autenticado |
| POST | `/books` | Cadastrar livro | Admin |
| PUT | `/books/:id` | Atualizar livro | Admin |
| DELETE | `/books/:id` | Excluir livro | Admin |

### Autores

| Método | Rota | Descrição | Permissão |
|---|---|---|---|
| GET | `/authors` | Listar autores | Usuário autenticado |
| GET | `/authors/:id` | Consultar autor por ID | Usuário autenticado |
| POST | `/authors` | Cadastrar autor | Admin |
| PUT | `/authors/:id` | Atualizar autor | Admin |
| DELETE | `/authors/:id` | Excluir autor | Admin |

### Categorias

| Método | Rota | Descrição | Permissão |
|---|---|---|---|
| GET | `/categories` | Listar categorias | Usuário autenticado |
| GET | `/categories/:id` | Consultar categoria por ID | Usuário autenticado |
| POST | `/categories` | Cadastrar categoria | Admin |
| PUT | `/categories/:id` | Atualizar categoria | Admin |
| DELETE | `/categories/:id` | Excluir categoria | Admin |

### Relacionamentos

| Método | Rota | Descrição | Autenticação |
|---|---|---|---|
| GET | `/authors/:authorId/books` | Consultar livros de um autor | Sim |
| GET | `/categories/:categoryId/books` | Consultar livros de uma categoria | Sim |

## Testes com Postman

O projeto possui uma coleção Postman em formato JSON na raiz do repositório:

`Livraria Backend Express.postman_collection.json`

Para testar as rotas protegidas:

1. Realizar login com um usuário cadastrado.
2. Copiar o Access Token retornado.
3. Configurar o cabeçalho `Authorization`.
4. Utilizar o formato:

```http
Authorization: Bearer SEU_ACCESS_TOKEN
```

Para renovar a sessão, enviar o Refresh Token:

```json
{
    "refreshToken": "SEU_REFRESH_TOKEN"
}
```

Após a renovação, utilizar o novo Access Token e o novo Refresh Token retornados pela API.

## Deploy

- **API publicada:** https://livraria-backend-express.vercel.app/
- **Repositório GitHub:** https://github.com/samvictor250/livraria-backend-express

O projeto está configurado para publicação na Vercel e utiliza PostgreSQL. As variáveis de ambiente do banco devem estar configuradas no ambiente de deploy.

## Licença

Projeto desenvolvido para fins acadêmicos.
