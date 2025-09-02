

import React from 'react';
import { User, LogOut } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function UserProfile({ userName }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <Card className="w-fit shadow-md">
      <CardContent className="p-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
          <User className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className="text-left">
          <p className="text-sm font-medium leading-none text-primary">{userName}</p>
          <p className="text-xs font-normal text-muted-foreground">Bem-vindo!</p>
        </div>
        <Button variant="ghost" size="icon" onClick={handleLogout} className="ml-2">
          <LogOut className="h-5 w-5 text-muted-foreground" />
        </Button>
      </CardContent>
    </Card>
  );
}

export default UserProfile;
