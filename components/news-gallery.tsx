"use client"

import Image from "next/image"
import { useState } from "react"

type NewsGalleryProps = {
  mainImage: string
  images?: string[]
  title: string
}

export function NewsGallery({
  mainImage,
  images = [],
  title,
}: NewsGalleryProps) {
  const allImages = [mainImage, ...images]
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="space-y-3">
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
        <Image
          src={allImages[activeIndex]}
          alt={title}
          fill
          priority={activeIndex === 0}
          sizes="(max-width: 768px) 100vw, 896px"
          className="object-cover"
        />
      </div>

      {allImages.length > 1 && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {allImages.slice(1).map((image, index) => {
            const actualIndex = index + 1

            return (
              <button
                key={image}
                type="button"
                onClick={() => setActiveIndex(actualIndex)}
                className={`relative aspect-video overflow-hidden rounded-xl bg-muted transition-opacity hover:opacity-80 ${
                  activeIndex === actualIndex ? "ring-2 ring-primary" : ""
                }`}
                aria-label={`Показать фотографию ${actualIndex + 1}`}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 33vw, 200px"
                  className="object-cover"
                />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}