import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { SafeStatus } from '@prisma/client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { authOptions } from '@/lib/auth/config';
import { prisma } from '@/lib/api/prisma';
import { formatCurrency } from '@/lib/helpers/formatCurrency';
import { getLocaleFromCookies } from '@/lib/i18n/server';
import { pathForLocale } from '@/lib/i18n/pathForLocale';

export default async function RoomPage() {
  const session = await getServerSession(authOptions);
  const locale = await getLocaleFromCookies();
  if (!session) redirect(pathForLocale(locale, '/otp'));

  const investor = session.investor;
  if (!investor?.approved || !investor?.profileComplete)
    redirect(pathForLocale(locale, '/otp'));

  const [latestSafe, signedAggregate, totalAggregate, totalDocuments] =
    await Promise.all([
      prisma.safeDocument.findFirst({
        orderBy: { generatedAt: 'desc' },
        where: { investorId: investor.id },
      }),
      prisma.safeDocument.aggregate({
        _sum: { amount: true },
        where: { investorId: investor.id, status: SafeStatus.SIGNED },
      }),
      prisma.safeDocument.aggregate({
        _sum: { amount: true },
        where: { investorId: investor.id },
      }),
      prisma.document.count(),
    ]);

  const totalGenerated = totalAggregate._sum.amount ?? 0;
  const totalSigned = signedAggregate._sum.amount ?? 0;

  return (
    <div className="space-y-8 xl:space-y-12">
      <div>
        <h2 className="mb-2 font-barlow-condensed text-3xl font-bold uppercase tracking-wide text-foreground md:text-4xl xl:text-5xl">
          Resumen
        </h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Resumen de tu inversión y acceso rápido a recursos clave.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="font-barlow-condensed text-lg font-semibold uppercase tracking-wide">
              Total generado
            </CardTitle>
            <CardDescription className="text-sm">
              Todos los documentos SAFE creados hasta ahora
            </CardDescription>
          </CardHeader>
          <CardContent className="font-barlow-condensed text-2xl font-bold tracking-wide md:text-3xl">
            {formatCurrency(totalGenerated)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-barlow-condensed text-lg font-semibold uppercase tracking-wide">
              Total firmado
            </CardTitle>
            <CardDescription className="text-sm">
              Solo documentos SAFE FIRMADOS
            </CardDescription>
          </CardHeader>
          <CardContent className="font-barlow-condensed text-2xl font-bold tracking-wide md:text-3xl">
            {formatCurrency(totalSigned)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-barlow-condensed text-lg font-semibold uppercase tracking-wide">
              Archivos de inversión
            </CardTitle>
            <CardDescription className="text-sm">
              Documentos del data room de la empresa
            </CardDescription>
          </CardHeader>
          <CardContent className="font-barlow-condensed text-2xl font-bold tracking-wide md:text-3xl">
            {totalDocuments}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-barlow-condensed text-xl font-semibold uppercase tracking-wide md:text-2xl">
            Último SAFE
          </CardTitle>
          <CardDescription className="text-sm">
            El estado de tu último SAFE
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {!latestSafe ? (
            <div className="text-muted-foreground text-sm">
              Aún no hay documentos SAFE. Cuando generes uno, aparecerá aquí.
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="font-medium">
                  {formatCurrency(latestSafe.amount)}
                </div>
                <div className="text-muted-foreground text-sm">
                  Generado{' '}
                  {new Date(latestSafe.generatedAt).toLocaleDateString()}
                </div>
              </div>
              <Badge
                variant={
                  latestSafe.status === SafeStatus.SIGNED
                    ? 'default'
                    : 'secondary'
                }
              >
                {latestSafe.status}
              </Badge>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button asChild variant="default">
              <Link href={pathForLocale(locale, '/room/files')}>Ver archivos</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={pathForLocale(locale, '/room/investment')}>Mi inversión</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href={pathForLocale(locale, '/room/helper')}>Ayuda</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
