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

Aproveite para explorar e testar cada uma delas! ✨

## 🔗 Integrando API com o Frontend

Esta seção detalha o processo passo a passo de como a comunicação entre o backend (API) e o frontend (React) foi estabelecida, resultando em uma aplicação web dinâmica e funcional.

### Passo 1: Configuração Inicial e CORS

O primeiro passo foi garantir que o servidor da API (rodando em `http://localhost:3000`) pudesse aceitar requisições do servidor de desenvolvimento do frontend (Vite, em `http://localhost:5173`). Isso foi feito configurando o middleware `cors` no `api/app.js`, permitindo a comunicação entre as duas origens.

### Passo 2: Cadastro de Usuário - A Primeira Conexão

A primeira funcionalidade integrada foi o cadastro de novos usuários.

1.  **Requisição do Frontend:** O componente `CadastroForm.jsx` foi implementado para enviar uma requisição `POST` para o endpoint `/users` da API com os dados do formulário.
2.  **Debugging Inicial:** O primeiro desafio foi um bug no próprio formulário, que não estava "controlando" os inputs. Isso foi corrigido para garantir que os dados digitados pelo usuário fossem corretamente enviados no corpo da requisição.

### Passo 3: Login e Gerenciamento de Token

Com o cadastro funcionando, o próximo passo foi autenticar os usuários.

1.  **Autenticação:** O `LoginForm.jsx` foi conectado ao endpoint `POST /api/auth`.
2.  **Recebimento do JWT:** Após a validação das credenciais, a API gera um **JSON Web Token (JWT)** e o envia de volta para o frontend.
3.  **Armazenamento Local:** O token recebido é armazenado no `localStorage` do navegador. Isso é crucial para que o usuário continue autenticado enquanto navega pela aplicação.
4.  **Correção de Contrato:** Durante o processo, foi necessário ajustar o frontend para interpretar corretamente a estrutura do JSON (`data.data.token`) que a API estava retornando.

### Passo 4: Centralizando Chamadas Autenticadas (A Melhoria Chave)

Para evitar repetir o código de autenticação em cada requisição, foi adotada uma abordagem mais robusta e de fácil manutenção:

1.  **Criação do Helper `apiFetch`:** Foi criado o arquivo `frontend/src/lib/api.js`.
2.  **Lógica Centralizada:** Esta função `apiFetch` encapsula todas as chamadas `fetch`. Antes de cada requisição, ela automaticamente:
    -   Verifica se existe um token no `localStorage`.
    -   Se existir, adiciona o cabeçalho `Authorization: Bearer <token>` à requisição.
    -   Centraliza o tratamento de erros básicos de rede.

### Passo 5: Consumo de Rotas Protegidas

Com o `apiFetch` pronto, o acesso a dados protegidos tornou-se simples.

-   O `PainelClientePage.jsx` foi refatorado para usar o `apiFetch` para buscar dados de endpoints como `/client-panel/atividades/:userId`.
-   O ID do usuário é extraído do próprio JWT (decodificado no lado do cliente), permitindo que a página busque apenas os dados pertencentes ao usuário logado.

### Passo 6: Implementando o Logout

A etapa final do ciclo de autenticação foi a implementação do logout. No componente `UserProfile`, o botão "Sair" executa uma função simples que:
1.  Remove o token do `localStorage`.
2.  Redireciona o usuário para a página de `/login`.

Este fluxo completo garante uma experiência de usuário segura e coesa, transformando a JifaOdonto em uma aplicação web verdadeiramente interativa.

## 💡  _[Componente Extensionista]_ Possíveis usos da nossa API

Nossa API foi projetada para ser flexível e pode ser a base para diversas soluções no mundo real, otimizando a gestão de clínicas e a experiência do paciente. Aqui estão alguns exemplos hipotéticos:

1.  **Aplicativo para Pacientes:**
    Uma clínica poderia desenvolver um aplicativo móvel (para Android e iOS) que se conecta à nossa API. Com ele, os pacientes poderiam:
    -   Agendar, visualizar e cancelar consultas diretamente pelo celular.
    -   Acessar seu histórico de tratamentos e prontuário.
    -   Receber notificações e lembretes sobre agendamentos.

2.  **Dashboard de Business Intelligence (BI):**
    Gestores de uma rede de clínicas poderiam integrar a API a ferramentas como Power BI ou Google Data Studio para:
    -   Analisar o fluxo de agendamentos em tempo real.
    -   Identificar horários de pico e ociosidade para otimizar a alocação de dentistas.
    -   Monitorar o crescimento da base de pacientes e a receita.

3.  **Sistema de Comunicação Automatizada:**
    Um serviço de automação poderia usar a API para enviar lembretes de consulta via WhatsApp ou SMS 24 horas antes do horário agendado, ajudando a reduzir a taxa de não comparecimento (no-show).

4.  **Integração com Convênios:**
     A API poderia servir como ponte para sistemas de convênios odontológicos, automatizando a validação de cobertura e o processo de faturamento, o que simplificaria a parte financeira tanto para a clínica quanto para o paciente.

## 🧪 Testes E2E (Cypress + Cucumber)

Esta base inclui uma suíte de testes E2E para a API usando Cypress com Cucumber (.feature). A suíte de testes está em `cypress/e2e/features` e usa step definitions em `cypress/e2e/step_definitions`.

### Pré-requisitos
- Ter o servidor da API rodando em `http://localhost:3000` (ou ajustar `API_BASE` via variáveis de ambiente).
- Node.js e npm instalados.
- MongoDB disponível (conforme configuração em `.env`).

### Executando os testes localmente
1. Instale dependências (se ainda não instalou):

    ```powershell
    cd C:\Users\55889\Desktop\ep2-pi4
    npm install
    ```

2. Inicie a API (em outro terminal):

    ```powershell
    npm run dev:api
    # ou
    node api/app.js
    ```

3. Rode a suíte Cypress completa:

    ```powershell
    npx cypress run --spec "cypress/e2e/**/*.feature"
    ```

### Notas úteis
- Os testes usam um helper para buscar/normalizar o JWT retornado pela rota `POST /api/auth`. Se a resposta do endpoint for alterada, atualize `cypress/support/commands.js`.
- As step definitions cuidam de criar recursos necessários (usuários, agendamentos) em modo "best-effort"; a suíte tenta criar usuários quando não existentes e salva aliases (ex.: `userId`) para uso em cenários subsequentes.
- Para depuração local, executar apenas um spec com:

    ```powershell
    npx cypress run --spec "cypress/e2e/features/users.feature"
    ```

- Em CI, garanta que a API esteja disponível antes de rodar os testes (por exemplo, iniciar a API em background ou usar um job separado que o provisiona). 

NÃO EXPOR TOKENS NOS LOGS EM AMBIENTES PUBLICOS E DE CI! EXPOSTOS APENAS PARA TESTE LOCAL.
