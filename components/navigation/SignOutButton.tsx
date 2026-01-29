'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SignOutButton() {
  async function handleSignOut() {
    await signOut({ callbackUrl: '/' });
  }

  return (
    <Button onClick={handleSignOut} variant="ghost">
      <LogOut className="mr-2 h-4 w-4" />
      Cerrar sesión
    </Button>
  );
}
