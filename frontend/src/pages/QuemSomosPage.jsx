import React, { useState } from 'react';
import Layout from '../components/Layout';
import MainContainer from '../components/MainContainer';
import styles from '../assets/styles/QuemSomosPage.module.css';

function QuemSomosPage() {
  const [activeTab, setActiveTab] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(prevTab => (prevTab === tab ? null : tab));
  };

  return (
    <Layout>
      <MainContainer>
        {/* Banner */}
        <div className={styles.banner}>
          <img src="/assets/images/quemsomos/quemsomos-jifa.jpg" alt="Banner da JIFA Odontologia" className={styles['banner-image']} />
        </div>

        {/* Seção "Sobre Nós" e "Especialidades" lado a lado */}
        <div className={styles['full-width-section']}>
          <div className={styles.container}>
            <div className={styles['content-wrapper']}>
              {/* Sobre Nós */}
              <section className={styles.about}>
                <h2>JIFA: SORRIA COM CONFIANÇA</h2>
                <p>
                  Na JIFA Odontologia, acreditamos que um sorriso saudável e radiante é a chave para a autoconfiança e o bem-estar. Mais do que uma clínica, somos um time apaixonado por transformar vidas através da odontologia. Combinamos tecnologia de ponta com um atendimento humanizado e acolhedor, para que cada visita seja uma experiência positiva e confortável. Nossa equipe de especialistas está em constante atualização para oferecer os tratamentos mais modernos e eficazes, desde a prevenção e limpeza até procedimentos complexos como implantes e ortodontia. Aqui, você encontra soluções personalizadas para cada necessidade, com a garantia de um sorriso que te fará brilhar.
                </p>
                <p>
                  Entendemos que a saúde bucal vai além da estética. Por isso, na JIFA Odontologia, nos dedicamos a oferecer um cuidado integral, visando a sua saúde e bem-estar geral. Utilizamos materiais de alta qualidade e seguimos rigorosos protocolos de biossegurança para garantir a sua segurança em cada etapa do tratamento. Nosso compromisso é construir uma relação de confiança e parceria com você, para que juntos possamos alcançar os melhores resultados e manter seu sorriso saudável por muitos anos. Agende sua avaliação e descubra como a JIFA Odontologia pode transformar o seu sorriso e a sua vida!
                </p>
              </section>

              {/* Especialidades */}
              <section className={styles.specialties}>
                <h2>ESPECIALIDADES</h2>
                <div className={styles['specialties-grid']}>
                  <ul className={styles['specialties-column']}>
                    <li>
                      <div className={styles['icon-container']}>
                        <img src="/assets/images/quemsomos/ico-especialidades-1.png" alt="Ícone Clínica Geral" className={styles.icon} />
                      </div>
                      <span>Clínica Geral</span>
                    </li>
                    <li>
                      <div className={styles['icon-container']}>
                        <img src="/assets/images/quemsomos/ico-especialidades-2.png" alt="Ícone Implantodontia" className={styles.icon} />
                      </div>
                      <span>Implantodontia</span>
                    </li>
                    <li>
                      <div className={styles['icon-container']}>
                        <img src="/assets/images/quemsomos/ico-especialidades-3.png" alt="Ícone Endodontia" className={styles.icon} />
                      </div>
                      <span>Endodontia</span>
                    </li>
                  </ul>
                  <ul className={styles['specialties-column']}>
                    <li>
                      <div className={styles['icon-container']}>
                        <img src="/assets/images/quemsomos/ico-especialidades-4.png" alt="Ícone Odontopediatria" className={styles.icon} />
                      </div>
                      <span>Odontopediatria</span>
                    </li>
                    <li>
                      <div className={styles['icon-container']}>
                        <img src="/assets/images/quemsomos/ico-especialidades-5.png" alt="Ícone Ortodontia" className={styles.icon} />
                      </div>
                      <span>Ortodontia</span>
                    </li>
                    <li>
                      <div className={styles['icon-container']}>
                        <img src="/assets/images/quemsomos/ico-especialidades-6.png" alt="Ícone Periodontia" className={styles.icon} />
                      </div>
                      <span>Periodontia</span>
                    </li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Seção "Missão, Visão e Valores" e Vídeo */}
        <div className={styles['full-width-section']}>
          <div className={styles.container}>
            <div className={styles['mission-video-wrapper']}>
              {/* Missão, Visão e Valores */}
              <section className={styles.mission}>
                <div className={styles['mission-buttons']}>
                  <div className={styles['mission-item']}>
                    <button className={styles['mission-button']} onClick={() => handleTabClick('missao')}>MISSÃO</button>
                    {activeTab === 'missao' && (
                      <div className={styles['mission-text']} style={{ display: 'block' }}>
                        <p>Oferecer atendimento odontológico de excelência, com foco na saúde e bem-estar dos pacientes.</p>
                      </div>
                    )}
                  </div>
                  <div className={styles['mission-item']}>
                    <button className={styles['mission-button']} onClick={() => handleTabClick('visao')}>VISÃO</button>
                    {activeTab === 'visao' && (
                      <div className={styles['mission-text']} style={{ display: 'block' }}>
                        <p>Ser referência em odontologia, proporcionando sorrisos saudáveis e confiantes.</p>
                      </div>
                    )}
                  </div>
                  <div className={styles['mission-item']}>
                    <button className={styles['mission-button']} onClick={() => handleTabClick('valores')}>VALORES</button>
                    {activeTab === 'valores' && (
                      <div className={styles['mission-text']} style={{ display: 'block' }}>
                        <p>Compromisso, ética, inovação e humanização.</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Vídeo */}
              <div className={styles['video-content']}>
                <video controls width="100%">
                  <source src="/assets/videos/apresentacao.mp4" type="video/mp4" />
                  Seu navegador não suporta o elemento de vídeo.
                </video>
              </div>
            </div>
          </div>
        </div>
      </MainContainer>
    </Layout>
  );
}

export default QuemSomosPage;