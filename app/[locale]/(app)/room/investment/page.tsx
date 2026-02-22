import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { SafeStatus } from '@prisma/client';

import { authOptions } from '@/lib/auth/config';
import { prisma } from '@/lib/api/prisma';
import { formatCurrency } from '@/lib/helpers/formatCurrency';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default async function InvestmentPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/otp');

  const investor = session.investor;
  if (!investor?.approved || !investor?.profileComplete) redirect('/otp');

  const safeDocuments = await prisma.safeDocument.findMany({
    orderBy: { generatedAt: 'desc' },
    where: { investorId: investor.id },
  });

  const totalGenerated = safeDocuments.reduce(
    (sum, doc) => sum + doc.amount,
    0,
  );
  const totalSigned = safeDocuments
    .filter((doc) => doc.status === SafeStatus.SIGNED)
    .reduce((sum, doc) => sum + doc.amount, 0);

  return (
    <div className="space-y-8 xl:space-y-12">
      <div>
        <h2 className="mb-2 font-barlow-condensed text-3xl font-bold uppercase tracking-wide text-foreground md:text-4xl xl:text-5xl">
          Mi inversión
        </h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Tus documentos SAFE y totales de inversión.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-barlow-condensed text-xl font-semibold uppercase tracking-wide md:text-2xl">
            Documentos SAFE
          </CardTitle>
          <CardDescription className="text-sm">
            Tus PDFs SAFE son descargables cuando estén disponibles.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {safeDocuments.length === 0 ? (
            <div className="text-muted-foreground text-sm">
              Aún no hay documentos SAFE.
            </div>
          ) : (
            safeDocuments.map((doc) => (
              <div
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-4"
                key={doc.id}
              >
                <div className="space-y-1">
                  <div className="font-barlow-condensed text-lg font-bold tracking-wide">
                    {formatCurrency(doc.amount)}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Generado {new Date(doc.generatedAt).toLocaleDateString()}
                    {doc.signedAt
                      ? ` • Firmado ${new Date(
                          doc.signedAt,
                        ).toLocaleDateString()}`
                      : ''}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant={
                      doc.status === SafeStatus.SIGNED ? 'default' : 'secondary'
                    }
                  >
                    {doc.status}
                  </Badge>
                  {doc.pdfPath ? (
                    <Button asChild variant="outline">
                      <a
                        href={doc.pdfPath}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Descargar PDF
                      </a>
                    </Button>
                  ) : null}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
