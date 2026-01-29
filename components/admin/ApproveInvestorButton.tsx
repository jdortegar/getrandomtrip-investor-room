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
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface Props {
  email: string;
  onApproved?: () => void;
}

export function ApproveInvestorButton({ email, onApproved }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleApprove() {
    setIsLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/investor/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data?.error || 'Error approving investor');
      } else {
        setMessage('Aprobado y correo enviado');
        if (onApproved) onApproved();
      }
    } catch (err: any) {
      setMessage(err?.message || 'Network error');
    } finally {
      setIsLoading(false);
      // clear message after a while
      setTimeout(() => setMessage(null), 4000);
    }
  }

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="sm">
            Aprobar
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar aprobación</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Aprobar y enviar acceso al inversor <strong>{email}</strong>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="outline">Cancelar</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button onClick={handleApprove} disabled={isLoading}>
                {isLoading ? 'Aprobando...' : 'Aprobar y enviar'}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {message && (
        <div className="mt-2 text-sm text-center text-muted-foreground">
          {message}
        </div>
      )}
    </div>
  );
}
