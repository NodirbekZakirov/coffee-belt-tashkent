import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const totalCount = reviews.length;
    const avgRating =
      totalCount > 0
        ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalCount).toFixed(1)
        : '5.0';

    return NextResponse.json({
      reviews,
      avgRating,
      totalCount,
    });
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();

  // REQUIREMENT: Must be logged in via Google to leave a review
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json(
      { error: 'Чтобы оставить отзыв, необходимо войти через Google.' },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { rating, comment } = body;

    const numRating = Number(rating);
    if (!numRating || numRating < 1 || numRating > 5) {
      return NextResponse.json({ error: 'Оценка должна быть от 1 до 5 звезд.' }, { status: 400 });
    }

    if (!comment || comment.trim().length < 3) {
      return NextResponse.json({ error: 'Пожалуйста, напишите краткий комментарий.' }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        userName: session.user.name || 'Гость The Coffee Belt',
        userEmail: session.user.email,
        userImage: session.user.image || null,
        rating: numRating,
        comment: comment.trim(),
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error('Failed to create review:', error);
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }
}
