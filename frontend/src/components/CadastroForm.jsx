import React from 'react';

const CadastroForm = () => {
  return (
    <div className="max-w-lg mx-auto mt-12 bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-blue-900 mb-2">Formulário de Cadastro de Conta</h1>
        <p className="text-gray-600 text-base">Preencha os campos Obrigatórios* para se cadastrar</p>
      </div>
      <form id="registrationForm" className="space-y-5">
        <div id="errorContainer" className="text-red-600 text-sm min-h-[1.2em] mb-2"></div>
        <div>
          <label className="block font-semibold text-blue-900 mb-1">Nome Completo*</label>
          <div className="flex gap-4">
            <input type="text" id="firstName" className="w-1/2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Primeiro Nome" required />
            <input type="text" id="lastName" className="w-1/2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Segundo Nome" required />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block font-semibold text-blue-900 mb-1">Email*</label>
          <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="exemplo@gmail.com" required />
        </div>
        <div>
          <label htmlFor="phone" className="block font-semibold text-blue-900 mb-1">Número de Telefone</label>
          <input type="tel" id="phone" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="+55 (xx) xxxxx-xxxx" />
        </div>
        <div>
          <label htmlFor="cpf" className="block font-semibold text-blue-900 mb-1">CPF*</label>
          <input type="text" id="cpf" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="000.000.000-00" required />
        </div>
        <div>
          <label className="block font-semibold text-blue-900 mb-1">Endereço</label>
          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Rua" />
          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 mt-2" placeholder="Complemento" />
        </div>
        <div className="flex gap-4 mt-2">
          <input type="text" className="w-1/3 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Cidade" />
          <input type="text" className="w-1/3 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Estado" />
          <input type="text" className="w-1/3 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="CEP" />
        </div>
        <div>
          <button type="submit" className="w-full py-2 bg-blue-900 text-white rounded-md font-semibold hover:bg-blue-800 transition">Cadastrar</button>
        </div>
      </form>
    </div>
  );
};

export default CadastroForm;
