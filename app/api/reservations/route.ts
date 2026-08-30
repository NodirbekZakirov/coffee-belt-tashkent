import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { sendTelegramReservationNotification } from '@/lib/telegram';

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const reservations = await prisma.reservation.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(reservations);
  } catch (error) {
    console.error('Failed to fetch reservations:', error);
    return NextResponse.json({ error: 'Failed to fetch reservations' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, guests, date, time, note } = body;

    if (!name || !phone || !guests || !date) {
      return NextResponse.json({ error: 'Missing required reservation fields' }, { status: 400 });
    }

    // Combine date and time
    const bookingDateTime = time ? new Date(`${date}T${time}`) : new Date(date);

    let reservation = null;
    try {
      reservation = await prisma.reservation.create({
        data: {
          name,
          phone,
          guests: Number(guests),
          date: bookingDateTime,
          note: note || null,
          status: 'pending',
        },
      });
    } catch (dbErr) {
      console.error('[Reservations API] Database creation notice (proceeding with notification):', dbErr);
    }

    // Send optional Telegram Notification if BOT token & Chat ID are present in environment variables
    await sendTelegramReservationNotification({
      name: name,
      phone: phone,
      guests: Number(guests),
      date: bookingDateTime,
      note: note || null,
    });

    return NextResponse.json(
      reservation || {
        id: `res-${Date.now()}`,
        name,
        phone,
        guests: Number(guests),
        date: bookingDateTime,
        note,
        status: 'pending',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to submit reservation:', error);
    return NextResponse.json({ error: 'Failed to process reservation' }, { status: 500 });
  }
}
