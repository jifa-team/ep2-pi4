
#  Entregável Parcial 1 (EP1)

##  Configuração de um processo de integração contínua utilizando o GitHub Actions

  

O propósito de aprendermos, e principalmente realizar na prática nesse entregável diz respeito usar a integração contínua para evitar problemas quando várias pessoas trabalham juntas no mesmo projeto de software. Ela funciona como um "checador automático" que testa o código toda vez que alguém faz uma alteração, avisando se algo quebrou. Assim, os erros são descobertos logo no começo, fica mais fácil consertar, e o projeto sempre fica em um estado que funciona.

  

##  Vídeo e documento sobre o entregável parcial 1 (EP1)
🎬 **Apresentação do EP1**
[enter link description here](https://www.youtube.com/watch?v=oTqaw-nsfEE)

📄 **Documento Obrigatório da  Disciplina**
     -> [Entregável Parcial 1 (EP1) - Relatório](https://docs.google.com/document/d/1_VnVeQSXsw2X4ZG_k93ufnbYCXhp_ikSqv9oFokK_Rg/edit?usp=sharing)

##  O que foi usado na pipeline?
<img  width="1123"  height="813"  alt="image"  src="https://github.com/user-attachments/assets/58173016-00e4-4e8e-8b77-4fda6ac2a777" />

  

🔍 **1. Linter — Verificação de Qualidade de Código**

  

> verifica seu código em busca de erros e más práticas

*📌 O que é?*

  

Um linter é uma ferramenta que analisa seu código fonte sem executá-lo, em busca de:

 - Erros de sintaxe
 - Más práticas
 - Código mal formatado
 - Variáveis não utilizadas
 - Inconsistências de estilo  

*💡 Por que usar?*

 - Padroniza o código entre os desenvolvedores
 - Evita bugs causados por erros simples
 - Melhora a leitura e manutenção do código

  

*🚀 No seu CI*

No **[GitHub Actions](https://github.com/jifa-team/ep1-pi4/actions)**, usamos o eslint para examinar os arquivos em assets/js/. Ele roda toda vez que você faz um push ou pull request, garantindo que o código esteja limpo antes de ir para produção.

  
  

🧪 **2. Cypress — Testes End-to-End (E2E)**

> testa automaticamente se um site ou aplicativo funciona corretamente

*📌 O que é?*

Cypress é uma ferramenta para testar a aplicação como um usuário real faria, diretamente no navegador.

Ele simula interações como: 

 - Visitar páginas
 - Clicar em botões
 - Preencher formulários
 - Verificar se textos estão visíveis

  

*💡 Por que usar?*

 - Garante que as páginas estejam funcionando de verdade
 - Detecta erros visuais ou de navegação
 - Ideal para testar funcionalidade real em  HTML, CSS e JS

  

*🚀 No seu CI*

Cypress roda após o site ser servido localmente (serve . -l 5000). Os testes acessam **http://localhost:5000** e executam casos definidos na pasta cypress/e2e.

🏗️ **3. Build — Preparação para Publicação**

> compilar, empacotar e preparar tudo para uso

*📌 O que é?*

O build, representa o processo de: 

 - Reunir todos os arquivos finais
 - Organizar pastas e estruturas
 - Deixar tudo pronto para envio ao servidor, hospedagem ou deploy  

*💡 Por que usar?*

Mesmo sem ferramentas como Webpack ou Vite, você pode querer:

 - Separar apenas os arquivos necessários para produção
 - Criar uma estrutura organizada para deploy
 - Usar essa pasta como base para o GitHub Pages, Netlify, etc.

  

*🚀 No nosso CI*

Criamos uma pasta build/ e copiamos para lá:  

📂 projeto/
    ├── 📄 index.html
    ├── 📂 assets/
    └── 📂 views/  

Assim, você pode usar essa pasta para deploy automático no futuro.  

*🔁 Tudo junto no CI*

Quando é feito um push: 

✅ Lint roda e verifica erros de código
🧪 Cypress sobe o site e simula interações reais
🏗️ Build agrupa os arquivos finais para publicação