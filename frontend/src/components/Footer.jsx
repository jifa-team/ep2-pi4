import React from 'react';

const Footer = () => (
  <footer className="w-full bg-gray-800 text-white py-6 px-6">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        <div className="social-media mb-4 md:mb-0">
            <p className="mb-2">Siga nossas redes sociais</p>
            <div className="icons flex justify-center md:justify-start space-x-4">
                <a href="#" aria-label="LinkedIn" className="hover:text-blue-400 transition"><i className="fab fa-linkedin fa-lg"></i></a>
                <a href="#" aria-label="WhatsApp" className="hover:text-green-400 transition"><i className="fab fa-whatsapp fa-lg"></i></a>
                <a href="#" aria-label="Instagram" className="hover:text-pink-400 transition"><i className="fab fa-instagram fa-lg"></i></a>
            </div>
        </div>
        <div className="copyright">
            <p>© {new Date().getFullYear()} JIFA Odontologia</p>
            <p className="text-sm text-gray-400">Todos os direitos reservados.</p>
        </div>
    </div>
  </footer>
);

export default Footer;
