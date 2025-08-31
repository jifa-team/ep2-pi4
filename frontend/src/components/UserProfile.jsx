

import React from 'react';

function UserProfile({ userName, profileImage }) {
  return (
    <section className="flex items-center gap-6 mb-8 ml-auto">
      <div className="flex flex-col justify-center">
        <p className="text-muted-foreground">Bem vindo!</p>
        <strong className="text-xl text-primary">{userName}</strong>
      </div>
      <img
        className="w-20 h-20 rounded-full object-cover border-2 border-primary"
        src={profileImage}
        alt="foto do perfil do usuário"
      />
    </section>
  );
}

export default UserProfile;
