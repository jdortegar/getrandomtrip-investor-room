import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import type { OtpDictionary } from '@/lib/types/dictionary';

interface OtpSuccessProps {
  canResend: boolean;
  cooldown: number;
  dict: OtpDictionary['success'];
  email: string;
  onResend: () => void;
  onUseDifferentEmail: () => void;
}

export function OtpSuccess({
  canResend,
  cooldown,
  dict,
  email,
  onResend,
  onUseDifferentEmail,
}: OtpSuccessProps) {
  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="font-barlow-condensed text-2xl font-bold uppercase tracking-wide md:text-3xl">
          {dict.title}
        </CardTitle>
        <CardDescription className="font-barlow text-sm md:text-base">
          {dict.sentTo} <strong>{email}</strong>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="font-barlow rounded-lg bg-muted p-4 text-center text-sm">
          <p className="text-muted-foreground">{dict.instruction}</p>
        </div>

        {!canResend && (
          <div className="font-barlow text-center text-sm text-muted-foreground">
            {cooldown > 0 ? (
              <p>{dict.resendIn.replace('{0}', String(cooldown))}</p>
            ) : (
              <Button
                className="w-full font-barlow-condensed"
                disabled={!canResend}
                onClick={onResend}
                variant="outline"
              >
                {dict.resendButton}
              </Button>
            )}
          </div>
        )}

        <Button
          className="w-full font-barlow-condensed"
          onClick={onUseDifferentEmail}
          variant="ghost"
        >
          {dict.useDifferentEmail}
        </Button>
      </CardContent>
    </>
  );
}
