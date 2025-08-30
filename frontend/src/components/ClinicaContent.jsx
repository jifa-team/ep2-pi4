import React from 'react';
import MainContainer from './MainContainer';

const ClinicaContent = () => (
  <MainContainer>
    {/* Seção de Localização */}
    <section className="mb-10">
      <div className="flex items-center gap-2 text-blue-900 text-lg font-semibold">
        <i className="fa-solid fa-location-dot"></i>
        <h2 className="text-xl">Nossa localização</h2>
      </div>
      <div className="mt-4 rounded-xl overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.251328550593!2d-39.300740424952!3d-6.361509162232586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7a31e40475d44ff%3A0xf14da2ef8dfddf!2sR.%20Santos%20Dumont%2C%20100%20-%20Vila%20Cid%C3%A3o%2C%20Iguatu%20-%20CE%2C%2063500-032!5e0!3m2!1spt-BR!2sbr!4v1741692981825!5m2!1spt-BR!2sbr"
          width="100%" height="300" style={{ border: 0 }} allowFullScreen="" loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"></iframe>
        <address className="mt-2 text-gray-700 text-sm">
          <p className="font-semibold">Iguatu-CE</p>
          <p>Rua Santos Dumont, 100 - Centro</p>
        </address>
      </div>
    </section>
    {/* Apresentação da Clínica */}
    <section className="flex flex-wrap gap-8 items-start mb-10">
      <img className="w-80 rounded-xl shadow-lg" src="/assets/images/clinica/apresentacao-clinica.png" alt="Consultório odontológico" />
      <div className="flex-1 min-w-[250px]">
        <h2 className="text-blue-900 text-xl font-bold mb-2">Venha sorrir, venha para a melhor!</h2>
        <p className="text-gray-700 mb-2">
          Nossa clínica odontológica é referência em <strong>qualidade, tecnologia e conforto</strong>.
          Oferecemos um atendimento humanizado e personalizado, em um ambiente moderno e acolhedor.
        </p>
        <p className="text-gray-700 mb-2">
          Contamos com especialistas apaixonados pelo que fazem, prontos para oferecer soluções completas
          em saúde bucal. Do cuidado preventivo a procedimentos avançados, trabalhamos para transformar
          sorrisos com segurança e inovação.
        </p>
        <p className="text-gray-700">
          Agende sua consulta e descubra como podemos cuidar do seu sorriso com profissionalismo e dedicação.
        </p>
      </div>
    </section>
    {/* Seção de Instalações */}
    <section className="mb-10">
      <h2 className="text-blue-900 text-xl font-bold mb-4">CONHEÇA NOSSAS INSTALAÇÕES</h2>
      <div className="flex justify-center">
        <div className="flex gap-5">
          <img className="w-44 h-32 object-cover rounded-lg shadow" src="/assets/images/clinica/img-instalacao-1.jpg" alt="Imagem da clínica 1" />
          <img className="w-44 h-32 object-cover rounded-lg shadow" src="/assets/images/clinica/img-instalacao-2.jpg" alt="Imagem da clínica 2" />
          <img className="w-44 h-32 object-cover rounded-lg shadow" src="/assets/images/clinica/img-instalacao-3.jpg" alt="Imagem da clínica 3" />
        </div>
      </div>
    </section>
    {/* Fale Conosco */}
    <section className="mb-10">
      <h2 className="text-xl font-bold text-blue-900 mb-4">FALE CONOSCO</h2>
      <div className="flex flex-wrap gap-6 justify-center">
        <div className="bg-gray-100 rounded-lg shadow p-6 min-w-[220px] text-center">
          <h3 className="text-blue-900 font-bold mb-2">Contato</h3>
          <i className="fa-brands fa-square-whatsapp mr-2"></i>
          <i className="fa-solid fa-phone"></i>
          <p className="mt-2">(88) 99495-9293</p>
        </div>
        <div className="bg-gray-100 rounded-lg shadow p-6 min-w-[220px] text-center">
          <h3 className="text-blue-900 font-bold mb-2">Horário de Atendimento</h3>
          <i className="fa-solid fa-calendar"></i>
          <p className="mt-2">
            Segunda à Sexta e Feriados: 08:00hs às 19:00hs <br />
            Sábado: 08:00hs às 14:00hs
          </p>
        </div>
        <div className="bg-gray-100 rounded-lg shadow p-6 min-w-[220px] text-center">
          <h3 className="text-blue-900 font-bold mb-2">Endereço</h3>
          <i className="fa-solid fa-location-pin"></i>
          <p className="mt-2">
            Rua Santos Dumont, 100 <br />
            Centro - Iguatu- CE | CEP.: 63500-032
          </p>
        </div>
      </div>
    </section>
    {/* Agendar agora */}
    <section className="bg-blue-50 rounded-xl p-8 text-center">
      <h2 className="text-xl font-bold text-blue-900 mb-2">AGENDE SUA AVALIAÇÃO GRATUITA</h2>
      <p className="text-gray-700">Garanta um sorriso mais saudável com a melhor equipe odontológica. Atendimento personalizado e tecnologia de ponta para cuidar de você.</p>
      <div className="mt-4">
        <button className="bg-blue-900 text-white rounded-md px-8 py-2 font-semibold hover:bg-blue-800 transition">AGENDAR AGORA</button>
      </div>
    </section>
  </MainContainer>
);

export default ClinicaContent;
