import { NewsArticleCard } from "@/components/news-article-card"
import { news } from "@/lib/news-data"
import { formatIssueRange } from "@/lib/date-format"
import { getCurrentIssue, getWeeklyIssues } from "@/lib/weekly-issues"

const siteName = "ДАЙДЖЕСТ | А-СЕТЬ"

export default function Home() {
  const issues = getWeeklyIssues(news)
  const currentIssue = getCurrentIssue(news)
  const archiveIssues = issues.slice(1)

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-2xl font-bold tracking-tight">{siteName}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Название проекта
          </p>
        </div>
      </header>

      {currentIssue && (
        <>
          <section className="border-b">
            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
              <p className="text-sm font-medium text-muted-foreground">
                Свежий выпуск
              </p>

              <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                {formatIssueRange(
                  currentIssue.startDate,
                  currentIssue.endDate,
                )}
              </p>
            </div>
          </section>

          <section>
            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
              <h1 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Новости выпуска
              </h1>

              <div className="mt-8 space-y-12">
                {currentIssue.articles.map((article) => (
                  <NewsArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {archiveIssues.length > 0 && (
        <section className="border-t">
          <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Архив
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {archiveIssues.map((issue) => (
                <button
                  key={`${issue.year}-${issue.week}`}
                  type="button"
                  className="rounded-xl border p-5 text-left transition-colors hover:bg-muted"
                >
                  <p className="font-semibold">Неделя {issue.week}</p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {formatIssueRange(issue.startDate, issue.endDate)}
                  </p>

                  <p className="mt-3 text-xs text-muted-foreground">
                    {issue.articles.length}{" "}
                    {issue.articles.length === 1 ? "новость" : "новостей"}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="border-t">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="font-semibold">{siteName}</p>

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
