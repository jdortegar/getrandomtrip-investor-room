'use client';

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
            <DialogTitle>Book Your Founder Call</DialogTitle>
            <DialogDescription>
              Enter your details and we&apos;ll open Google Calendar where you can
              pick your preferred date and time. Google will automatically add a
              Meet link to the event.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="investor@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
              <p className="text-xs text-muted-foreground">
                We&apos;ll add you as an attendee to the calendar event
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Your Name (Optional)</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <Alert>
              <AlertDescription className="text-sm">
                After submitting, Google Calendar will open where you can:
                <ul className="mt-2 ml-4 list-disc space-y-1">
                  <li>Pick your preferred date and time</li>
                  <li>Add the event to your calendar</li>
                  <li>Get a Google Meet link automatically</li>
                </ul>
              </AlertDescription>
            </Alert>

            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={!email}>
                Open Google Calendar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
