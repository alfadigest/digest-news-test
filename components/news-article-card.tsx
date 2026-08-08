import { NewsGallery } from "@/components/news-gallery"
import type { NewsArticle } from "@/types/news"

type NewsArticleCardProps = {
  article: NewsArticle
}

export function NewsArticleCard({ article }: NewsArticleCardProps) {
  return (
    <article className="border-b pb-12 last:border-b-0">
      <NewsGallery
        mainImage={article.mainImage}
        images={article.images}
        title={article.title}
      />

      <div className="mt-6 max-w-3xl">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {article.title}
        </h2>

        <div className="mt-5 space-y-4 text-base leading-7 text-muted-foreground">
          {article.paragraphs.map((paragraph, index) => (
            <p key={`${article.id}-${index}`}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  )
}
