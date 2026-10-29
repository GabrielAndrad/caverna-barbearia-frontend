import React, { useState } from 'react'
import './index.scss'
import work1 from '../../../../assets/visual/work-1.png'
import work2 from '../../../../assets/visual/work-2.png'
import work3 from '../../../../assets/visual/work-3.png'
import work4 from '../../../../assets/visual/work-4.png'
import work5 from '../../../../assets/visual/work-5.png'

const works = [work1, work2, work3, work4, work5]

const CarrouselComponent = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const loop = [...works, ...works]

  const closeLightbox = () => setLightboxIndex(null)
  const showPrevious = () => setLightboxIndex((current) => (current === null ? 0 : (current + works.length - 1) % works.length))
  const showNext = () => setLightboxIndex((current) => (current === null ? 0 : (current + 1) % works.length))

  return (
    <section className="portfolio-section">
      <div className="section-heading-row">
        <h3 className="section-title">Trabalhos realizados</h3>
        <span>Galeria</span>
      </div>
      <div className="portfolio-carousel">
        <div className="portfolio-grid">
          {loop.map((image, index) => (
            <img
              key={`${image}-${index}`}
              src={image}
              alt={index < works.length ? `Trabalho realizado ${index + 1}` : ''}
              aria-hidden={index >= works.length}
              onClick={() => {
                if (index < works.length) setLightboxIndex(index)
              }}
            />
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <div className="portfolio-lightbox">
          <button className="portfolio-lightbox__close" type="button" onClick={closeLightbox}>Sair</button>
          <button className="portfolio-lightbox__nav portfolio-lightbox__nav--prev" type="button" aria-label="Foto anterior" onClick={showPrevious}>‹</button>
          <img className="portfolio-lightbox__image" src={works[lightboxIndex]} alt="Trabalho realizado ampliado" />
          <button className="portfolio-lightbox__nav portfolio-lightbox__nav--next" type="button" aria-label="Próxima foto" onClick={showNext}>›</button>
        </div>
      )}
    </section>
  )
}

export default CarrouselComponent
