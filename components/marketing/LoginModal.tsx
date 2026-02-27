'use client';

import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LoginModalDict {
  description: string;
  passwordPlaceholder: string;
  submitButton: string;
  title: string;
  usernamePlaceholder: string;
}

interface LoginModalProps {
  dict: LoginModalDict;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  open: boolean;
}

/** Fake gate: client-only check so only users who know the code see the real home. Not real auth. */
const GATE_USERNAME = 'admin';
const GATE_PASSWORD = 'randomtrip2026';

export function LoginModal({
  dict,
  onOpenChange,
  onSuccess,
  open,
}: LoginModalProps) {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) return;
    setIsLoading(true);
    setError(null);
    if (
      username.trim() === GATE_USERNAME &&
      password === GATE_PASSWORD
    ) {
      onSuccess();
      onOpenChange(false);
    } else {
      setError('Invalid credentials');
    }
    setIsLoading(false);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setError(null);
      setPassword('');
      setUsername('');
    }
    onOpenChange(next);
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{dict.title}</DialogTitle>
          <DialogDescription>{dict.description}</DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <Input
            autoComplete="username"
            disabled={isLoading}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={dict.usernamePlaceholder}
            required
            type="text"
            value={username}
          />
          <Input
            autoComplete="current-password"
            disabled={isLoading}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={dict.passwordPlaceholder}
            required
            type="password"
            value={password}
          />
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          <Button
            className="w-full font-medium"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? '...' : dict.submitButton}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
