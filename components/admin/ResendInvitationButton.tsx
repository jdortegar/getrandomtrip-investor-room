'use client';

import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface Props {
  email: string;
}

export function ResendInvitationButton({ email }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  async function handleResend() {
    setIsLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/investor/resend-invitation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data?.error || 'Error reenviando invitación');
      } else {
        setMessage('Invitación reenviada');
        setOpen(false);
        setTimeout(() => window.location.reload(), 1500);
      }
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : 'Error de red');
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(null), 4000);
    }
  }

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="sm">
            Reenviar
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reenviar invitación</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Reenviar el enlace de acceso a <strong>{email}</strong>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button disabled={isLoading} variant="outline">
                Cancelar
              </Button>
            </AlertDialogCancel>
            <Button
              disabled={isLoading}
              onClick={handleResend}
              variant="default"
            >
              {isLoading ? 'Enviando...' : 'Reenviar'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {message && (
        <div className="mt-2 text-center text-sm text-muted-foreground">
          {message}
        </div>
      )}
    </div>
  );
}
