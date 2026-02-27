'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

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

/**
 * Submits login via a full-page form POST so the browser receives Set-Cookie
 * from the redirect response. Fixes cookie not being set when using signIn()
 * with redirect: false on some hosts (e.g. Netlify).
 */
function submitLoginForm(
  username: string,
  password: string,
  locale: Locale
): void {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = '/api/auth/callback/credentials';
  form.style.display = 'none';

  const callbackUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${pathForLocale(locale, '/')}`
      : pathForLocale(locale, '/');

  const inputs: [string, string][] = [
    ['callbackUrl', callbackUrl],
    ['password', password],
    ['username', username],
  ];

  inputs.forEach(([name, value]) => {
    const input = document.createElement('input');
    input.name = name;
    input.type = 'hidden';
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);

  fetch('/api/auth/csrf')
    .then((res) => res.json())
    .then((data: { csrfToken?: string }) => {
      const csrf = document.createElement('input');
      csrf.name = 'csrfToken';
      csrf.type = 'hidden';
      csrf.value = data.csrfToken ?? '';
      form.appendChild(csrf);
      form.submit();
    })
    .catch(() => {
      document.body.removeChild(form);
    });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) return;
    setIsLoading(true);
    setError(null);
    try {
      // Validate first so we can show wrong-password in the modal
      const result = await signIn('credentials', {
        callbackUrl: pathForLocale(locale, '/'),
        password: password.trim(),
        redirect: false,
        username: username.trim(),
      });
      if (result?.error) {
        setError(result.error);
        return;
      }
      if (!result?.ok) {
        setError('Something went wrong');
        return;
      }
      // Cookie may not be set from fetch on Netlify; full-page form POST sets it
      onOpenChange(false);
      submitLoginForm(username.trim(), password, locale);
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
