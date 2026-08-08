import type { NewsArticle } from "@/types/news"

export const news: NewsArticle[] = [
  {
    id: "news-001",
    title: "Новый выпуск дайджеста уже доступен",
    publishedAt: "2026-08-08T10:00:00+03:00",
    mainImage: "/news/placeholder-1.svg",
    images: [
      "/news/placeholder-2.svg",
      "/news/placeholder-3.svg",
      "/news/placeholder-4.svg",
    ],
    paragraphs: [
      "Это демонстрационная новость для первого выпуска ДАЙДЖЕСТ | А-СЕТЬ.",
      "В дальнейшем здесь будут автоматически появляться материалы, полученные из подключенных источников.",
    ],
  },
  {
    id: "news-002",
    title: "Новости будут автоматически объединяться в выпуски",
    publishedAt: "2026-08-07T14:30:00+03:00",
    mainImage: "/news/placeholder-5.svg",
    images: [
      "/news/placeholder-6.svg",
      "/news/placeholder-7.svg",
    ],
    paragraphs: [
      "Дата публикации каждой новости определяет, к какому недельному выпуску она относится.",
      "После завершения недели выпуск автоматически перемещается в архив.",
    ],
  },
  {
    id: "news-003",
    title: "Архив выпусков формируется автоматически",
    publishedAt: "2026-07-30T09:15:00+03:00",
    mainImage: "/news/placeholder-8.svg",
    images: [],
    paragraphs: [
      "Старые новости не удаляются. Они становятся частью соответствующего архивного выпуска.",
      "Это позволит просматривать историю дайджеста за предыдущие недели.",
    ],
  },
]
