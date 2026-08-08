"use client"

import Link from "next/link"
import { FormEvent, useState } from "react"

export default function NewNewsPage() {
  const [title, setTitle] = useState("")
  const [publishedAt, setPublishedAt] = useState("2026-08-08T10:00")
  const [mainImage, setMainImage] = useState("/news/placeholder-1.svg")
  const [additionalImages, setAdditionalImages] = useState(
    "/news/placeholder-2.svg\n/news/placeholder-3.svg",
  )
  const [text, setText] = useState("")
  const [status, setStatus] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    setIsSaving(true)
    setStatus("Сохраняем...")

    const paragraphs = text
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)

    const images = additionalImages
      .split("\n")
      .map((image) => image.trim())
      .filter(Boolean)

    try {
      const response = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          publishedAt,
          mainImage,
          images,
          paragraphs,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error ?? "Ошибка сохранения")
      }

      setStatus("Новость успешно добавлена")
      setTitle("")
      setText("")
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Не удалось сохранить новость",
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <Link
          href="/"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Вернуться к дайджесту
        </Link>

        <h1 className="mt-6 text-3xl font-bold tracking-tight">
          Добавить новость
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Неделя определяется автоматически по дате публикации.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium"
            >
              Заголовок
            </label>

            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Введите заголовок новости"
              required
              className="w-full rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2"
            />
          </div>

          <div>
            <label
              htmlFor="publishedAt"
              className="mb-2 block text-sm font-medium"
            >
              Дата публикации
            </label>

            <input
              id="publishedAt"
              type="datetime-local"
              value={publishedAt}
              onChange={(event) => setPublishedAt(event.target.value)}
              required
              className="rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2"
            />

            <p className="mt-2 text-xs text-muted-foreground">
              Именно эта дата определит неделю выпуска.
            </p>
          </div>

          <div>
            <label
              htmlFor="mainImage"
              className="mb-2 block text-sm font-medium"
            >
              Главное фото
            </label>

            <input
              id="mainImage"
              type="text"
              value={mainImage}
              onChange={(event) => setMainImage(event.target.value)}
              placeholder="/news/photo.jpg"
              required
              className="w-full rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2"
            />
          </div>

          <div>
            <label
              htmlFor="additionalImages"
              className="mb-2 block text-sm font-medium"
            >
              Дополнительные фото
            </label>

            <textarea
              id="additionalImages"
              value={additionalImages}
              onChange={(event) =>
                setAdditionalImages(event.target.value)
              }
              rows={4}
              placeholder={"/news/photo-2.jpg\n/news/photo-3.jpg"}
              className="w-full rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2"
            />

            <p className="mt-2 text-xs text-muted-foreground">
              Каждое изображение указывайте с новой строки.
            </p>
          </div>

          <div>
            <label
              htmlFor="text"
              className="mb-2 block text-sm font-medium"
            >
              Текст новости
            </label>

            <textarea
              id="text"
              value={text}
              onChange={(event) => setText(event.target.value)}
              rows={10}
              placeholder={"Первый абзац...\n\nВторой абзац..."}
              required
              className="w-full rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2"
            />

            <p className="mt-2 text-xs text-muted-foreground">
              Разделяйте абзацы пустой строкой.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-xl bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-50"
            >
              {isSaving ? "Сохраняем..." : "Добавить новость"}
            </button>

            {status && (
              <p className="text-sm text-muted-foreground">
                {status}
              </p>
            )}
          </div>
        </form>
      </div>
    </main>
  )
}