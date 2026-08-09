import "server-only"

import { supabase } from "./supabase"
import type { NewsArticle } from "@/types/news"

export async function getNews(): Promise<NewsArticle[]> {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("published_at", { ascending: false })

  if (error) {
    throw error
  }

  return (data ?? []).map((item) => ({
    id: item.id,
    title: item.title,
    publishedAt: item.published_at,
    mainImage: item.main_image,
    images: item.images ?? [],
    paragraphs: item.paragraphs ?? [],
  }))
}

export async function addNews(
  article: NewsArticle,
): Promise<NewsArticle> {
  const slug =
    article.title
      .toLowerCase()
      .replace(/[^a-zа-я0-9]+/gi, "-")
      .replace(/^-|-$/g, "") +
    "-" +
    Date.now()

  const { error } = await supabase.from("news").insert({
    id: article.id,
    slug,
    title: article.title,
    published_at: article.publishedAt,
    main_image: article.mainImage,
    images: article.images,
    paragraphs: article.paragraphs,
  })

  if (error) {
    throw error
  }

  return article
}