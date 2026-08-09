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
          .map((p: unknown) => String(p).trim())
          .filter(Boolean)
      : []

    const images = Array.isArray(body.images)
      ? body.images
          .map((i: unknown) => String(i).trim())
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

    // id здесь нужен только для типа NewsArticle.
    // В Supabase он НЕ используется — UUID создаёт сама база.
    const article: NewsArticle = {
      id: crypto.randomUUID(),
      title,
      publishedAt,
      mainImage,
      images,
      paragraphs,
    }

    const savedArticle = await addNews(article)

    return NextResponse.json(
      {
        success: true,
        article: savedArticle,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("API ERROR:", error)

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Неизвестная ошибка сервера",
      },
      { status: 500 },
    )
  }
}