

import React from 'react';

function UserProfile({ userName }) {
  return (
    <section className="flex items-center gap-6 mb-8">
      <div className="flex flex-col justify-center">
        <p className="text-muted-foreground">Bem vindo!</p>
        <strong className="text-xl text-primary">{userName}</strong>
      </div>
    </section>
  );
}

export default UserProfile;
