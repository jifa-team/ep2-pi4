
#  Entregável Parcial 1 (EP1)

##  Configuração de um processo de integração contínua utilizando o GitHub Actions

  

O propósito de aprendermos, e principalmente realizar na prática nesse entregável diz respeito usar a integração contínua para evitar problemas quando várias pessoas trabalham juntas no mesmo projeto de software. Ela funciona como um "checador automático" que testa o código toda vez que alguém faz uma alteração, avisando se algo quebrou. Assim, os erros são descobertos logo no começo, fica mais fácil consertar, e o projeto sempre fica em um estado que funciona.

  

##  Vídeo e documento sobre o entregável parcial 1 (EP1)
🎬 **Apresentação do EP1**
    -> [Apresentação](https://www.youtube.com/watch?v=oTqaw-nsfEE)

📄 **Documento Obrigatório da  Disciplina**
     -> [Entregável Parcial 1 (EP1) - Relatório](https://docs.google.com/document/d/1_VnVeQSXsw2X4ZG_k93ufnbYCXhp_ikSqv9oFokK_Rg/edit?usp=sharing)

##  O que foi usado na pipeline?

<img width="1123" height="813" alt="image" src="https://github.com/user-attachments/assets/58173016-00e4-4e8e-8b77-4fda6ac2a777" />

🔍 **1. Linter — Verificação de Qualidade de Código**
📌 **O que é?**
Um linter é uma ferramenta que analisa seu código fonte sem executá-lo, em busca de:

* Erros de sintaxe
* Más práticas
* Código mal formatado
* Variáveis não utilizadas
* Inconsistências de estilo

💡 **Por que usar?**
* Padroniza o código entre os desenvolvedores
* Evita bugs causados por erros simples
* Melhora a leitura e manutenção do código

🚀 **No seu CI**
No GitHub Actions, usamos o `eslint` para examinar os arquivos em `assets/js/`. Ele roda toda vez que você faz um push ou pull request, garantindo que o código esteja limpo antes de ir para produção.

🧪 **2. Cypress — Testes End-to-End**
📌 **O que é?**
Cypress é uma ferramenta para testar a aplicação como um usuário real faria, diretamente no navegador.

Ele simula interações como:

* Visitar páginas
* Clicar em botões
* Preencher formulários
* Verificar se textos estão visíveis

💡 **Por que usar?**
* Garante que as páginas estejam funcionando de verdade
* Detecta erros visuais ou de navegação
* Ideal para testar funcionalidade real em HTML, CSS e JS

🚀 **No seu CI**
Cypress roda após o site ser servido localmente (`serve . -l 5000`). Os testes acessam `http://localhost:5000` e executam casos definidos na pasta `cypress/e2e`.


🏗️ **3. Build — Preparação para Publicação**
📌 **O que é?**
O build, representa o processo de:

* Reunir todos os arquivos finais
* Organizar pastas e estruturas
* Deixar tudo pronto para envio ao servidor, hospedagem ou deploy

💡 **Por que usar?**
Mesmo sem ferramentas como Webpack ou Vite, você pode querer:

* Separar apenas os arquivos necessários para produção
* Criar uma estrutura organizada para deploy
* Usar essa pasta como base para o GitHub Pages, Netlify, etc.

🚀 **No nosso CI**
Criamos uma pasta `build/` e copiamos para lá:

* index.html
* Pasta `assets/`
* Pasta `views/`

Assim, você pode usar essa pasta para deploy automático no futuro.

🔁 **Tudo junto no CI**
Quando é feito um push:

✅ Lint roda e verifica erros de código
🧪 Cypress sobe o site e simula interações reais
🏗️ Build agrupa os arquivos finais para publicação

---

## JifaOdonto tá on! 🚀

Depois de garantir que o código estava limpo e os testes passavam, demos o próximo passo: a **publicação automática**! Agora, nosso projeto não apenas se testa, ele se publica sozinho na internet.

O site está no ar e pode ser acessado em: [**`https://jifaodonto.online`**](https://jifaodonto.online)

### O CI-CD ao vivo


https://github.com/user-attachments/assets/799331e8-a019-4510-bcf4-157c5cbd90fb




### Da Integração Contínua (CI) à Implantação Contínua (CD)

Para fazer essa mágica acontecer, evoluímos nossa automação.

* **O que tínhamos:** Um arquivo `ci.yml` que era nosso "inspetor de qualidade". Ele verificava o código (`lint`) e testava a navegação (`cypress`). Se tudo estivesse OK, ele parava por aí.
* **O que temos agora:** Um novo arquivo, **`ci-cd.yml`**, que é um "inspetor e entregador". Ele faz tudo o que o antigo fazia e, no final, se tudo estiver perfeito, ele automaticamente publica a nova versão do site no nosso servidor.

### Por que não temos mais o "Build"?

No workflow antigo, tínhamos um `job` chamado `build` que apenas copiava os arquivos para uma pasta. Percebemos que podíamos fazer algo muito mais poderoso!

Em vez de só copiar arquivos, agora construímos uma "casa" completa para o nosso site usando **Docker**. O nosso `Dockerfile` é a planta baixa dessa casa: ele monta um pequeno servidor Nginx e coloca todos os nossos arquivos (HTML, CSS, JS) dentro dele de forma organizada. Isso garante que o site rode em um ambiente perfeito e isolado, eliminando o "na minha máquina funciona".

### A Infraestrutura por Trás do Site

Para que o site ficasse no ar com toda essa automação, montamos uma estrutura profissional. Pense nela como a construção de um prédio:


![ferramentas](https://github.com/user-attachments/assets/cda0d362-fe55-461a-beac-28afbd40534c)


* 🌐 **DigitalOcean Droplet — O Terreno**
    Compramos nosso "terreno na internet". É um servidor privado, uma máquina virtual potente que nos dá total controle.

* 🛠️ **EasyPanel — O Mestre de Obras**
    Instalamos o EasyPanel na nossa Droplet para ser nosso "mestre de obras". É um painel de controle que facilita gerenciar tudo o que acontece no servidor. É ele quem recebe o sinal do GitHub e comanda a atualização do nosso site.

* 🏠 **Docker e Nginx — A Casa Pré-Fabricada**
    Usamos o Docker para criar uma "casa" pronta para o nosso site. O `Dockerfile` é a planta, e o **Nginx** é o sistema que serve nossas páginas para os visitantes. O EasyPanel gerencia essa "casa" (o contêiner Docker) para nós.

* 🛡️ **Cloudflare — A Equipe de Segurança e Logística**
    O Cloudflare atua como uma camada de proteção e velocidade. Ele fica na frente do nosso servidor e faz duas coisas incríveis:
    1.  **Segurança:** Protege nosso site contra ataques maliciosos, como um porteiro super atento.
    2.  **Velocidade (CDN):** Ele guarda cópias do nosso site em servidores ao redor do mundo. Quando alguém do Japão acessa o site, ele entrega a cópia que está mais perto, tornando o carregamento muito mais rápido.

### 🔁 Tudo junto no CI/CD (O Fluxo Completo)

Agora, quando um desenvolvedor faz um `push` para a branch `main`:

✅ **Lint** verifica se o código está limpo e padronizado.
🧪 **Cypress** simula um usuário real navegando no site para garantir que nada quebrou.
✨ **Se tudo passar**, o job de **Deploy** é acionado.
📞 Ele envia um sinal (via webhook) para o **EasyPanel**.
🔄 O **EasyPanel** recebe o sinal, baixa a versão mais recente do código do GitHub, usa o **Dockerfile** para construir a nova "casa" do site e a coloca no ar.
🌍 O **Cloudflare** percebe a atualização e garante que a nova versão seja entregue com segurança e rapidez para todo o mundo.

E tudo isso acontece em minutos, sem que ninguém precise apertar um único botão no servidor. **Isso é CI/CD!**
