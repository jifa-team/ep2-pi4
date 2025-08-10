import React, { useState } from 'react';

function HomePage() {
  const [rating, setRating] = useState(0);

  const handleLocation = (e) => {
    e.preventDefault();
    alert('Funcionalidade de localização ainda não implementada');
  };

  const handleFeedback = (e) => {
    e.preventDefault();
    alert('A página de feedback ainda não foi construída. Volte em breve!');
  };

  const handleStarClick = (idx) => {
    setRating(idx + 1);
  };

  const handleFaqClick = (e) => {
    e.preventDefault();
    alert('A página com a resposta para esta pergunta ainda não foi construída. Volte em breve!');
  };

  const handleBlogClick = (e) => {
    e.preventDefault();
    alert('Esta página do blog ainda não foi construída. Volte em breve!');
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
    alert('Funcionalidade do perfil do usuário ainda não implementada.');
  };

  return (
    <main className="w-full max-w-7xl mx-auto px-4 py-8 bg-[#f4f4f4] relative min-h-screen grid place-items-center">
      {/* Background */}
      <div className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10" style={{backgroundImage: "url('/assets/images/bg-jifa.png')"}} />

      <div className="w-full grid gap-8">
        {/* Boas-vindas */}
        <section className="flex flex-col items-center text-center mb-10 w-full">
          <div className="relative w-full">
            <img src="/assets/images/home/home-jifa.jpg" alt="Banner da home" className="w-full rounded-xl shadow-lg" />
            <div className="absolute top-5 right-5 flex items-center gap-5 bg-white p-4 rounded-2xl shadow-md">
              <div className="text-right">
                <h1 className="text-black text-lg font-bold m-0">Bem vinda!</h1>
                <p className="text-black text-2xl font-bold m-0">Zezinho</p>
              </div>
              <div className="cursor-pointer" onClick={handleProfileClick}>
                <img src="/assets/images/home/profile-jifa.png" alt="Foto de perfil do usuario" className="w-20 h-20 rounded-full border-2 border-gray-200" />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center w-full mt-8">
            <h2 className="text-[#2B446C] text-3xl md:text-5xl font-bold mb-4 drop-shadow">REALIZE SUA AVALIAÇÃO GRATUITA!</h2>
            <button className="w-full max-w-lg h-20 text-[#2B446C] text-xl md:text-2xl font-bold bg-white border border-black rounded-2xl flex items-center justify-center gap-3 mt-2 hover:bg-gray-200 transition" onClick={handleLocation}>
              <img src="/assets/images/home/localizationicon.png" alt="Icone de localização" className="w-6 h-6" />
              USAR LOCALIZAÇÃO ATUAL
            </button>
          </div>
        </section>

        {/* FAQ e Feedback */}
        <div className="grid md:grid-cols-2 gap-6 mb-6 w-full">
          <section className="flex-1 bg-white rounded-2xl p-6 shadow-lg w-full">
            <h2 className="text-[#2B446C] text-2xl font-bold mb-4">PERGUNTAS FREQUENTES</h2>
            <ul className="space-y-4">
              <li className="bg-gray-50 rounded-xl p-4 shadow cursor-pointer hover:bg-gray-100" onClick={handleFaqClick}>Quais são os principais serviços oferecidos pela clínica?</li>
              <li className="bg-gray-50 rounded-xl p-4 shadow cursor-pointer hover:bg-gray-100" onClick={handleFaqClick}>Como posso agendar uma consulta na clínica?</li>
              <li className="bg-gray-50 rounded-xl p-4 shadow cursor-pointer hover:bg-gray-100" onClick={handleFaqClick}>A clínica aceita plano de saúde/convenio odontológico?</li>
            </ul>
          </section>
          <section className="flex-1 bg-white rounded-2xl p-6 shadow-lg text-center w-full">
            <h2 className="text-[#2B446C] text-2xl font-bold mb-4">Avalie o nosso atendimento e nos ajude a melhorar</h2>
            <div className="flex justify-center gap-2 mb-4">
              {[0,1,2,3,4].map((idx) => (
                <img
                  key={idx}
                  src={rating > idx ? "/assets/images/home/ico-avaliacao-5.png" : "/assets/images/home/ico-avaliacao-1.png"}
                  alt={`Estrela ${idx+1}`}
                  className="w-10 h-10 cursor-pointer"
                  onClick={() => handleStarClick(idx)}
                />
              ))}
            </div>
            <button className="w-full max-w-xs bg-[#8CCCD2] text-[#2B446C] text-xl font-bold py-3 rounded-2xl hover:bg-[#9bc8cc] transition" onClick={handleFeedback}>
              AVALIE AGORA
            </button>
          </section>
        </div>

        {/* Blog */}
        <section className="bg-white rounded-2xl p-6 shadow-lg w-full">
          <h2 className="text-[#010101] text-2xl font-semibold mb-4">Blog</h2>
          <div className="flex flex-col md:flex-row gap-4 mb-4 w-full">
            <img src="/assets/images/home/blog1-jifa.png" alt="Primeira noticia do blog" className="flex-1 rounded-lg shadow cursor-pointer" onClick={handleBlogClick} />
            <img src="/assets/images/home/blog2-jifa.png" alt="Segunda noticia do blog" className="flex-1 rounded-lg shadow cursor-pointer" onClick={handleBlogClick} />
            <img src="/assets/images/home/blog3-jifa.png" alt="Terceira noticia do blog" className="flex-1 rounded-lg shadow cursor-pointer" onClick={handleBlogClick} />
          </div>
          <img src="/assets/images/home/ico-tres-pontos.png" alt="Continuidade da pagina" className="w-6 mx-auto mt-4" />
        </section>
      </div>
    </main>
  );
}

export default HomePage;
