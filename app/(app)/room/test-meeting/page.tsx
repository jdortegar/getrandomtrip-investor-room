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
            <CardTitle>Test Google Calendar API Integration</CardTitle>
            <CardDescription>
              Test creating a calendar event with Google Meet link
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Investor Email *</Label>
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
                <Label htmlFor="name">Investor Name (Optional)</Label>
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
                    Preferred Date (Optional)
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
                    Preferred Time (Optional)
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
                {isLoading ? 'Creating Meeting...' : 'Create Meeting'}
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
                    Response:
                  </AlertDescription>
                </Alert>
                <div className="rounded-lg bg-muted p-4">
                  <pre className="overflow-auto text-sm">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>

                {result.meetingLink && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">Meeting Links:</p>
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
                            Calendar Event:
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
            <CardTitle className="text-lg">Testing Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              1. Make sure your environment variables are set in `.env.local`:
            </p>
            <pre className="mt-2 rounded bg-muted p-2 text-xs">
              {`GOOGLE_CALENDAR_ENABLED=true
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REFRESH_TOKEN=your-refresh-token`}
            </pre>
            <p className="mt-4">
              2. Fill in the form above and click "Create Meeting"
            </p>
            <p>3. Check your Google Calendar to see the event</p>
            <p>4. Check the response for the Meet link</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
