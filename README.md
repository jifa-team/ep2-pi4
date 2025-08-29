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