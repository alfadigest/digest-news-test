import Link from "next/link"

import { NewsArticleCard } from "@/components/news-article-card"
import { news } from "@/lib/news-data"
import { formatIssueRange } from "@/lib/date-format"
import { getWeeklyIssues } from "@/lib/weekly-issues"

type ArchivePageProps = {
  params: Promise<{
    year: string
    week: string
  }>
}

export default async function ArchiveIssuePage({
  params,
}: ArchivePageProps) {
  const { year, week } = await params

  const issueYear = Number(year)
  const issueWeek = Number(week)

  const issue = getWeeklyIssues(news).find(
    (item) =>
      item.year === issueYear &&
      item.week === issueWeek,
  )

  if (!issue) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold">
            Выпуск не найден
          </h1>

          <p className="mt-3 text-muted-foreground">
            Такой выпуск дайджеста пока не существует.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex rounded-full border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            ← Вернуться на главную
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight sm:text-2xl"
          >
            ДАЙДЖЕСТ | А-СЕТЬ
          </Link>
        </div>
      </header>

      <section className="border-b">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-muted-foreground">
            Архивный выпуск
          </p>

          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:gap-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {formatIssueRange(
                issue.startDate,
                issue.endDate,
              )}
            </h1>

            <p className="text-sm font-medium text-muted-foreground sm:pb-1">
              Неделя {issue.week}
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Новости выпуска
          </h2>

          <div className="mt-8 space-y-16">
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
          <Link
            href="/"
            className="text-sm font-medium hover:underline"
          >
            ← Вернуться к свежему выпуску
          </Link>

          <p className="mt-6 font-semibold">
            ДАЙДЖЕСТ | А-СЕТЬ
          </p>

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