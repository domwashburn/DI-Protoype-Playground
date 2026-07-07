import { useCallback, useEffect, useRef, useState } from 'react';
import { Close, ChevronLeft, ChevronRight, PlayOutline } from '@carbon/icons-react';
import styles from './MediaGallery.module.scss';

/**
 * MediaGallery
 *
 * Props
 * ─────
 * items  MediaItem[]   Array of media items (see shape below)
 * title  string        Accessible label for the gallery section
 *
 * MediaItem shape
 * ───────────────
 * {
 *   id:       string            — unique key
 *   type:     'image' | 'video' — media kind
 *   src:      string            — image URL or video URL
 *   poster?:  string            — video poster image
 *   alt:      string            — image alt / video title
 *   caption?: string            — optional caption shown in lightbox
 * }
 *
 * Playwright-populate contract
 * ─────────────────────────────
 * The gallery reads window.__MEDIA_GALLERY_ITEMS__ at mount time if present.
 * A Playwright script can inject this before navigation or via page.evaluate()
 * to seed the gallery with captured screenshots/recordings.
 *
 * Example inject (Playwright):
 *   await page.evaluate((items) => { window.__MEDIA_GALLERY_ITEMS__ = items; }, items);
 *   await page.reload();
 */

const PLACEHOLDER_ITEMS = [
  { id: 'ph-1', type: 'image', src: 'https://placehold.co/800x600/f4f4f4/8d8d8d?text=Screenshot+1', alt: 'Screenshot 1' },
  { id: 'ph-2', type: 'image', src: 'https://placehold.co/800x600/e0e0e0/525252?text=Screenshot+2', alt: 'Screenshot 2' },
  { id: 'ph-3', type: 'image', src: 'https://placehold.co/800x600/d0e2ff/0043ce?text=Screenshot+3', alt: 'Screenshot 3' },
  { id: 'ph-4', type: 'image', src: 'https://placehold.co/800x600/defbe6/0e6027?text=Screenshot+4', alt: 'Screenshot 4' },
  { id: 'ph-5', type: 'video', src: '', poster: 'https://placehold.co/800x600/393939/ffffff?text=Video+Recording', alt: 'Video recording placeholder' }
];

function useGalleryItems(externalItems) {
  const [items, setItems] = useState(() => {
    if (externalItems?.length) return externalItems;
    if (typeof window !== 'undefined' && window.__MEDIA_GALLERY_ITEMS__?.length) {
      return window.__MEDIA_GALLERY_ITEMS__;
    }
    return PLACEHOLDER_ITEMS;
  });

  useEffect(() => {
    if (externalItems?.length) setItems(externalItems);
  }, [externalItems]);

  return items;
}

