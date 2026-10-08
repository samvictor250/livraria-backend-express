# Livraria Backend Express

API REST para gerenciamento de uma livraria, construída com Node.js, Express, Sequelize e PostgreSQL (NeonDB).

---

## Autor

- **Nome:** Samuel Victor Hill Santos
- **RA:** 00000860090

---

## Sobre o projeto

Backend de uma livraria online que permite:
- Cadastro e autenticação de usuários (JWT)

Desenvolvido como projeto acadêmico para a disciplina Aplicações Orientadas a Serviços.

---

## Tecnologias

| Tecnologia | Uso |
|------------|-----|
| **Node.js** | Runtime JavaScript |
| **Express** | Framework web |
| **Sequelize** | ORM para PostgreSQL |
| **PostgreSQL (NeonDB)** | Banco de dados na nuvem |
| **JWT (jsonwebtoken)** | Autenticação stateless |
| **bcrypt** | Hash de senhas |
| **dotenv** | Variáveis de ambiente |

---

## Estrutura do projeto

```
livraria-backend-express/
├── src/
│   ├── configs/
│   │   └── database.js          # Conexão Sequelize + NeonDB
│   ├── controllers/
│   │   └── authController.js    # Register + Login
│   ├── middlewares/             # (futuro) Middleware de auth
│   ├── models/
│   │   └── userModel.js         # Modelo User
│   ├── routes/
│   │   └── authRoutes.js        # Rotas /auth
│   └── index.js                 # Entry point do servidor
├── .env                         # Variáveis de ambiente (não commitado)
├── .gitignore
├── package.json
└── README.md
```