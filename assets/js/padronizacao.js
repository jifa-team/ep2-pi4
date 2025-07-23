function loadComponent(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => document.getElementById(id).innerHTML = data)
        .catch(error => console.error(`Erro ao carregar ${file}:`, error));
}

 //adicionado um eventlistener para aguardar o carregamento do DOM na pagina
document.addEventListener("DOMContentLoaded", function () {
    loadComponent("header-placeholder", "templates/header.html");
    loadComponent("footer-placeholder", "templates/footer.html");
});


function toggleMenu() {
    document.querySelector("header").classList.toggle("menu-open");
} 

//funcao do click no menu toggle estava dando ruim em execução, depois vejo se vai continuar sendo necessária ou se podemos deixar ela fora pra sempre (usada no mobile) 