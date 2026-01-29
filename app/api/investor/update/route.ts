import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { prisma } from '@/lib/api/prisma';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, phone, company } = body;

    // Validate that at least name is provided
    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    // Find or create investor record
    const investor = await prisma.investor.upsert({
      create: {
        email: session.user.email,
        name: name.trim(),
        phone: phone?.trim() || null,
        company: company?.trim() || null,
        profileComplete: true,
      },
      update: {
        name: name.trim(),
        phone: phone?.trim() || null,
        company: company?.trim() || null,
        profileComplete: true,
      },
      where: { email: session.user.email },
    });

    // Link investor to user if not already linked
    if (session.user.id && !investor.userId) {
      await prisma.investor.update({
        data: { userId: session.user.id },
        where: { id: investor.id },
      });
    }

    return NextResponse.json({
      investor,
      message: 'Profile updated successfully',
    });
  } catch (error) {
    console.error('Error updating investor:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
