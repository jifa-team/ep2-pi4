import React from 'react';
import Layout from '../components/Layout';

function AquisicaoPage() {
  return (
    <Layout>
      <main className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Aquisição de Plano</h1>
        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Como adquirir seu plano?</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Escolha o tipo de plano desejado: Individual, Familiar ou Coletivo.</li>
            <li>Preencha o formulário com seus dados pessoais e informações do plano.</li>
            <li>Revise os dados e confirme a aquisição.</li>
            <li>Após confirmação, você receberá um e-mail com os detalhes do seu plano.</li>
          </ol>
        </section>
        <section className="bg-blue-50 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-3 text-blue-800">Formulário de Aquisição</h2>
          <form className="space-y-4">
            <div>
              <label className="block font-medium mb-1" htmlFor="nome">Nome Completo</label>
              <input
                type="text"
                id="nome"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Digite seu nome"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1" htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="exemplo@email.com"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1" htmlFor="tipoPlano">Tipo de Plano</label>
              <select
                id="tipoPlano"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Selecione</option>
                <option value="individual">Individual</option>
                <option value="familiar">Familiar</option>
                <option value="coletivo">Coletivo</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1" htmlFor="cpf">CPF</label>
              <input
                type="text"
                id="cpf"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="000.000.000-00"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
            >
              Adquirir Plano
            </button>
          </form>
        </section>
      </main>
    </Layout>
  );
}

export default AquisicaoPage;
