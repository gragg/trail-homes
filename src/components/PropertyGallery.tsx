'use client'

import { useState } from 'react'
import Image from 'next/image'

type GalleryImage = { url: string }

export default function PropertyGallery({ gallery, address }: { gallery: GalleryImage[]; address: string }) {
  const [mainImage, setMainImage] = useState<string>(gallery.length > 0 ? gallery[0].url : '')

  return (
    <section className="property-gallery">
      <div className="gallery-container">
        {mainImage && (
          <div className="gallery-main">
            <Image src={mainImage} alt={address} width={600} height={400} />
          </div>
        )}
        <div className="gallery-thumbnails">
          {gallery.map((img, index) => (
            <Image
              key={index}
              src={img.url}
              alt={`Thumbnail ${index}`}
              width={100}
              height={100}
              onClick={() => setMainImage(img.url)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
