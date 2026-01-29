'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { createFounderCallCalendarUrl } from '@/lib/helpers/google-calendar-url';

interface BookMeetingButtonProps {
  variant?:
    | 'default'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  children: React.ReactNode;
}

export function BookMeetingButton({
  variant = 'secondary',
  size = 'lg',
  className,
  children,
}: BookMeetingButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create Google Calendar URL with pre-filled event
    const calendarUrl = createFounderCallCalendarUrl(
      email || undefined,
      name || undefined,
    );

    // Open Google Calendar in new tab
    window.open(calendarUrl, '_blank', 'noopener,noreferrer');

    // Close dialog and reset form
    setIsOpen(false);
    setEmail('');
    setName('');
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant={variant}
        size={size}
        className={className}
      >
        {children}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="flex flex-col items-center gap-3">
              <div className="rounded-sm overflow-hidden">
                <Image
                  src="/assets/svg/logo.svg"
                  alt="Investor Room"
                  width={56}
                  height={56}
                />
              </div>
              <div className="text-center">
                <DialogTitle className="mb-2">
                  Reservar llamada con fundadores
                </DialogTitle>
                <DialogDescription>
                  Introduce tus datos y abriremos Google Calendar para elegir
                  fecha y hora. Google añadirá automáticamente un enlace de Meet
                  al evento.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico *</Label>
              <Input
                id="email"
                type="email"
                placeholder="inversor@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
              <p className="text-xs text-muted-foreground">
                Te añadiremos como asistente al evento del calendario
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Tu nombre (opcional)</Label>
              <Input
                id="name"
                type="text"
                placeholder="Juan Pérez"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <Alert>
              <AlertDescription className="text-sm">
                Después de enviar, Google Calendar se abrirá donde podrás:
                <ul className="mt-2 ml-4 list-disc space-y-1">
                  <li>Elegir la fecha y hora preferida</li>
                  <li>Añadir el evento a tu calendario</li>
                  <li>Obtener automáticamente un enlace de Google Meet</li>
                </ul>
              </AlertDescription>
            </Alert>

            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={!email}>
                Abrir Google Calendar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
