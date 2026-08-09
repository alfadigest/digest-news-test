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

  const { data, error } = await supabase
    .from("news")
    .insert({
      slug,
      title: article.title,
      published_at: article.publishedAt,
      main_image: article.mainImage,
      images: article.images ?? [],
      paragraphs: article.paragraphs,
    })
    .select()
    .single()

  if (error) {
    console.error("SUPABASE INSERT ERROR:", error)

    throw new Error(
      [
        `Code: ${error.code ?? "-"}`,
        `Message: ${error.message}`,
        `Details: ${error.details ?? "-"}`,
        `Hint: ${error.hint ?? "-"}`,
      ].join("\n"),
    )
  }

  return {
    id: data.id,
    title: data.title,
    publishedAt: data.published_at,
    mainImage: data.main_image,
    images: data.images ?? [],
    paragraphs: data.paragraphs ?? [],
  }
}