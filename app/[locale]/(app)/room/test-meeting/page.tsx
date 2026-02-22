'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function TestMeetingPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('14:00');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/meetings/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: name || undefined,
          preferredDate: preferredDate || undefined,
          preferredTime: preferredTime || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || data.error || 'Failed to create meeting');
        setResult(data);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate default date (tomorrow)
  const getDefaultDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Prueba de integración con Google Calendar</CardTitle>
            <CardDescription>
              Prueba de creación de un evento de calendario con enlace de Google
              Meet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo del inversor *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="investor@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Nombre del inversor (opcional)</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="preferredDate">
                    Fecha preferida (opcional)
                  </Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    min={getDefaultDate()}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredTime">
                    Hora preferida (opcional)
                  </Label>
                  <Input
                    id="preferredTime"
                    type="time"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !email}
              >
                {isLoading ? 'Creando reunión...' : 'Crear reunión'}
              </Button>
            </form>

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {result && (
              <div className="mt-6 space-y-4">
                <Alert>
                  <AlertDescription className="font-semibold">
                    Respuesta:
                  </AlertDescription>
                </Alert>
                <div className="rounded-lg bg-muted p-4">
                  <pre className="overflow-auto text-sm">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>

                {result.meetingLink && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">
                      Enlaces de la reunión:
                    </p>
                    <div className="space-y-2">
                      <div>
                        <Label className="text-xs text-muted-foreground">
                          Google Meet:
                        </Label>
                        <a
                          href={result.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block truncate text-sm text-primary hover:underline"
                        >
                          {result.meetingLink}
                        </a>
                      </div>
                      {result.calendarEventLink && (
                        <div>
                          <Label className="text-xs text-muted-foreground">
                            Evento de calendario:
                          </Label>
                          <a
                            href={result.calendarEventLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block truncate text-sm text-primary hover:underline"
                          >
                            {result.calendarEventLink}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Instrucciones de prueba</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              1. Asegúrate de que las variables de entorno estén configuradas en
              `.env`:
            </p>
            <pre className="mt-2 rounded bg-muted p-2 text-xs">
              {`GOOGLE_CALENDAR_ENABLED=true
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REFRESH_TOKEN=your-refresh-token`}
            </pre>
            <p className="mt-4">
              2. Completa el formulario y haz clic en &quot;Crear reunión&quot;
            </p>
            <p>3. Revisa tu Google Calendar para ver el evento</p>
            <p>4. Revisa la respuesta para el enlace de Meet</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
