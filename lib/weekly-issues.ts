import type { NewsArticle } from "@/types/news"

export type WeeklyIssue = {
  week: number
  year: number
  startDate: Date
  endDate: Date
  articles: NewsArticle[]
}

function getIsoWeek(date: Date) {
  const target = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  )

  const day = target.getUTCDay() || 7

  target.setUTCDate(target.getUTCDate() + 4 - day)

  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1))

  return {
    week: Math.ceil(
      ((target.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
    ),
    year: target.getUTCFullYear(),
  }
}

function getWeekRange(date: Date) {
  const day = date.getDay() || 7

  const start = new Date(date)
  start.setHours(0, 0, 0, 0)
  start.setDate(date.getDate() - day + 1)

  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  end.setHours(23, 59, 59, 999)

  return {
    startDate: start,
    endDate: end,
  }
}

export function getWeeklyIssues(articles: NewsArticle[]): WeeklyIssue[] {
  const grouped = new Map<string, WeeklyIssue>()

  for (const article of articles) {
    const date = new Date(article.publishedAt)
    const { week, year } = getIsoWeek(date)
    const { startDate, endDate } = getWeekRange(date)

    const key = `${year}-${week}`

    if (!grouped.has(key)) {
      grouped.set(key, {
        week,
        year,
        startDate,
        endDate,
        articles: [],
      })
    }

    grouped.get(key)!.articles.push(article)
  }

  return Array.from(grouped.values()).sort(
    (a, b) => b.startDate.getTime() - a.startDate.getTime(),
  )
}

export function getCurrentIssue(articles: NewsArticle[]) {
  return getWeeklyIssues(articles)[0] ?? null
}
