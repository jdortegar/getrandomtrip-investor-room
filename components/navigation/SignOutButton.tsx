'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

import { cn } from '@/lib/utils';

interface SignOutButtonProps {
  className?: string;
}

export function SignOutButton({ className }: SignOutButtonProps) {
  async function handleSignOut() {
    await signOut({ callbackUrl: '/' });
  }

  return (
    <button
      className={cn(
        'inline-flex cursor-pointer items-center gap-2 outline-none',
        className,
      )}
      onClick={() => handleSignOut()}
      type="button"
    >
      {/* <LogOut className="h-4 w-4 shrink-0" /> */}
      Cerrar sesión
    </button>
  );
}
