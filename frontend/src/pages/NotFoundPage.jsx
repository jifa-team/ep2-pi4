import React from 'react';
import Layout from '../components/Layout';

function NotFoundPage() {
  return (
    <Layout>
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Página não encontrada</h1>
        <p>A página que você procura não existe.</p>
      </div>
    </Layout>
  );
}

export default NotFoundPage;
