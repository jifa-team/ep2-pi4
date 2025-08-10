import React from 'react';

const Footer = () => (
  <footer className="w-full bg-blue-900 text-white py-5 text-center fixed left-0 bottom-0 z-10 text-base shadow-md">
    <p>&copy; {new Date().getFullYear()} JifaOdonto. Todos os direitos reservados.</p>
  </footer>
);

export default Footer;
