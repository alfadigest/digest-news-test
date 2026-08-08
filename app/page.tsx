import { NewsArticleCard } from "@/components/news-article-card"
import { news } from "@/lib/news-data"
import { formatIssueRange } from "@/lib/date-format"
import {
  getArchivedIssues,
  getCurrentIssue,
} from "@/lib/weekly-issues"

const siteName = "ДАЙДЖЕСТ | А-СЕТЬ"

export default function Home() {
  const currentIssue = getCurrentIssue(news)
  const archiveIssues = getArchivedIssues(news)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-xl font-bold tracking-tight sm:text-2xl">
            {siteName}
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Название проекта
          </p>
        </div>
      </header>

      {currentIssue ? (
        <>
          <section className="border-b">
            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
              <p className="text-sm font-medium text-muted-foreground">
                Свежий выпуск
              </p>

              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:gap-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  {formatIssueRange(
                    currentIssue.startDate,
                    currentIssue.endDate,
                  )}
                </h1>

                <p className="text-sm font-medium text-muted-foreground sm:pb-1">
                  Неделя {currentIssue.week}
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
                {currentIssue.articles.map((article) => (
                  <NewsArticleCard
                    key={article.id}
                    article={article}
                  />
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <section>
          <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold">
              Свежий выпуск пока пуст
            </h1>

            <p className="mt-3 text-muted-foreground">
              Добавьте первую новость текущей недели.
            </p>
          </div>
        </section>
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
                  <p className="font-semibold">
                    Неделя {issue.week}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {formatIssueRange(
                      issue.startDate,
                      issue.endDate,
                    )}
                  </p>

                  <p className="mt-3 text-xs text-muted-foreground">
                    {issue.articles.length}{" "}
                    {issue.articles.length === 1
                      ? "новость"
                      : issue.articles.length < 5
                        ? "новости"
                        : "новостей"}
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

          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            Еженедельный дайджест важных новостей и событий.
          </p>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
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