import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { SafeStatus } from '@prisma/client';
import { CheckCircle2, Circle, ExternalLink } from 'lucide-react';

import { authOptions } from '@/lib/auth/config';
import { prisma } from '@/lib/api/prisma';
import { getGoogleMeetLink } from '@/lib/constants/meeting';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface ChecklistItem {
  description: string;
  href?: string;
  isComplete: boolean;
  title: string;
}

export default async function HelperPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/otp');

  const investor = session.investor;
  if (!investor?.approved || !investor?.profileComplete) redirect('/otp');

  const docs = await prisma.safeDocument.findMany({
    select: { status: true },
    where: { investorId: investor.id },
  });

  const hasGeneratedSafe = docs.length > 0;
  const hasSignedSafe = docs.some((doc) => doc.status === SafeStatus.SIGNED);

  const checklist: ChecklistItem[] = [
    {
      description:
        'Accede a los documentos del data room que necesitas revisar.',
      href: '/room/files',
      isComplete: false,
      title: 'Revisar archivos de inversión',
    },
    {
      description: 'Crea tu documento SAFE con el monto de inversión previsto.',
      href: '/room/investment',
      isComplete: hasGeneratedSafe,
      title: 'Generar tu SAFE',
    },
    {
      description: 'Completa el proceso de firma para finalizar tu inversión.',
      href: '/room/investment',
      isComplete: hasSignedSafe,
      title: 'Firmar tu SAFE',
    },
    {
      description:
        'Reserva tiempo con los fundadores para discutir preguntas y siguientes pasos.',
      href: getGoogleMeetLink(),
      isComplete: false,
      title: 'Reservar llamada con fundadores',
    },
  ];

  return (
    <div className="space-y-8 xl:space-y-12">
      <div>
        <h2 className="mb-2 font-barlow-condensed text-3xl font-bold uppercase tracking-wide text-foreground md:text-4xl xl:text-5xl">
          Ayuda
        </h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Una lista de verificación para guiar tu proceso de inversión.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-barlow-condensed text-xl font-semibold uppercase tracking-wide md:text-2xl">
            Lista de verificación
          </CardTitle>
          <CardDescription className="text-sm">
            El progreso se calcula a partir del estado de tu SAFE (sin
            seguimiento manual aún).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {checklist.map((item) => {
            const Icon = item.isComplete ? CheckCircle2 : Circle;
            const isExternal = item.href?.startsWith('http');

            return (
              <div
                className="flex flex-wrap items-start justify-between gap-3 rounded-lg border p-4"
                key={item.title}
              >
                <div className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div className="space-y-1">
                    <div className="font-barlow-condensed text-base font-semibold uppercase tracking-wide">
                      {item.title}
                    </div>
                    <div className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </div>
                  </div>
                </div>

                {item.href ? (
                  isExternal ? (
                    <Button asChild variant="outline">
                      <a
                        href={item.href}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Abrir <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  ) : (
                    <Button asChild variant="outline">
                      <Link href={item.href}>Abrir</Link>
                    </Button>
                  )
                ) : null}
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-barlow-condensed text-xl font-semibold uppercase tracking-wide md:text-2xl">
            ¿Necesitas algo?
          </CardTitle>
          <CardDescription className="text-sm">
            Enlaces rápidos para los siguientes pasos comunes.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button asChild variant="default">
            <Link href="/room/files">Ver archivos</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/room/investment">Mi inversión</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
