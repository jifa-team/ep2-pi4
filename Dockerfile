# Etapa 1: Imagem base do Nginx
FROM nginx:1.27-alpine

# Etapa 2: Copia TODO o conteúdo do projeto para a pasta do servidor.
COPY . /usr/share/nginx/html/

# Etapa 3: Move a pasta 'templates' de dentro de 'views'
# para a raiz do servidor.
RUN mv /usr/share/nginx/html/views/templates /usr/share/nginx/html/templates

# Etapa 4: Move a página principal para a raiz e a renomeia para index.html.
RUN mv -f /usr/share/nginx/html/views/home.html /usr/share/nginx/html/index.html

# Etapa 5: Expõe a porta 80
EXPOSE 80