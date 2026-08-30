import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

import { INITIAL_MENU_ITEMS } from '@/lib/initialData';

export async function GET() {
  try {
    const items = await prisma.menuItem.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (items && items.length > 0) {
      return NextResponse.json(items);
    }
    return NextResponse.json(INITIAL_MENU_ITEMS);
  } catch (error) {
    console.error('Failed to fetch menu items from DB, serving initial menu data:', error);
    return NextResponse.json(INITIAL_MENU_ITEMS);
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, description, price, imageUrl, isAvailable, categoryId } = body;

    if (!name || !price || !categoryId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newItem = await prisma.menuItem.create({
      data: {
        name,
        description,
        price: Number(price),
        imageUrl,
        isAvailable: isAvailable ?? true,
        categoryId,
      },
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Failed to create menu item:', error);
    return NextResponse.json({ error: 'Failed to create menu item' }, { status: 500 });
  }
}