export function MediaGallery({ items: externalItems, title = 'Screenshots & Recordings' }) {
  const items = useGalleryItems(externalItems);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const stageThumbRailRef = useRef(null);
  const lightboxThumbRailRef = useRef(null);
  const thumbRailRef = lightboxOpen ? lightboxThumbRailRef : stageThumbRailRef;
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  // ── Sync stage thumbnail rail to activeIndex ──────────────────────────────
  useEffect(() => {
    const rail = stageThumbRailRef.current;
    if (!rail) return;
    const thumb = rail.children[activeIndex];
    if (thumb) {
      thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeIndex]);

  // ── Sync lightbox thumbnail rail to lightboxIndex ─────────────────────────
  useEffect(() => {
    const rail = lightboxThumbRailRef.current;
    if (!rail) return;
    const thumb = rail.children[lightboxIndex];
    if (thumb) {
      thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [lightboxIndex, lightboxOpen]);

  // ── Trap focus inside lightbox ────────────────────────────────────────────
  useEffect(() => {
    if (lightboxOpen) {
      closeButtonRef.current?.focus();
    }
  }, [lightboxOpen]);

  // ── Keyboard navigation ───────────────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i + 1) % items.length);
      if (e.key === 'ArrowLeft')  setLightboxIndex((i) => (i - 1 + items.length) % items.length);
      if (e.key === 'Escape')     setLightboxOpen(false);
    },
    [lightboxOpen, items.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const lightboxItem = items[lightboxIndex];

  return (
    <section className={styles.gallery} aria-label={title}>
      <div className={styles.galleryHeader}>
        <span className={styles.galleryEyebrow}>Gallery</span>
        <h3 className={styles.galleryTitle}>{title}</h3>
        <span className={styles.galleryCount}>{items.length} item{items.length !== 1 ? 's' : ''}</span>
      </div>

      {/* ── Main preview stage (4:3 letterbox) ─────────────────────────── */}
      <div className={styles.stage}>
        <button
          aria-label={`Open ${items[activeIndex]?.alt} in lightbox`}
          className={styles.stageButton}
          onClick={() => openLightbox(activeIndex)}
          type="button"
        >
          <div className={styles.stageFrame}>
            {items[activeIndex]?.type === 'video' ? (
              <div className={styles.stageVideoPoster}>
                <img alt={items[activeIndex].alt} src={items[activeIndex].poster ?? items[activeIndex].src} />
                <span className={styles.playBadge} aria-hidden="true">
                  <PlayOutline size={32} />
                </span>
              </div>
            ) : (
              <img alt={items[activeIndex]?.alt ?? ''} src={items[activeIndex]?.src} />
            )}
          </div>
          {items[activeIndex]?.caption && (
            <p className={styles.stageCaption}>{items[activeIndex].caption}</p>
          )}
        </button>
      </div>

      {/* ── Thumbnail rail ──────────────────────────────────────────────── */}
      <div className={styles.thumbRailWrapper} role="region" aria-label="Thumbnail navigation">
        <div className={styles.thumbRail} ref={stageThumbRailRef}>
          {items.map((item, i) => (
            <button
              aria-label={`View ${item.alt}`}
              aria-pressed={activeIndex === i}
              className={`${styles.thumb} ${activeIndex === i ? styles.thumbActive : ''}`}
              key={item.id}
              onClick={() => setActiveIndex(i)}
              type="button"
            >
              {item.type === 'video' ? (
                <div className={styles.thumbVideoWrap}>
                  <img alt="" src={item.poster ?? item.src} />
                  <span className={styles.thumbPlayBadge} aria-hidden="true">
                    <PlayOutline size={16} />
                  </span>
                </div>
              ) : (
                <img alt="" src={item.src} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Lightbox overlay ────────────────────────────────────────────── */}
      {lightboxOpen && (
        <div
          aria-label="Media lightbox"
          aria-modal="true"
          className={styles.lightbox}
          onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
          role="dialog"
          ref={dialogRef}
        >
          {/* Close — fixed top-right */}
          <button
            aria-label="Close lightbox"
            className={styles.lightboxClose}
            onClick={closeLightbox}
            ref={closeButtonRef}
            type="button"
          >
            <Close size={20} />
          </button>

          {/* Prev / Next — floating side arrows */}
          <button
            aria-label="Previous"
            className={`${styles.lightboxArrow} ${styles.lightboxArrowPrev}`}
            onClick={() => setLightboxIndex((i) => (i - 1 + items.length) % items.length)}
            type="button"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Media — directly on overlay, no frame */}
          <div className={styles.lightboxMedia}>
            {lightboxItem?.type === 'video' ? (
              <video
                autoPlay
                className={styles.lightboxMediaEl}
                controls
                poster={lightboxItem.poster}
                src={lightboxItem.src || undefined}
                title={lightboxItem.alt}
              />
            ) : (
              <img
                alt={lightboxItem?.alt ?? ''}
                className={styles.lightboxMediaEl}
                src={lightboxItem?.src}
              />
            )}
          </div>

          <button
            aria-label="Next"
            className={`${styles.lightboxArrow} ${styles.lightboxArrowNext}`}
            onClick={() => setLightboxIndex((i) => (i + 1) % items.length)}
            type="button"
          >
            <ChevronRight size={24} />
          </button>

          {/* Footer bar — caption + counter + full-width thumb rail */}
          <div className={styles.lightboxFooter}>
            <div className={styles.lightboxMeta}>
              {lightboxItem?.caption
                ? <span className={styles.lightboxCaption}>{lightboxItem.caption}</span>
                : <span className={styles.lightboxLabel}>{lightboxItem?.alt}</span>
              }
              <span className={styles.lightboxCounter}>
                {lightboxIndex + 1}&thinsp;/&thinsp;{items.length}
              </span>
            </div>

            <div className={styles.lightboxThumbRail} ref={lightboxThumbRailRef}>
              {items.map((item, i) => (
                <button
                  aria-label={`View ${item.alt}`}
                  aria-pressed={lightboxIndex === i}
                  className={`${styles.lightboxThumb} ${lightboxIndex === i ? styles.lightboxThumbActive : ''}`}
                  key={item.id}
                  onClick={() => setLightboxIndex(i)}
                  type="button"
                >
                  {item.type === 'video' ? (
                    <div className={styles.thumbVideoWrap}>
                      <img alt="" src={item.poster ?? item.src} />
                      <span className={styles.thumbPlayBadge} aria-hidden="true">
                        <PlayOutline size={14} />
                      </span>
                    </div>
                  ) : (
                    <img alt="" src={item.src} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
