import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ClinicaContent from '../components/ClinicaContent';

const ClinicaPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <ClinicaContent />
      </main>
      <Footer />
    </div>
  );
};

export default ClinicaPage;
