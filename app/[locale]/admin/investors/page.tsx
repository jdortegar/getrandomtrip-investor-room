import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import dynamicImport from 'next/dynamic';

import { Badge } from '@/components/ui/badge';
import { authOptions } from '@/lib/auth/config';
import { prisma } from '@/lib/api/prisma';
import { pathForLocale } from '@/lib/i18n/pathForLocale';
import { hasLocale } from '@/lib/i18n/dictionaries';

const ApproveInvestorButton = dynamicImport(
  () =>
    import('@/components/admin/ApproveInvestorButton').then(
      (mod) => mod.ApproveInvestorButton,
    ),
  { ssr: false },
);

const ResendInvitationButton = dynamicImport(
  () =>
    import('@/components/admin/ResendInvitationButton').then(
      (mod) => mod.ResendInvitationButton,
    ),
  { ssr: false },
);

export const dynamic = 'force-dynamic';

export default async function AdminInvestorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const session = await getServerSession(authOptions);
  const founders = (process.env.FOUNDER_EMAIL || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  if (
    !session ||
    !session.user?.email ||
    !founders.includes(session.user.email.toLowerCase())
  ) {
    notFound();
  }

  const investors = await prisma.investor.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  function getStatusBadge(investor: any) {
    if (investor.approved) {
      return (
        <Badge variant="default" className="bg-green-600">
          Aprobado
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="bg-yellow-500">
        Pendiente
      </Badge>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Inversores</h1>
        <p className="text-muted-foreground">
          Gestiona el estado de registro y reenvía invitaciones
        </p>
      </div>

      {investors.length === 0 ? (
        <div className="rounded-lg border p-6 text-muted-foreground">
          No hay inversores registrados
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Email</th>
                <th className="py-2">Nombre</th>
                <th className="py-2">Empresa</th>
                <th className="py-2">Estado</th>
                <th className="py-2">Registrado</th>
                <th className="py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {investors.map((inv) => (
                <tr key={inv.id} className="border-b">
                  <td className="py-3">{inv.email}</td>
                  <td className="py-3">{inv.name || '-'}</td>
                  <td className="py-3">{inv.company || '-'}</td>
                  <td className="py-3">{getStatusBadge(inv)}</td>
                  <td className="py-3 text-sm text-muted-foreground">
                    {inv.createdAt.toLocaleString()}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      {!inv.approved && (
                        <ApproveInvestorButton email={inv.email} />
                      )}
                      <ResendInvitationButton email={inv.email} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6">
        <Link
          className="text-sm text-primary"
          href={pathForLocale(locale, '/')}
        >
          Volver al sitio
        </Link>
      </div>
    </div>
  );
}
