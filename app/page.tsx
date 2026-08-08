const categories = [
  "Все",
  "Мир",
  "Россия",
  "Технологии",
  "Бизнес",
  "Наука",
  "Спорт",
  "Культура",
];

export default function Home() {
  return (
    <div>
      <section className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-medium text-muted-foreground">
              Новости дня
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Главные события
              <br />
              в одном месте
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Anews собирает важные новости из разных источников и помогает
              быстро понять, что происходит прямо сейчас.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category, index) => (
              <button
                key={category}
                type="button"
                className={
                  index === 0
                    ? "shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                    : "shrink-0 rounded-full bg-muted px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
                }
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl border bg-card p-8 sm:p-12">
            <div className="flex min-h-[320px] items-center justify-center text-center">
              <div className="max-w-md">
                <p className="text-lg font-semibold">
                  Новости скоро появятся
                </p>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Здесь будет лента новостей, которую мы подключим на следующем
                  этапе.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}