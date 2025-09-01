import React, { useState, useEffect } from 'react';
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

// Helper function to decode JWT token (simplified for this context)
const decodeJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

function PainelClientePage() {
  const [userName, setUserName] = useState('Carregando...');
  const [profileImage] = useState('/assets/images/painel-cliente/profile-1.jpg');
  const [lastActivities, setLastActivities] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // New states for appointment modal
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [newAppointmentDate, setNewAppointmentDate] = useState('');
  const [newAppointmentTime, setNewAppointmentTime] = useState('');
  const [newAppointmentNotes, setNewAppointmentNotes] = useState('');

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Token de autenticação não encontrado.');
      setLoading(false);
      return;
    }

    const decodedToken = decodeJwt(token);
    if (!decodedToken || !decodedToken.id) {
      setError('Token inválido ou sem ID de usuário.');
      setLoading(false);
      return;
    }

    const userId = decodedToken.id;
    setUserName(decodedToken.email || 'Usuário'); // Using email from token as placeholder for name

    try {
      // Fetch Last Activities
      const activitiesResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/client-panel/atividades/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!activitiesResponse.ok) throw new Error('Falha ao buscar últimas atividades.');
      const activitiesData = await activitiesResponse.json();
      setLastActivities(activitiesData);

      // Fetch Appointments
      const appointmentsResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/client-panel/agendamentos/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!appointmentsResponse.ok) throw new Error('Falha ao buscar agendamentos.');
      const appointmentsData = await appointmentsResponse.json();
      setAppointments(appointmentsData);

      // Fetch Notifications
      const notificationsResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/client-panel/notificacoes/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!notificationsResponse.ok) throw new Error('Falha ao buscar notificações.');
      const notificationsData = await notificationsResponse.json();
      setNotifications(notificationsData);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNewAppointmentSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    const token = localStorage.getItem('token');
    const decodedToken = decodeJwt(token);
    const userId = decodedToken.id;

    if (!userId) {
      setError('ID do usuário não encontrado. Faça login novamente.');
      return;
    }

    const newAppointmentData = {
      userId,
      date: newAppointmentDate,
      time: newAppointmentTime,
      notes: newAppointmentNotes,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/client-panel/agendamentos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newAppointmentData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.erro || 'Erro ao agendar consulta.');
      }

      alert('Consulta agendada com sucesso!');
      setShowAppointmentModal(false);
      setNewAppointmentDate('');
      setNewAppointmentTime('');
      setNewAppointmentNotes('');
      fetchUserData(); // Refresh data after successful appointment

    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <MainContainer>
          <div className="text-center py-8">Carregando dados do painel...</div>
        </MainContainer>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <MainContainer>
          <div className="text-center py-8 text-red-600">Erro: {error}</div>
        </MainContainer>
      </Layout>
    );
  }

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
      <div className="absolute top-20 right-4 z-10">
        <UserProfile userName={userName} profileImage={profileImage} />
      </div>
      <MainContainer>
        {/* Últimas atividades */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <History className="w-5 h-5 text-primary" />
            Suas Últimas Atividades
          </h2>
          <ul className="grid md:grid-cols-3 gap-4">
            {lastActivities.length > 0 ? (
              lastActivities.map((activity, index) => (
                <li key={index} className="bg-card rounded-lg p-4 flex flex-col items-center shadow-sm border">
                  <p className="font-medium text-primary mb-1">{activity.tipo}</p>
                  <p className="text-muted-foreground mb-2">{activity.data ? new Date(activity.data).toLocaleDateString('pt-BR') : 'Não disponível'}</p>
                  {activity.tipo === 'consulta' && <Calendar className="w-8 h-8 text-primary/80" />}
                  {activity.tipo === 'fatura' && <CreditCard className="w-8 h-8 text-primary/80" />}
                  {activity.tipo === 'prescricao' && <Stethoscope className="w-8 h-8 text-primary/80" />}
                </li>
              ))
            ) : (
              <li className="col-span-3 text-center text-gray-500">Nenhuma atividade recente.</li>
            )}
          </ul>
        </section>

        {/* Funcionalidades do Sistema */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <CircleCheck className="w-5 h-5 text-primary" />
              Você Pode
            </h2>
            <Button size="lg" onClick={() => setShowAppointmentModal(true)}>novo agendamento</Button>
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

        {/* Appointment Creation Modal */}
        {showAppointmentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Agendar Nova Consulta</h2>
              <form onSubmit={handleNewAppointmentSubmit} className="space-y-4">
                <div>
                  <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700">Data</label>
                  <input
                    type="date"
                    id="appointmentDate"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={newAppointmentDate}
                    onChange={(e) => setNewAppointmentDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="appointmentTime" className="block text-sm font-medium text-gray-700">Hora</label>
                  <input
                    type="time"
                    id="appointmentTime"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={newAppointmentTime}
                    onChange={(e) => setNewAppointmentTime(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="appointmentNotes" className="block text-sm font-medium text-gray-700">Notas (opcional)</label>
                  <textarea
                    id="appointmentNotes"
                    rows="3"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={newAppointmentNotes}
                    onChange={(e) => setNewAppointmentNotes(e.target.value)}
                  ></textarea>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => setShowAppointmentModal(false)}>Cancelar</Button>
                  <Button type="submit">Agendar</Button>
                </div>
              </form>
            </div>
          </div>
        )}

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
