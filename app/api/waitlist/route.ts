import { NextResponse } from 'next/server';
import { z } from 'zod';

import { prisma } from '@/lib/api/prisma';

const bodySchema = z.object({
  email: z.string().email(),
  lastName: z.string().min(1).max(120).optional().or(z.literal('')),
  name: z.string().min(1).max(120).optional().or(z.literal('')),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = bodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 },
      );
    }
    const { email, name, lastName } = parsed.data;
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedName = name?.trim() || null;
    const normalizedLastName = lastName?.trim() || null;

    await prisma.waitlistEntry.upsert({
      create: {
        email: normalizedEmail,
        lastName: normalizedLastName,
        name: normalizedName,
      },
      update: {
        lastName: normalizedLastName,
        name: normalizedName,
      },
      where: { email: normalizedEmail },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Waitlist signup error:', error);
    return NextResponse.json(
      { error: 'Could not join waitlist' },
      { status: 500 },
    );
  }
}
