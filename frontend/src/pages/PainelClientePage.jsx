import React, { useState } from 'react';
import Layout from '../components/Layout';
import MainContainer from '../components/MainContainer';
import UserProfile from '../components/UserProfile'; // Importa o novo componente
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  History,
  Calendar,
  CreditCard,
  Stethoscope,
  CircleCheck,
  ClipboardList,
  NotebookText,
  Bell,
  Newspaper,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

function PainelClientePage() {
  // Simula o estado de login e dados do usuário
  const [isLoggedIn] = useState(true); // TODO: Integrar com o sistema de autenticação real para gerenciar o estado de login
  // Altere para false para testar o comportamento de não logado
  const [userName] = useState('Zezinho');
  const [profileImage] = useState('/assets/images/painel-cliente/profile-1.jpg');

  const features = [
    { icon: Calendar, label: 'agendamentos' },
    { icon: ClipboardList, label: 'histórico' },
    { icon: Stethoscope, label: 'prontuário' },
    { icon: NotebookText, label: 'tratamentos' },
    { icon: CreditCard, label: 'pagamentos' },
    { icon: Bell, label: 'notificações' },
  ];

  return (
    <Layout>
      {/* Perfil do Usuário - Renderizado condicionalmente e posicionado absolutamente */}
      {isLoggedIn && (
        <div className="absolute top-4 right-4 z-10"> {/* Adicionei z-10 para garantir que fique acima de outros elementos */}
          <UserProfile userName={userName} profileImage={profileImage} />
        </div>
      )}
      <MainContainer>
        {/* Últimas atividades */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <History className="w-5 h-5 text-primary" />
            Suas Últimas Atividades
          </h2>
          <ul className="grid md:grid-cols-3 gap-4">
            <li className="bg-card rounded-lg p-4 flex flex-col items-center shadow-sm border">
              <p className="font-medium text-primary mb-1">Consulta</p>
              <p className="text-muted-foreground mb-2">15/02</p>
              <Calendar className="w-8 h-8 text-primary/80" />
            </li>
            <li className="bg-card rounded-lg p-4 flex flex-col items-center shadow-sm border">
              <p className="font-medium text-primary mb-1">Fatura</p>
              <p className="text-muted-foreground mb-2">11/02</p>
              <CreditCard className="w-8 h-8 text-primary/80" />
            </li>
            <li className="bg-card rounded-lg p-4 flex flex-col items-center shadow-sm border">
              <p className="font-medium text-primary mb-1">Últimas Prescrições</p>
              <p className="text-muted-foreground mb-2">02/02</p>
              <Stethoscope className="w-8 h-8 text-primary/80" />
            </li>
          </ul>
        </section>

        {/* Funcionalidades do Sistema */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <CircleCheck className="w-5 h-5 text-primary" />
              Você Pode
            </h2>
            <Button size="lg">novo agendamento</Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <Card key={index} className="hover:border-primary/80 transition-colors cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <feature.icon className="w-8 h-8 mb-2 text-primary/90" />
                  <p className="text-foreground font-medium text-center">{feature.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Blog Posts */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-primary" />
            Blog
          </h2>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" aria-label="Post anterior">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex-grow grid grid-cols-3 gap-4">
              <article className="w-full h-32 rounded-lg overflow-hidden shadow-md">
                <a href="#link-para-post-1">
                  <img
                    src="/assets/images/painel-cliente/blog1-jifa.png"
                    alt="Descrição da imagem do blog post 1"
                    className="w-full h-full object-cover"
                  />
                </a>
              </article>
              <article className="w-full h-32 rounded-lg overflow-hidden shadow-md">
                <a href="#link-para-post-2">
                  <img
                    src="/assets/images/painel-cliente/blog2-jifa.png"
                    alt="Descrição da imagem do blog post 2"
                    className="w-full h-full object-cover"
                  />
                </a>
              </article>
              <article className="w-full h-32 rounded-lg overflow-hidden shadow-md">
                <a href="#link-para-post-3">
                  <img
                    src="/assets/images/painel-cliente/blog3-jifa.png"
                    alt="Descrição da imagem do blog post 3"
                    className="w-full h-full object-cover"
                  />
                </a>
              </article>
            </div>
            <Button variant="outline" size="icon" aria-label="Próximo post">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </section>
      </MainContainer>
    </Layout>
  );
}

export default PainelClientePage;
