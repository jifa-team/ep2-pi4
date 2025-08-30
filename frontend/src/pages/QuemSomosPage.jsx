import React from 'react';
import Layout from '../components/Layout';
import MainContainer from '../components/MainContainer';

function QuemSomosPage() {
  return (
    <Layout>
      <MainContainer>
        {/* TODO: Migrar conteúdo de quem-somos.html para cá, integrando estilos de quem-somos.css */}
        <h1>Quem Somos</h1>
        <p>Página "Quem Somos" migrada para React.</p>
      </MainContainer>
    </Layout>
  );
}

export default QuemSomosPage;
