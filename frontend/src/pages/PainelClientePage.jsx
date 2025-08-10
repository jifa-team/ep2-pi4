import React from 'react';

function PainelClientePage() {
  return (
    <main className="max-w-5xl mx-auto py-8 px-4">
      {/* Perfil do Usuário */}
      <section className="flex items-center gap-6 mb-8">
        <div className="flex flex-col justify-center">
          <p className="text-gray-600">Bem vindo!</p>
          <strong className="text-xl text-blue-700">Zezinho</strong>
        </div>
        <img
          className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
          src="/assets/images/painel-cliente/profile-1.jpg"
          alt="foto do perfil do usuário"
        />
      </section>

      {/* Últimas atividades */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <i className="fa-solid fa-clock-rotate-left text-blue-600"></i>
          Suas Últimas Atividades
        </h2>
        <ul className="grid md:grid-cols-3 gap-4">
          <li className="bg-blue-50 rounded-lg p-4 flex flex-col items-center shadow">
            <p className="font-medium text-blue-800 mb-1">Consulta</p>
            <p className="text-gray-600 mb-2">15/02</p>
            <i className="fa-solid fa-calendar text-2xl text-blue-500"></i>
          </li>
          <li className="bg-blue-50 rounded-lg p-4 flex flex-col items-center shadow">
            <p className="font-medium text-blue-800 mb-1">Fatura</p>
            <p className="text-gray-600 mb-2">11/02</p>
            <i className="fa-solid fa-credit-card text-2xl text-blue-500"></i>
          </li>
          <li className="bg-blue-50 rounded-lg p-4 flex flex-col items-center shadow">
            <p className="font-medium text-blue-800 mb-1">Últimas Prescrições</p>
            <p className="text-gray-600 mb-2">02/02</p>
            <i className="fa-solid fa-laptop-medical text-2xl text-blue-500"></i>
          </li>
        </ul>
      </section>

      {/* Funcionalidades do Sistema */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <i className="fa-regular fa-circle-check text-blue-600"></i>
          Você Pode
        </h2>
        <button className="bg-blue-600 text-white px-6 py-2 rounded font-semibold mb-6 hover:bg-blue-700 transition">
          novo agendamento
        </button>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 rounded-full p-4 mb-2">
              <i className="fa-solid fa-calendar text-xl text-blue-700"></i>
            </div>
            <p className="text-gray-700 font-medium">agendamentos</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 rounded-full p-4 mb-2">
              <i className="fa-solid fa-clipboard-list text-xl text-blue-700"></i>
            </div>
            <p className="text-gray-700 font-medium">histórico</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 rounded-full p-4 mb-2">
              <i className="fa-solid fa-laptop-medical text-xl text-blue-700"></i>
            </div>
            <p className="text-gray-700 font-medium">prontuário</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 rounded-full p-4 mb-2">
              <i className="fa-solid fa-notes-medical text-xl text-blue-700"></i>
            </div>
            <p className="text-gray-700 font-medium">tratamentos</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 rounded-full p-4 mb-2">
              <i className="fa-solid fa-credit-card text-xl text-blue-700"></i>
            </div>
            <p className="text-gray-700 font-medium">pagamentos</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 rounded-full p-4 mb-2">
              <i className="fa-solid fa-bell text-xl text-blue-700"></i>
            </div>
            <p className="text-gray-700 font-medium">notificações</p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <i className="fa-regular fa-newspaper text-blue-600"></i>
          Blog
        </h2>
        <div className="flex items-center gap-4">
          <button className="nav-arrow prev-arrow bg-blue-100 p-2 rounded-full" aria-label="Post anterior">
            <i className="fa-solid fa-chevron-left text-blue-700"></i>
          </button>
          <div className="flex gap-4">
            <article className="blog-post w-32 h-32 rounded-lg overflow-hidden shadow">
              <a href="#link-para-post-1">
                <img
                  src="/assets/images/painel-cliente/blog1-jifa.png"
                  alt="Descrição da imagem do blog post 1"
                  className="w-full h-full object-cover"
                />
              </a>
            </article>
            <article className="blog-post w-32 h-32 rounded-lg overflow-hidden shadow">
              <a href="#link-para-post-2">
                <img
                  src="/assets/images/painel-cliente/blog2-jifa.png"
                  alt="Descrição da imagem do blog post 2"
                  className="w-full h-full object-cover"
                />
              </a>
            </article>
            <article className="blog-post w-32 h-32 rounded-lg overflow-hidden shadow">
              <a href="#link-para-post-3">
                <img
                  src="/assets/images/painel-cliente/blog3-jifa.png"
                  alt="Descrição da imagem do blog post 3"
                  className="w-full h-full object-cover"
                />
              </a>
            </article>
          </div>
          <button className="nav-arrow next-arrow bg-blue-100 p-2 rounded-full" aria-label="Próximo post">
            <i className="fa-solid fa-chevron-right text-blue-700"></i>
          </button>
        </div>
      </section>
    </main>
  );
}

export default PainelClientePage;
