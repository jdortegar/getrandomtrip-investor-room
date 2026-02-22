import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth/config';
import { prisma } from '@/lib/api/prisma';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function getViewerSrc(filePath: string) {
  if (filePath.includes('#')) return filePath;
  return `${filePath}#toolbar=0&navpanes=0&scrollbar=0`;
}

export default async function FileViewerPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/otp');

  const investor = session.investor;
  if (!investor?.approved || !investor?.profileComplete) redirect('/otp');

  const document = await prisma.document.findUnique({
    where: { id: params.id },
  });

  if (!document) notFound();

  const watermark = `${investor.email} • ${new Date().toLocaleString()}`;
  const viewerSrc = getViewerSrc(document.filePath);

  return (
    <div className="space-y-6 xl:space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h2 className="font-barlow-condensed text-3xl font-bold uppercase tracking-wide text-foreground md:text-4xl">
            {document.title}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            {document.description || 'Documento de solo lectura'}
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/room/files">Back</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-barlow-condensed text-xl font-semibold uppercase tracking-wide">
            Visor
          </CardTitle>
          <CardDescription className="text-sm">
            Las descargas están deshabilitadas en la interfaz (se aplican
            limitaciones del navegador).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-hidden rounded-lg border">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 grid place-items-center"
            >
              <div className="rotate-[-20deg] text-center text-muted-foreground/20">
                <div className="font-barlow-condensed font-semibold tracking-wide">
                  {watermark}
                </div>
              </div>
            </div>
            <iframe
              className="h-[80vh] w-full"
              src={viewerSrc}
              title={document.title}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
