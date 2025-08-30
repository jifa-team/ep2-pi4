import React from 'react';

const LoginForm = () => {
  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-blue-900 mb-2">Entre para acessar a sua conta</h1>
        <p className="text-gray-600 text-base">Faça login usando o seu CPF e Senha cadastrada ou com o seu serviço de e-mail.</p>
      </div>
      <form id="loginForm" className="space-y-5">
        <div id="errorContainer" className="text-red-600 text-sm min-h-[1.2em] mb-2"></div>
        <div>
          <label htmlFor="cpf" className="block font-semibold text-blue-900 mb-1">CPF</label>
          <input type="text" id="cpf" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="000.000.000-00" required />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="font-semibold text-blue-900">Senha</label>
            <a href="#" className="text-sm text-blue-600 hover:underline">Esqueceu sua senha?</a>
          </div>
          <input type="password" id="password" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300" required />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input type="checkbox" id="rememberPassword" className="mr-2" />
            <label htmlFor="rememberPassword" className="text-sm text-gray-700">Lembrar senha</label>
          </div>
          <a href="/views/cadastro.html" className="text-sm text-blue-900 hover:underline">Criar nova conta</a>
        </div>
        <div>
          <button type="submit" id="loginButton" className="w-full py-2 bg-blue-900 text-white rounded-md font-semibold hover:bg-blue-800 transition">Entrar</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
