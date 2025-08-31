# JifaOdonto - Projeto Full-Stack 🦷✨

Este repositório representa o entregável parcial 2 (EP2), da disciplina Projeto Intregado IV, contém o código-fonte para a aplicação full-stack da JifaOdonto, que inclui uma API RESTful (foco dessa etapa da disciplina) para o backend e uma aplicação em React para o frontend.

## 📂 Estrutura do Projeto

O projeto adota uma abordagem de "monorepo simplificado", onde o backend e o frontend residem no mesmo repositório para facilitar o desenvolvimento e o gerenciamento, mas com seus escopos bem definidos.

-   **`/` (Raiz)**: Contém a configuração geral do projeto, as dependências do backend e os scripts para orquestrar as duas partes da aplicação.
-   **`/api`**: Contém todo o código-fonte do backend (servidor), incluindo rotas, modelos de dados e lógica de negócio.
-   **`/frontend`**: Contém uma aplicação React completa e independente, criada com Vite. Ela possui seu próprio `package.json` para gerenciar suas dependências.

## 🛠️ Tecnologias Utilizadas

### ☁️ Backend (API)
-   **Node.js**
-   **Express.js**: Framework para a construção do servidor e das rotas da API.
-   **Mongoose**: ODM para modelagem e interação com o banco de dados MongoDB.
-   **JSON Web Token (JWT)**: Para autenticação e gerenciamento de sessões.
-   **Nodemon**: Para reiniciar o servidor automaticamente durante o desenvolvimento.

### 🖥️ Frontend
-   **React**: Biblioteca para a construção da interface de usuário.
-   **Vite**: Ferramenta de build e servidor de desenvolvimento rápido.
-   **Tailwind CSS**: Framework de CSS para estilização.
-   **React Router**: Para gerenciamento de rotas no lado do cliente.

## ✅ Pré-requisitos

-   **Node.js** (versão 14 ou superior)
-   **npm** (geralmente instalado com o Node.js)
-   Uma instância do **MongoDB** em execução (localmente ou na nuvem).

## ⚙️ Configuração do Ambiente

Antes de iniciar a aplicação, é necessário configurar as variáveis de ambiente.

1.  Crie um arquivo chamado `.env` na raiz do projeto.
2.  Adicione as seguintes variáveis a ele, substituindo pelos seus valores:

    ```.env.example
    # URL de conexão com o banco de dados MongoDB
    DATABASE_URL=mongodb://localhost:27017/jifaodonto

    # Chave secreta para a assinatura dos tokens de autenticação (JWT)
    JWT_SECRET=sua-chave-secreta-aqui
    ```

## 🚀 Como Executar a Aplicação

### 📦 1. Instalação das Dependências

Na primeira vez, execute o seguinte comando na raiz do projeto. Ele instalará as dependências do backend e, em seguida, as dependências do frontend automaticamente (via script `postinstall`).

```bash
npm install
```

### ⚡ 2. Executando os Ambientes de Desenvolvimento

Você pode rodar a aplicação completa ou cada parte separadamente.

-   **Aplicação Completa (Backend + Frontend):**
    ```bash
    npm run dev
    ```

-   **Apenas o Backend (API):**
    ```bash
    npm run dev:api
    ```

-   **Apenas o Frontend:**
    ```bash
    npm run dev:frontend
    ```

## 🚀 Explorando a API RESTful

Nossa API é o cérebro 🧠 por trás da JifaOdonto, gerenciando usuários, agendamentos e muito mais. Ela foi construída seguindo os princípios do REST, garantindo previsibilidade e escalabilidade.

### 🧪 Testando as Rotas com o REST Client

Para facilitar os testes e a exploração da nossa API, criamos um arquivo de requests: 📂 `api/routes/route.rest`. Com ele, você pode disparar requisições diretamente do seu editor!

**Como usar:**

1.  **Instale a Extensão:** Procure por **[REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)** no seu VS Code e instale-a.
2.  **Abra o Arquivo:** Abra o arquivo `api/routes/route.rest`.
3.  **Envie a Requisição:** Acima de cada request, você verá um botão `Send Request`. Clique nele e veja a mágica acontecer! A resposta da API aparecerá em uma nova aba ao lado.

É uma forma fantástica de interagir com o backend sem precisar do frontend! ✨

### 🗺️ Mapa de Rotas da API

Aqui está um guia completo de todas as rotas disponíveis, seus métodos HTTP e o que elas fazem.

#### 🔑 Autenticação (`/api/auth`)

Esta rota é a porta de entrada para o sistema.

| Verbo | Rota | Descrição | Autenticação? |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Realiza o login de um usuário, retornando um token JWT. | ❌ Não |

---

#### 👥 Usuários (`/users`)

Gerenciamento completo dos usuários da plataforma.

| Verbo | Rota | Descrição | Autenticação? |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Lista todos os usuários cadastrados. | ✅ Sim |
| `GET` | `/:id` | Busca um usuário específico pelo seu ID. | ✅ Sim |
| `POST` | `/` | Cria um novo usuário. | ❌ Não |
| `PATCH` | `/:id` | Atualiza parcialmente os dados de um usuário. | ✅ Sim |
| `DELETE`| `/:id` | Remove um usuário do sistema. | ✅ Sim |

---

#### 🗓️ Agendamentos (`/appointments`)

Rotas para criar e gerenciar os agendamentos.

| Verbo | Rota | Descrição | Autenticação? |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Lista todos os agendamentos. | ✅ Sim |
| `POST` | `/` | Cria um novo agendamento. | ✅ Sim |
| `GET` | `/:id` | Busca um agendamento específico pelo ID. | ✅ Sim |
| `PATCH` | `/:id` | Atualiza o status ou notas de um agendamento. | ✅ Sim |
| `DELETE`| `/:id` | Cancela/deleta um agendamento. | ✅ Sim |

---

####  dashboards: Painel do Cliente (`/client-panel`)

Estas são as rotas protegidas que alimentam o painel do cliente. Todas elas exigem um token JWT válido no cabeçalho `Authorization`.

| Verbo | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/atividades/:userId` | Retorna as últimas atividades do usuário. |
| `GET` | `/consultas/ultimas/:userId` | Busca a última consulta realizada. |
| `GET` | `/agendamentos/:userId` | Lista todos os agendamentos de um usuário. |
| `POST` | `/agendamentos` | Cria um novo agendamento para o usuário logado. |
| `PUT` | `/agendamentos/:id` | Atualiza um agendamento específico. |
| `DELETE`| `/agendamentos/:id` | Cancela um agendamento específico. |
| `GET` | `/historico/:userId` | Retorna o histórico de consultas. |
| `GET` | `/prontuario/:userId` | Busca os dados do prontuário do cliente. |
| `GET` | `/notificacoes/:userId` | Lista todas as notificações do usuário. |
| `PUT` | `/notificacoes/:id/lida`| Marca uma notificação como lida. |

Aproveite para explorar e testar cada uma delas! 🚀