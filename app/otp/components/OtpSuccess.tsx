import { Button } from '@/components/ui/button';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface OtpSuccessProps {
  email: string;
  cooldown: number;
  canResend: boolean;
  onResend: () => void;
  onUseDifferentEmail: () => void;
}

export function OtpSuccess({
  email,
  cooldown,
  canResend,
  onResend,
  onUseDifferentEmail,
}: OtpSuccessProps) {
  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="font-barlow-condensed text-2xl font-bold uppercase tracking-wide md:text-3xl">
          Revisa tu correo
        </CardTitle>
        <CardDescription className="text-sm md:text-base">
          Hemos enviado un enlace de acceso a <strong>{email}</strong>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-muted p-4 text-center text-sm">
          <p className="text-muted-foreground">
            Haz clic en el enlace del correo para iniciar sesión. El enlace
            expira en 10 minutos.
          </p>
        </div>

        {!canResend && (
          <div className="text-center text-sm text-muted-foreground">
            {cooldown > 0 ? (
              <p>Reenvío disponible en {cooldown} segundos</p>
            ) : (
              <Button
                className="w-full"
                disabled={!canResend}
                onClick={onResend}
                variant="outline"
              >
                Reenviar correo
              </Button>
            )}
          </div>
        )}

        <Button
          className="w-full"
          onClick={onUseDifferentEmail}
          variant="ghost"
        >
          Usar otro correo
        </Button>
      </CardContent>
    </>
  );
}
