// Botão "Usar localização atual"
document.querySelector('.location-button').addEventListener('click', function(event) {
    event.preventDefault(); // Impede o redirecionamento
    alert("Funcionalidade de localização ainda não implementada");
});

// Botão "Avalie agora"
document.querySelector('.feedback-button').addEventListener('click', function(event) {
    event.preventDefault(); // Impede o redirecionamento
    alert("A página de feedback ainda não foi construída. Volte em breve!");
});

// Estrelas de avaliação
const stars = document.querySelectorAll('.stars img');
stars.forEach((star, index) => {
    star.addEventListener('click', function(event) {
        event.preventDefault(); // Impede o redirecionamento
        const rating = index + 1;
        stars.forEach((s, i) => {
            if (i <= index) {
                s.src = "/assets/images/home/ico-avaliacao-5.png"; // Estrela preenchida
            } else {
                s.src = "/assets/images/home/ico-avaliacao-1.png"; // Estrela vazia
            }
        });
        // (Opcional) Enviar a pontuação para o servidor
        // fetch('/api/avaliacao', { method: 'POST', body: JSON.stringify({ rating }) });
    });
});

// Perguntas frequentes (sem redirecionamento)
const faqItems = document.querySelectorAll('.faq li');
faqItems.forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault(); // Impede o redirecionamento
        alert("A página com a resposta para esta pergunta ainda não foi construída. Volte em breve!");
    });
});

// Posts do blog (sem redirecionamento)
const blogPosts = document.querySelectorAll('.blog-images-container img');
blogPosts.forEach(post => {
    post.addEventListener('click', function(event) {
        event.preventDefault(); // Impede o redirecionamento
        alert("Esta página do blog ainda não foi construída. Volte em breve!");
    });
});

// Foto do perfil do usuário (sem redirecionamento)
const profileImage = document.querySelector('.profile-image');
profileImage.addEventListener('click', function(event) {
    event.preventDefault(); // Impede o redirecionamento
    alert("Funcionalidade do perfil do usuário ainda não implementada.");
});

// Links do menu de navegação (redirecionam normalmente)
const navLinks = document.querySelectorAll('#header-placeholder a');
navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        // Não impede o redirecionamento para os links do menu
        // Eles funcionarão normalmente
    });
});