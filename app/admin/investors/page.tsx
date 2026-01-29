import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { prisma } from '@/lib/api/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import dynamicImport from 'next/dynamic';

const ApproveInvestorButton = dynamicImport(
  () =>
    import('@/components/admin/ApproveInvestorButton').then(
      (mod) => mod.ApproveInvestorButton,
    ),
  { ssr: false },
);

export const dynamic = 'force-dynamic';

export default async function AdminInvestorsPage() {
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

  const pending = await prisma.investor.findMany({
    where: { approved: false },
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Pending investors</h1>
        <p className="text-muted-foreground">
          Approve and send access after your call
        </p>
      </div>

      {pending.length === 0 ? (
        <div className="rounded-lg border p-6 text-muted-foreground">
          No pending investors
        </div>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Email</th>
              <th className="py-2">Name</th>
              <th className="py-2">Company</th>
              <th className="py-2">Requested</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {pending.map((inv) => (
              <tr key={inv.id} className="border-b">
                <td className="py-3">{inv.email}</td>
                <td className="py-3">{inv.name || '-'}</td>
                <td className="py-3">{inv.company || '-'}</td>
                <td className="py-3">{inv.createdAt.toLocaleString()}</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <ApproveInvestorButton
                      email={inv.email}
                      onApproved={() => location.reload()}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mt-6">
        <Link href="/" className="text-sm text-primary">
          Back to site
        </Link>
      </div>
    </div>
  );
}
