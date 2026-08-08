import Link from "next/link"
import { notFound } from "next/navigation"

import { NewsArticleCard } from "@/components/news-article-card"
import { news } from "@/lib/news-data"
import { formatIssueRange } from "@/lib/date-format"
import { getWeeklyIssues } from "@/lib/weekly-issues"

type IssuePageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function IssuePage({ params }: IssuePageProps) {
  const { slug } = await params

  const issues = getWeeklyIssues(news)

  const issue = issues.find(
    (item) => `${item.year}-${item.week}` === slug,
  )

  if (!issue) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
  href="/"
  className="text-sm font-medium text-muted-foreground hover:text-foreground"
>
  ← ДАЙДЖЕСТ | А-СЕТЬ
</Link>

          <p className="mt-8 text-sm font-medium text-muted-foreground">
            Выпуск · Неделя {issue.week}
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {formatIssueRange(issue.startDate, issue.endDate)}
          </h1>
        </div>
      </header>

      <section>
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Новости выпуска
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              {issue.articles.length}{" "}
              {issue.articles.length === 1 ? "новость" : "новостей"}
            </p>
          </div>

          <div className="space-y-12">
            {issue.articles.map((article) => (
              <NewsArticleCard
                key={article.id}
                article={article}
              />
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="font-semibold">ДАЙДЖЕСТ | А-СЕТЬ</p>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span>О проекте</span>
            <span>Контакты</span>
            <span>Правовая информация</span>
            <span>Общая информация</span>
          </div>
        </div>
      </footer>
    </main>
  )
}