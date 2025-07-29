function loadComponent(id, file) {
  // Cria a URL completa, combinando a origem do site (ex: https://teste.jifaodonto.online)
  // com o caminho do arquivo (ex: /templates/header.html).
  const url = new URL(file, window.location.origin);

  // Agora, o fetch usa a URL completa e inequívoca.
  fetch(url)
    .then(response => {
      // Adiciona uma verificação extra para garantir que a resposta foi bem-sucedida
      if (!response.ok) {
        throw new Error(`A resposta da rede não foi 'ok' para o arquivo: ${file}`);
      }
      return response.text();
    })
    .then(data => {
      const element = document.getElementById(id);
      if (element) {
        element.innerHTML = data;
      } else {
        console.error(`Elemento com id '${id}' não foi encontrado no DOM.`);
      }
    })
    .catch(error => console.error(`Erro ao carregar ${file}:`, error));
}

// O restante do seu código continua igual.
document.addEventListener("DOMContentLoaded", function () {
  loadComponent("header-placeholder", "/templates/header.html");
  loadComponent("footer-placeholder", "/templates/footer.html");
});

// Sua função toggleMenu (com um pequeno ajuste para evitar um erro de sintaxe)
function toggleMenu() {
    const header = document.querySelector("header");
    if (header) {
      header.classList.toggle("menu-open");
    }
}