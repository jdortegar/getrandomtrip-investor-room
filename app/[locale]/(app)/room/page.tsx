import Link from 'next/link';
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
import { prisma } from '@/lib/api/prisma';
import { requireRoomAuth } from '@/lib/auth/requireRoomAuth';
import { formatCurrency } from '@/lib/helpers/formatCurrency';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { pathForLocale } from '@/lib/i18n/pathForLocale';
import type { RoomDictionary } from '@/lib/types/dictionary';

export default async function RoomPage() {
  const { investor, locale } = await requireRoomAuth();
  if (!investor.approved) return null;

  const dict = await getDictionary(locale);
  const s = (dict.room as RoomDictionary).summary;

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
          {s.pageTitle}
        </h2>
        <p className="text-muted-foreground text-sm md:text-base">
          {s.pageSubtitle}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="font-barlow-condensed text-lg font-semibold uppercase tracking-wide">
              {s.totalGenerated}
            </CardTitle>
            <CardDescription className="text-sm">
              {s.totalGeneratedDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="font-barlow-condensed text-2xl font-bold tracking-wide md:text-3xl">
            {formatCurrency(totalGenerated)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-barlow-condensed text-lg font-semibold uppercase tracking-wide">
              {s.totalSigned}
            </CardTitle>
            <CardDescription className="text-sm">
              {s.totalSignedDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="font-barlow-condensed text-2xl font-bold tracking-wide md:text-3xl">
            {formatCurrency(totalSigned)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-barlow-condensed text-lg font-semibold uppercase tracking-wide">
              {s.investmentFiles}
            </CardTitle>
            <CardDescription className="text-sm">
              {s.investmentFilesDescription}
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
            {s.lastSafe}
          </CardTitle>
          <CardDescription className="text-sm">
            {s.lastSafeDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {!latestSafe ? (
            <div className="text-muted-foreground text-sm">
              {s.noSafesYet}
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="font-medium">
                  {formatCurrency(latestSafe.amount)}
                </div>
                <div className="text-muted-foreground text-sm">
                  {s.generatedOn}{' '}
                  {new Date(latestSafe.generatedAt).toLocaleDateString(locale)}
                </div>
              </div>
              <Badge
                variant={
                  latestSafe.status === SafeStatus.SIGNED
                    ? 'default'
                    : 'secondary'
                }
              >
                {latestSafe.status === SafeStatus.SIGNED
                  ? s.statusSigned
                  : s.statusPending}
              </Badge>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button asChild variant="default">
              <Link href={pathForLocale(locale, '/room/files')}>
                {s.viewFiles}
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={pathForLocale(locale, '/room/investment')}>
                {s.myInvestment}
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href={pathForLocale(locale, '/room/helper')}>{s.help}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
