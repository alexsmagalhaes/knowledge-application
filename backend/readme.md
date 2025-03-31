# Knowledger - API REST

Aqui está o badge do JavaScript:

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON-web-tokens&logoColor=white)

## 📖 Sobre o Projeto

A **Knowledger API REST** foi desenvolvida para ser um portal onde pessoas possam publicar e compartilhar conhecimento de forma simples e eficiente. A aplicação possui uma arquitetura sólida, seguindo boas práticas e garantindo segurança e escalabilidade.

## 🚀 Tecnologias Utilizadas

O backend da API foi desenvolvido com as seguintes tecnologias:

- **Node.js e Express** → Para estruturação das rotas e endpoints
- **PostgreSQL** → Banco de dados relacional para armazenar informações principais
- **MongoDB** → Banco NoSQL para armazenamento de estatísticas
- **JWT e Hashing** → Para autenticação segura dos usuários
- **Swagger** → Para documentação interativa da API
- **Execuções de Rotina (Cron Jobs)** → Para otimização do processamento

## 🏗️ Arquitetura do Projeto

A API segue uma **arquitetura monolítica** e **MVC**, escolhidas para garantir simplicidade e agilidade no desenvolvimento, mantendo a escalabilidade para futuras melhorias.

## 📥 Instalação

Para rodar a aplicação localmente, siga os passos abaixo:

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/knowledger-api.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd knowledger-api
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Crie um arquivo `.env` na raiz do projeto e configure as variáveis:
   ```env
   PORT=3000
   DB_CLIENT=pg
   DB_DATABASE=knowledger_db
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   JWT_SECRET=seu_token_secreto
   MONGODB_CONNECTION=mongodb://seu_host/seu_banco
   ```
5. Execute a aplicação:
   ```bash
   npm run dev
   ```

## 📌 Documentação dos Endpoints

A documentação completa dos endpoints pode ser acessada após a execução da aplicação no seguinte path:

```
http://localhost:3000/api/docs/
```

### 🔍 Lista de Endpoints

#### 🛠️ Autenticação

- `POST /api/auth/register` → Criação de novo usuário
- `POST /api/auth/login` → Autenticação e geração de token JWT

#### 📚 Publicações

- `GET /api/posts` → Listar todas as publicações
- `POST /api/posts` → Criar uma nova publicação
- `GET /api/posts/:id` → Buscar uma publicação específica
- `PUT /api/posts/:id` → Atualizar uma publicação
- `DELETE /api/posts/:id` → Remover uma publicação

#### 👤 Usuários

- `GET /api/users` → Listar todos os usuários
- `GET /api/users/:id` → Buscar um usuário específico
- `PUT /api/users/:id` → Atualizar dados do usuário
- `DELETE /api/users/:id` → Remover um usuário

#### 📊 Estatísticas

- `GET /api/stats` → Buscar estatísticas gerais da plataforma

## 📜 Licença

Este projeto é baseado no projeto **Knowledger** do curso **Web Moderno** da Cod3r.

---

Se você deseja colaborar ou melhorar este projeto, sinta-se à vontade para abrir um PR ou entrar em contato! 🚀
