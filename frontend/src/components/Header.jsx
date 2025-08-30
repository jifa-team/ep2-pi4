import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="w-full bg-white text-gray-800 py-4 px-6 flex items-center justify-between shadow-md">
    <div className="logo">
      <Link to="/">
        <img src="/assets/images/logo-jifa.png" alt="Logo da Clínica" className="h-12" />
      </Link>
    </div>
    
    {/* Ícone do menu para dispositivos móveis */}
    <button className="menu-toggle md:hidden" aria-label="Abrir Menu">
        <i className="fas fa-bars"></i>
    </button> 

    <nav className="hidden md:flex">
        <ul className="flex items-center space-x-6">
            <li><Link to="/" className="hover:text-blue-600 transition">HOME</Link></li>
            <li><Link to="/quem-somos" className="hover:text-blue-600 transition">QUEM SOMOS</Link></li>
            <li><Link to="/clinica" className="hover:text-blue-600 transition">CLÍNICA</Link></li>
            <li><Link to="/painel-cliente" className="hover:text-blue-600 transition">PAINEL DO CLIENTE</Link></li>            
        </ul>
    </nav>  
  </header>
);

export default Header;
