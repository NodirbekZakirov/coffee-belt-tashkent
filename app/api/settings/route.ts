import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    let settings = await prisma.siteSettings.findUnique({
      where: { id: 'default' },
    });

    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          id: 'default',
          bannerText: '✨ Попробуйте наш новый фисташковый эклер и спешелти кованый раф!',
          bannerActive: true,
          openingHours: 'Ежедневно 07:30 – 22:00',
          wifiName: 'CoffeeBelt_Guest',
          wifiPassword: 'coffeebelt2026',
          ratingValue: '4.8',
          ratingCount: '95+',
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Failed to fetch settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { bannerText, bannerActive, openingHours, wifiName, wifiPassword, ratingValue, ratingCount } = body;

    const updated = await prisma.siteSettings.upsert({
      where: { id: 'default' },
      update: {
        bannerText,
        bannerActive: Boolean(bannerActive),
        openingHours,
        wifiName,
        wifiPassword,
        ratingValue,
        ratingCount,
      },
      create: {
        id: 'default',
        bannerText,
        bannerActive: Boolean(bannerActive),
        openingHours: openingHours || 'Ежедневно 07:30 – 22:00',
        wifiName: wifiName || 'CoffeeBelt_Guest',
        wifiPassword: wifiPassword || 'coffeebelt2026',
        ratingValue: ratingValue || '4.8',
        ratingCount: ratingCount || '95+',
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Failed to update settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
