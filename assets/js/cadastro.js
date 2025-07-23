document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const requiredFields = [
        document.getElementById('firstName'),
        document.getElementById('lastName'),
        document.getElementById('email'),
        document.getElementById('cpf')
    ];

    const errorContainer = document.getElementById('errorContainer');
    let isValid = true;

    // resetar erros após recarregar a página
    errorContainer.classList.remove('visible');
    errorContainer.textContent = '';

    // verificação dos campos firstName, lastName, email e cpf, para validar se estão populados ao clicar em "cadastrar"
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#dc2626';
        } else {
            field.style.borderColor = '#ddd';
        }
    });

    // se isValid for falso(algum campo não estiver populado, vai solicitar o preenchimento dos campos obrigatórios)
    if (!isValid) {
        errorContainer.textContent = 'Por favor, preencha todos os campos obrigatórios*';
        errorContainer.classList.add('visible');
    } else {
        // se isValid for true, vai redirecionar para a página de cadastro da senha(não implementado nesse MVP)
        errorContainer.textContent = 'Redirecionando para a página de cadastro da sua senha de usuário...';
        errorContainer.style.backgroundColor = '#d1fae5';
        errorContainer.style.color = '#065f46';
        errorContainer.classList.add('visible');

        // Simulando um redirecionamento após 2segundos
        setTimeout(() => {
            window.location.href = '/login.html'; 
        }, 2000);
    }
});