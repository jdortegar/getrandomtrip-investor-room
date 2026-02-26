'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { pathForLocale } from '@/lib/i18n/pathForLocale';
import type { Locale } from '@/lib/i18n/config';

interface LoginModalDict {
  description: string;
  passwordPlaceholder: string;
  submitButton: string;
  title: string;
  usernamePlaceholder: string;
}

interface LoginModalProps {
  dict: LoginModalDict;
  locale: Locale;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

export function LoginModal({
  dict,
  locale,
  onOpenChange,
  open,
}: LoginModalProps) {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await signIn('credentials', {
        callbackUrl: pathForLocale(locale, '/'),
        password: password.trim(),
        redirect: false,
        username: username.trim(),
      });
      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        onOpenChange(false);
        router.push(pathForLocale(locale, '/'));
        router.refresh();
      }
    } catch {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
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
