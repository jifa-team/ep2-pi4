# ep1-pi4

<img width="1123" height="813" alt="image" src="https://github.com/user-attachments/assets/58173016-00e4-4e8e-8b77-4fda6ac2a777" />

🔍 1. Linter — Verificação de Qualidade de Código
📌 O que é?
Um linter é uma ferramenta que analisa seu código fonte sem executá-lo, em busca de:

Erros de sintaxe

Más práticas

Código mal formatado

Variáveis não utilizadas

Inconsistências de estilo

💡 Por que usar?
Padroniza o código entre os desenvolvedores

Evita bugs causados por erros simples

Melhora a leitura e manutenção do código

🚀 No seu CI
No GitHub Actions, usamos o eslint para examinar os arquivos em assets/js/. Ele roda toda vez que você faz um push ou pull request, garantindo que o código esteja limpo antes de ir para produção.


🧪 2. Cypress — Testes End-to-End
📌 O que é?
Cypress é uma ferramenta para testar a aplicação como um usuário real faria, diretamente no navegador.

Ele simula interações como:

Visitar páginas

Clicar em botões

Preencher formulários

Verificar se textos estão visíveis

💡 Por que usar?
Garante que as páginas estejam funcionando de verdade

Detecta erros visuais ou de navegação

Ideal para testar funcionalidade real em HTML, CSS e JS

🚀 No seu CI
Cypress roda após o site ser servido localmente (serve . -l 5000). Os testes acessam http://localhost:5000 e executam casos definidos na pasta cypress/e2e.


🏗️ 3. Build — Preparação para Publicação
📌 O que é?
O build, representa o processo de:

Reunir todos os arquivos finais

Organizar pastas e estruturas

Deixar tudo pronto para envio ao servidor, hospedagem ou deploy

💡 Por que usar?
Mesmo sem ferramentas como Webpack ou Vite, você pode querer:

Separar apenas os arquivos necessários para produção

Criar uma estrutura organizada para deploy

Usar essa pasta como base para o GitHub Pages, Netlify, etc.

🚀 No nosso CI
Criamos uma pasta build/ e copiamos para lá:

index.html

Pasta assets/

Pasta views/

Assim, você pode usar essa pasta para deploy automático no futuro.

🔁 Tudo junto no CI
Quando é feito um push:

✅ Lint roda e verifica erros de código

🧪 Cypress sobe o site e simula interações reais

🏗️ Build agrupa os arquivos finais para publicação
