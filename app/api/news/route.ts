import { NextResponse } from "next/server"

import { addNews } from "@/lib/news-store"
import type { NewsArticle } from "@/types/news"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const article: NewsArticle = {
      id: crypto.randomUUID(),
      title: body.title,
      publishedAt: body.publishedAt,
      mainImage: body.mainImage,
      images: body.images ?? [],
      paragraphs: body.paragraphs ?? [],
    }

    const saved = await addNews(article)

    return NextResponse.json(saved)
  } catch (error) {
    console.error("API ERROR:", error)

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}