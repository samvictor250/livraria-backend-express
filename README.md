# Livraria Backend Express

API RESTful para gerenciamento de uma livraria, desenvolvida com **Node.js, Express e PostgreSQL**. O projeto permite gerenciar usuários, livros, autores e categorias, com autenticação JWT e controle de acesso às rotas.

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
- bcrypt
- dotenv
- Vercel
- NeonDB

## Funcionalidades

### Autenticação
- Cadastro de usuários (Sign up).
- Login com e-mail e senha.
- Logout com revogação de token.
- Senhas armazenadas com hash utilizando bcrypt.
- Autenticação por JWT.
- Proteção de rotas por middleware.

### Usuários
- Consultar os próprios dados.
- Atualizar os próprios dados.
- Excluir a própria conta.
- Proteção contra alteração de dados de outros usuários.

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

## Relacionamentos

O projeto utiliza os seguintes relacionamentos:

- **Autor e Livro:** um autor pode possuir vários livros, enquanto cada livro pertence a um autor.
- **Categoria e Livro:** uma categoria pode possuir vários livros, enquanto cada livro pertence a uma categoria.

### Rotas compostas

```http
GET /authors/:authorId/books
GET /categories/:categoryId/books
```

Essas rotas permitem consultar os livros associados a um autor ou a uma categoria específica.

## Autenticação e autorização

As rotas da API são protegidas por JWT, com exceção das rotas de cadastro e login.

O sistema utiliza middlewares para:
- Verificar a presença e validade do token.
- Verificar se o token foi revogado.
- Controlar permissões administrativas.
- Restringir operações aos dados do usuário autenticado.

As operações de criação, atualização e exclusão de livros, autores e categorias são restritas a administradores.

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
├── .env
├── .gitignore
├── package.json
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

### 4. Configurar variáveis de ambiente

Criar um arquivo `.env` na raiz do projeto:

```env
PORT=3000
DATABASE_URL=sua_url_do_postgresql
JWT_SECRET=sua_chave_secreta

SEED_ADMIN_PASSWORD=sua_senha_admin
SEED_USER_PASSWORD=sua_senha_usuario
```

As variáveis de banco e autenticação devem ser preenchidas com os valores correspondentes ao ambiente utilizado.

### 5. Executar a aplicação

```bash
npm start
```

## Dados iniciais

O projeto possui cadastro automático de dados iniciais no banco de dados, utilizando `findOrCreate` para evitar duplicações durante as inicializações.

São cadastrados:

- 2 usuários (administrador e usuário comum).
- 2 autores.
- 2 categorias.
- 2 livros associados aos respectivos autores e categorias.

As senhas dos usuários iniciais são armazenadas com hash utilizando bcrypt.

## Rotas principais

| Método | Rota | Descrição | Autenticação |
|---|---|---|---|
| POST | `/auth/register` | Cadastro | Não |
| POST | `/auth/login` | Login | Não |
| POST | `/auth/logout` | Logout | Sim |
| GET | `/users/me` | Consultar usuário autenticado | Sim |
| PUT | `/users/me` | Atualizar usuário autenticado | Sim |
| DELETE | `/users/me` | Excluir usuário autenticado | Sim |
| GET | `/books` | Listar livros | Sim |
| GET | `/books/:id` | Consultar livro | Sim |
| POST | `/books` | Cadastrar livro | Sim (Admin) |
| PUT | `/books/:id` | Atualizar livro | Sim (Admin) |
| DELETE | `/books/:id` | Excluir livro | Sim (Admin) |
| GET | `/authors` | Listar autores | Sim |
| GET | `/authors/:id` | Consultar autor | Sim |
| POST | `/authors` | Cadastrar autor | Sim (Admin) |
| PUT | `/authors/:id` | Atualizar autor | Sim (Admin) |
| DELETE | `/authors/:id` | Excluir autor | Sim (Admin) |
| GET | `/categories` | Listar categorias | Sim |
| GET | `/categories/:id` | Consultar categoria | Sim |
| POST | `/categories` | Cadastrar categoria | Sim (Admin) |
| PUT | `/categories/:id` | Atualizar categoria | Sim (Admin) |
| DELETE | `/categories/:id` | Excluir categoria | Sim (Admin) |
| GET | `/authors/:authorId/books` | Livros de um autor | Sim |
| GET | `/categories/:categoryId/books` | Livros de uma categoria | Sim |

**Observação:** as rotas e permissões acima refletem a estrutura atual planejada do projeto. Confira os caminhos e métodos no código antes da entrega final.

## Deploy

- **API publicada:** https://livraria-backend-express.vercel.app/
- **Repositório GitHub:** https://github.com/samvictor250/livraria-backend-express

O backend está hospedado na Vercel e utiliza um banco PostgreSQL hospedado na nuvem.

## Testes

Os endpoints podem ser testados utilizando o Postman.

Para acessar as rotas protegidas:

1. Realizar o cadastro ou login.
2. Copiar o token JWT retornado.
3. Configurar o cabeçalho `Authorization`.
4. Utilizar o formato:

```http
Authorization: Bearer SEU_TOKEN
```

## Licença

Projeto desenvolvido para fins acadêmicos.