import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { OtpDictionary } from '@/lib/types/dictionary';

interface OtpFormProps {
  dict: OtpDictionary['form'];
  email: string;
  error: string | null;
  isLoading: boolean;
  onEmailChange: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function OtpForm({
  dict,
  email,
  error,
  isLoading,
  onEmailChange,
  onSubmit,
}: OtpFormProps) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="space-y-2">
        <Label
          className="font-barlow"
          htmlFor="email"
        >
          {dict.emailLabel}
        </Label>
        <Input
          autoFocus
          disabled={isLoading}
          id="email"
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder={dict.placeholder}
          required
          type="email"
          value={email}
        />
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button
        className="rounded-lg px-6 py-3 text-base uppercase tracking-wide md:text-lg w-full"
        disabled={isLoading || !email}
        // size="lg"
        type="submit"
        variant="feature"
      >
        {isLoading ? dict.sending : dict.submitButton}
      </Button>
    </form>
  );
}
