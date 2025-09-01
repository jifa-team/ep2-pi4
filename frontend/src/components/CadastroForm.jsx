import React, { useState } from 'react';

const CadastroForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [street, setStreet] = useState('');
  const [complement, setComplement] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [cep, setCep] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Basic validation
    if (!firstName || !lastName || !email || !password || !cpf) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      password,
      phone,
      cpf,
      address: {
        street,
        complement,
        city,
        state,
        cep,
      },
    };

    try {
      const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao cadastrar usuário.');
      }

      setSuccessMessage(data.message || 'Usuário cadastrado com sucesso!');
      // Clear form fields
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setPhone('');
      setCpf('');
      setStreet('');
      setComplement('');
      setCity('');
      setState('');
      setCep('');

    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-blue-900 mb-2">Formulário de Cadastro de Conta</h1>
        <p className="text-gray-600 text-base">Preencha os campos Obrigatórios* para se cadastrar</p>
      </div>
      <form id="registrationForm" className="space-y-5" onSubmit={handleSubmit}>
        {errorMessage && <div id="errorContainer" className="text-red-600 text-sm min-h-[1.2em] mb-2">{errorMessage}</div>}
        {successMessage && <div id="successContainer" className="text-green-600 text-sm min-h-[1.2em] mb-2">{successMessage}</div>}
        <div>
          <label className="block font-semibold text-blue-900 mb-1">Nome Completo*</label>
          <div className="flex gap-4">
            <input type="text" id="firstName" className="w-1/2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Primeiro Nome" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" id="lastName" className="w-1/2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Segundo Nome" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
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
