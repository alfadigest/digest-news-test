import "server-only"

import { promises as fs } from "fs"
import path from "path"

import type { NewsArticle } from "@/types/news"

const dataDirectory = path.join(process.cwd(), "data")
const dataFile = path.join(dataDirectory, "news.json")

async function ensureDataFile() {
  await fs.mkdir(dataDirectory, { recursive: true })

  try {
    await fs.access(dataFile)
  } catch {
    await fs.writeFile(dataFile, "[]", "utf8")
  }
}

export async function getNews(): Promise<NewsArticle[]> {
  await ensureDataFile()

  const content = await fs.readFile(dataFile, "utf8")

  return JSON.parse(content) as NewsArticle[]
}

export async function addNews(
  article: NewsArticle,
): Promise<NewsArticle> {
  const articles = await getNews()

  articles.push(article)

  await fs.writeFile(
    dataFile,
    JSON.stringify(articles, null, 2),
    "utf8",
  )

  return article
}