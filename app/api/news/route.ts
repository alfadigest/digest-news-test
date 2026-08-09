import { NextResponse } from "next/server"

import { addNews } from "@/lib/news-store"
import type { NewsArticle } from "@/types/news"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const title = String(body.title ?? "").trim()
    const publishedAt = String(body.publishedAt ?? "").trim()
    const mainImage = String(body.mainImage ?? "").trim()
    const paragraphs = Array.isArray(body.paragraphs)
      ? body.paragraphs
          .map((paragraph: unknown) => String(paragraph).trim())
          .filter(Boolean)
      : []

    const images = Array.isArray(body.images)
      ? body.images
          .map((image: unknown) => String(image).trim())
          .filter(Boolean)
      : []

    if (!title) {
      return NextResponse.json(
        { error: "Не указан заголовок новости" },
        { status: 400 },
      )
    }

    if (!publishedAt) {
      return NextResponse.json(
        { error: "Не указана дата публикации" },
        { status: 400 },
      )
    }

    if (!mainImage) {
      return NextResponse.json(
        { error: "Не указано главное изображение" },
        { status: 400 },
      )
    }

    if (paragraphs.length === 0) {
      return NextResponse.json(
        { error: "Добавьте текст новости" },
        { status: 400 },
      )
    }

    const article: NewsArticle = {
      id: `news-${Date.now()}`,
      title,
      publishedAt,
      mainImage,
      images,
      paragraphs,
    }

    await addNews(article)

    return NextResponse.json({
      success: true,
      article,
    })
 } catch (error) {
  console.error(error)

  return NextResponse.json(
    {
      error:
        error instanceof Error
          ? error.message
          : "Unknown error",
    },
    { status: 500 },
  )
} 
}