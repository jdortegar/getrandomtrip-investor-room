import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface OtpFormProps {
  email: string;
  error: string | null;
  isLoading: boolean;
  onEmailChange: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function OtpForm({
  email,
  error,
  isLoading,
  onEmailChange,
  onSubmit,
}: OtpFormProps) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="space-y-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          autoFocus
          disabled={isLoading}
          id="email"
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="inversor@ejemplo.com"
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

      <Button className="w-full" disabled={isLoading || !email} type="submit">
        {isLoading ? 'Enviando...' : 'Enviar enlace de acceso'}
      </Button>
    </form>
  );
}
