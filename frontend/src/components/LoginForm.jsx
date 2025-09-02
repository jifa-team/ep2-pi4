import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState(''); // Changed from cpf to email as per API
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao fazer login.');
      }

      localStorage.setItem('token', data.data.token);
      // Assuming the API returns user ID or some identifier in the token payload
      // For now, let's just redirect. In a real app, you'd decode the token or fetch user data.
      navigate('/painel-cliente');

    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-blue-900 mb-2">Entre para acessar a sua conta</h1>
        <p className="text-gray-600 text-base">Faça login usando o seu CPF e Senha cadastrada ou com o seu serviço de e-mail.</p>
      </div>
      <form id="loginForm" className="space-y-5" onSubmit={handleSubmit}>
        {errorMessage && <div id="errorContainer" className="text-red-600 text-sm min-h-[1.2em] mb-2">{errorMessage}</div>}
        <div>
          <label htmlFor="email" className="block font-semibold text-blue-900 mb-1">Email</label>
          <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="seu@email.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="font-semibold text-blue-900">Senha</label>
            <a href="#" className="text-sm text-blue-600 hover:underline">Esqueceu sua senha?</a>
          </div>
          <input type="password" id="password" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Digite sua senha" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input type="checkbox" id="rememberPassword" className="mr-2" />
            <label htmlFor="rememberPassword" className="text-sm text-gray-700">Lembrar senha</label>
          </div>
          <Link to="/cadastro" className="text-sm text-blue-900 hover:underline">Criar nova conta</Link>
        </div>
        <div>
          <button type="submit" id="loginButton" className="w-full py-2 bg-blue-900 text-white rounded-md font-semibold hover:bg-blue-800 transition">Entrar</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
