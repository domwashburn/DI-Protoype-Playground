import React from 'react';
import styles from './WhatsNewTile.module.css';

// SVG Paths
const svgPaths = {
  pfec3600: "M9 3L8.285 3.6965L12.075 7.5H2V8.5H12.075L8.285 12.2865L9 13L14 8L9 3Z",
};

interface NewsItemProps {
  title: string;
  description: string;
  date: string;
  isLast?: boolean;
}

const NewsItem = ({ title, description, date, isLast = false }: NewsItemProps) => (
  <div className={styles.newsItem} role="button" tabIndex={0}>
    <div className={styles.newsItemInner}>
      {/* Text block */}
      <div className={styles.newsItemTexts}>
        <p className={styles.newsItemTitle}>{title}</p>
        <p className={styles.newsItemDescription}>{description}</p>
      </div>

      {/* Footer: date + arrow */}
      <div className={styles.newsItemFooter}>
        <p className={styles.newsItemDate}>{date}</p>
        <div className={styles.arrowIcon}>
          <svg fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <rect fill="white" fillOpacity="0.01" height="16" width="16" />
            <path
              className={styles.arrowIconPath}
              d={svgPaths.pfec3600}
              fill="var(--cds-icon-secondary)"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

export function WhatsNewTile() {
  const newsItems = [
    {
      title: "Context aware decision assistant",
      description: "Work within with the decision assistant directly in your decision automations",
      date: "June 23, 2025",
    },
    {
      title: "AI assisted decision modeling",
      description: "Generate decision models and assets from your business rules with decision assistant",
      date: "June 23, 2025",
    },
    {
      title: "Introducing Decision Intelligence",
      description: "Decision intelligence is IBM's next generation tool for automating decision making.",
      date: "June 23, 2025",
    },
  ];

  return (
    <div className={styles.tile}>
      {/* Title Bar */}
      <div className={styles.titleBar}>
        <p className={styles.title}>What's new</p>
      </div>

      {/* News items */}
      <div className={styles.content}>
        {newsItems.map((item, index) => (
          <NewsItem
            key={index}
            {...item}
            isLast={index === newsItems.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
