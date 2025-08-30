import React from 'react';
import Layout from '../components/Layout';
import MainContainer from '../components/MainContainer';

function NotFoundPage() {
  return (
    <Layout>
      <MainContainer>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Página não encontrada</h1>
          <p>A página que você procura não existe.</p>
        </div>
      </MainContainer>
    </Layout>
  );
}

export default NotFoundPage;
