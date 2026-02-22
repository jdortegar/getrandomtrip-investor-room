import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { DocumentType } from '@prisma/client';

import { authOptions } from '@/lib/auth/config';
import { prisma } from '@/lib/api/prisma';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  BYLAWS: 'Bylaws',
  CAP_TABLE: 'Cap table',
  DUE_DILIGENCE: 'Due diligence',
  P_L: 'P&L',
  ROADMAP: 'Roadmap',
  SAFE_TEMPLATE: 'SAFE template',
};

export default async function FilesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/otp');

  const investor = session.investor;
  if (!investor?.approved || !investor?.profileComplete) redirect('/otp');

  const documents = await prisma.document.findMany({
    orderBy: { updatedAt: 'desc' },
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-2 font-barlow-condensed text-3xl font-bold uppercase tracking-wide text-foreground md:text-4xl xl:text-5xl">
          Archivos de inversión
        </h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Ver documentos de la empresa en la aplicación (solo lectura).
        </p>
      </div>

      {documents.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Aún no hay documentos</CardTitle>
            <CardDescription>
              Cuando se suban documentos al data room, aparecerán aquí.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-4">
          {documents.map((doc: any) => (
            <Card key={doc.id}>
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div className="space-y-1">
                  <CardTitle className="font-barlow-condensed text-lg font-semibold uppercase tracking-wide">
                    {doc.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {doc.description ||
                      (doc.type
                        ? DOCUMENT_TYPE_LABELS[doc.type as DocumentType]
                        : '')}
                  </CardDescription>
                </div>
                <Badge variant="secondary">
                  {doc.type
                    ? DOCUMENT_TYPE_LABELS[doc.type as DocumentType]
                    : 'Document'}
                </Badge>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-muted-foreground text-sm">
                  Actualizado {new Date(doc.updatedAt).toLocaleDateString()}
                </div>
                <Button asChild variant="outline">
                  <Link href={`/room/files/${doc.id}`}>Ver</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
