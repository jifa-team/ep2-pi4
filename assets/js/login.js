document.addEventListener('DOMContentLoaded', function() {
    //eventListener vai aguardar o carregamento da página
    const loginForm = document.getElementById('loginForm');
    const cpfInput = document.getElementById('cpf');
    const senhaInput = document.getElementById('password');
    const loginButton = document.getElementById('loginButton');
    const errorContainer = document.getElementById('errorContainer');
    const rememberPasswordCheckbox = document.getElementById('rememberPassword');
    //setando uma const para ser usada na validação a partir do ID de cada elemento carregado do DOM
    
    // checagem pra ver se ja tem credenciais salvas
    const savedCpf = localStorage.getItem('savedCpf'); 
    const savedSenha = localStorage.getItem('savedSenha'); 
    if (savedCpf && savedSenha) {
        cpfInput.value = savedCpf;
        senhaInput.value = savedSenha;
        rememberPasswordCheckbox.checked = true;
    }
    
    //eventListener que aguarda o submit do formulário, ou seja, o clique no botão "Entrar" para tratar a "requisição"
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // caso o usuário tenha feito uma requisição outra vez e tenha disparado a mensagem de erro, essa parte do código vai remover a mensagem de erro caso esteja visível
        errorContainer.classList.remove('visible');
        
        // desabilitar o botão de login, e trocar por "entrando" enquanto é feita a validação dos dados
        loginButton.disabled = true;
        loginButton.textContent = 'Entrando...'; 
        
        // pegando os valores submetidos pelo usuário no form de login, "remeberPassword" vai ser um boolean, pois é um checkbox. 
        const cpf = cpfInput.value.trim(); 
        const senha = senhaInput.value; 
        const rememberPassword = rememberPasswordCheckbox.checked;
        
        // fetch para obter os dados simulados do arquivo dados.json
        fetch('/assets/dados/dados.json')
            .then(response => {
                if (!response.ok) {
                    // se der problema em buscar os dados do json, ele vai parar já aqui.
                    throw new Error('Falha ao buscar dados do usuário'); 
                }
                //caso tudo dê certo ao buscar os dados, ele vai retornar esses dados e podemos seguir com a validação
                return response.json();
            })
            .then(data => {
                // checagem no data, que vem do dados.json, para ver se o cpf e a senha do usuario coincidem
                const user = data.users.find(user => 
                    user.cpf === cpf && user.senha === senha 
                );
                
                if (user) {
                    // vai salvar os valores inputados pelo usuário em cpf e senha, se o checkbox "Lembrar senha" estiver marcado.
                    if (rememberPassword) {
                        localStorage.setItem('savedCpf', cpf); 
                        localStorage.setItem('savedSenha', senha);
                    } else {
                        // se não tiver marcado, vai jogar a informação fora
                        localStorage.removeItem('savedCpf'); 
                        localStorage.removeItem('savedSenha'); 
                    }
                    
                    // se chegou aqui, o login foi bem sucedido, então, deve-se: guardar as informações do usuário e redirecionar ele.
                    console.log('Login bem-sucedido!', user); 
                    
                    // simular uma sessão, guardando as informações do usuario no localStorage
                    localStorage.setItem('currentUser', JSON.stringify({
                        id: user.id,
                        cpf: user.cpf 
                    }));
                    
                    // redirecionar o usuário para a home quando login for feito com sucesso
                    alert(`Login bem-sucedido! Bem-vindo, ${cpf}`);
                    window.location.href = 'home.html';
                } else {
                    // tratamento pra falha no login
                    throw new Error('CPF ou senha inválidos');
                }
            })
            .catch(error => {
                // mostrar ao usuário qual foi o erro
                console.error('Erro de login:', error);
                errorContainer.textContent = error.message;
                errorContainer.classList.add('visible');
            })
            .finally(() => {
                // resetar os botões pro estado normal deles ao fim da execução
                loginButton.disabled = false;
                loginButton.textContent = 'Entrar';
            });
    });
    
    // função para direcionar o usuário para a página de cadastro.html ao clicar em "Criar nova conta".
    const createAccountLink = document.querySelector('.create-account');
    if (createAccountLink) {
        createAccountLink.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = 'cadastro.html';
        });
    }
});