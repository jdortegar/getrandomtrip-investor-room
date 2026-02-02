import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { prisma } from '@/lib/api/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const investor = await prisma.investor.findUnique({
      where: { email: session.user.email },
    });

    if (!investor) {
      return NextResponse.json(
        { error: 'Investor not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ investor });
  } catch (error) {
    console.error('Error fetching investor:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
