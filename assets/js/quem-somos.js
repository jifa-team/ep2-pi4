// Missão, Visão e Valores
document.querySelectorAll('.mission-button').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Impede o redirecionamento
        const target = button.getAttribute('data-target');
        const text = document.getElementById(target);

        // Alterna a visibilidade do texto
        if (text.style.display === 'block') {
            text.style.display = 'none';
        } else {
            // Fecha todos os textos antes de abrir o clicado
            document.querySelectorAll('.mission-text').forEach(t => {
                t.style.display = 'none';
            });
            text.style.display = 'block';
        }
    });
});

// Vídeo de apresentação
const video = document.querySelector('.video-content video');
video.addEventListener('click', function(event) {
    event.preventDefault(); // Impede o redirecionamento
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
});

// Links do menu de navegação (redirecionam normalmente)
const navLinks = document.querySelectorAll('#header-placeholder a');
navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        // Não impede o redirecionamento para os links do menu
        // Eles funcionarão normalmente
    });
});

// Botões de contato no rodapé (sem redirecionamento)
const contactButtons = document.querySelectorAll('#footer-placeholder .contact-button');
contactButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Impede o redirecionamento
        alert("A página de contato ainda não foi construída. Volte em breve!");
    });
});