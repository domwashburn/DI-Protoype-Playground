import { ReactNode, MouseEvent } from "react";
import { Tile, ClickableTile, OverflowMenu, OverflowMenuItem } from "@carbon/react";
import styles from "./Card.module.css";
import svgPaths from "../../imports/svg-764ter8l8r";

export interface CardMenuItem {
  label: string;
  onClick: () => void;
  isDanger?: boolean;
  isDivider?: boolean;
}

export interface CardProps {
  /** Card title */
  title: string;
  /** Resource type subtitle */
  resourceType?: string;
  /** Card description text */
  description?: string;
  /** Provider name */
  provider?: string;
  /** Type value */
  type?: string;
  /** Card variant: "standard" or "ai-generated" */
  variant?: "standard" | "ai-generated";
  /** Click handler for the card */
  onClick?: () => void;
  /** Click handler for overflow menu (deprecated - use menuItems instead) */
  onMenuClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Menu items for overflow menu */
  menuItems?: CardMenuItem[];
  /** Custom class name */
  className?: string;
  /** Custom children - if provided, overrides default card content */
  children?: ReactNode;
}

/**
 * Card - Modular card component with two variants
 * 
 * Variants:
 * - "standard": White background, gray border, standard shadow
 * - "ai-generated": Gradient background, blue border, blue shadow with glow
 * 
 * Can be used standalone or within CardGrid/CardLayoutTemplate
 */
export function Card({
  title,
  resourceType,
  description,
  provider,
  type,
  variant = "standard",
  onClick,
  onMenuClick,
  menuItems,
  className = "",
  children
}: CardProps) {
  const cardClasses = `${styles.card} ${styles[variant]} ${className}`.trim();
  const TileComponent = onClick ? ClickableTile : Tile;

  return (
    <TileComponent
      className={cardClasses}
      onClick={onClick ? () => onClick() : undefined}
    >
      {variant === "ai-generated" && <div className={styles.aiBackgroundLayer} />}
      {variant === "ai-generated" && <div className={styles.aiBorder} />}
      {variant === "ai-generated" && <div className={styles.aiShadow} />}
      <div className={styles.cardInner}>
        {children ?? (
          <>
            <CardHeader
              title={title}
              resourceType={resourceType}
              onMenuClick={onMenuClick}
              menuItems={menuItems}
            />
            <CardContent description={description} />
            <CardFooter provider={provider} type={type} />
          </>
        )}
      </div>
    </TileComponent>
  );
}

/**
 * CardHeader - Header section with title, resource type, and overflow menu
 */
export interface CardHeaderProps {
  title?: string;
  resourceType?: string;
  onMenuClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  menuItems?: CardMenuItem[];
  children?: ReactNode;
  className?: string;
}

export function CardHeader({ 
  title, 
  resourceType, 
  onMenuClick,
  menuItems,
  children, 
  className = "" 
}: CardHeaderProps) {
  if (children) {
    return <div className={`${styles.cardHeader} ${className}`.trim()}>{children}</div>;
  }

  // Determine which overflow menu pattern to use
  const hasLegacyMenu = onMenuClick && !menuItems;
  const hasMenuItems = menuItems && menuItems.length > 0;

  return (
    <div className={`${styles.cardHeader} ${className}`.trim()}>
      <div className={styles.headerContent}>
        {title && <h3 className={styles.cardTitle}>{title}</h3>}
        {resourceType && <p className={styles.cardResourceType}>{resourceType}</p>}
      </div>
      
      {/* Legacy overflow menu button - for backwards compatibility */}
      {hasLegacyMenu && (
        <button 
          className={styles.overflowMenuButton}
          onClick={onMenuClick}
          type="button"
          aria-label="Card actions"
        >
          <svg 
            className={styles.overflowMenuIcon} 
            fill="none" 
            viewBox="0 0 16 16"
          >
            <rect fill="white" fillOpacity="0.01" height="16" width="16" />
            <g>
              <path d={svgPaths.p3bcaf400} fill="currentColor" />
              <path d={svgPaths.p3af0dbf2} fill="currentColor" />
              <path d={svgPaths.p2dfee680} fill="currentColor" />
            </g>
          </svg>
        </button>
      )}
      
      {/* Carbon overflow menu with menu items */}
      {hasMenuItems && (() => {
        /* Convert isDivider separators into hasDivider flags on the following item */
        const processed: Array<{ label: string; onClick: () => void; isDanger?: boolean; hasDivider?: boolean }> = [];
        let pendingDivider = false;
        for (const item of menuItems) {
          if (item.isDivider) {
            pendingDivider = true;
          } else {
            processed.push({ label: item.label, onClick: item.onClick, isDanger: item.isDanger, hasDivider: pendingDivider });
            pendingDivider = false;
          }
        }
        return (
          <div className={styles.carbonOverflowMenu} onClick={(e) => e.stopPropagation()}>
            <OverflowMenu
              size="sm"
              aria-label="Card actions"
            >
              {processed.map((item, index) => (
                <OverflowMenuItem
                  key={index}
                  itemText={item.label}
                  onClick={item.onClick}
                  isDelete={item.isDanger}
                  hasDivider={item.hasDivider}
                />
              ))}
            </OverflowMenu>
          </div>
        );
      })()}
    </div>
  );
}

/**
 * CardContent - Description/content area
 */
export interface CardContentProps {
  description?: string;
  children?: ReactNode;
  className?: string;
}

export function CardContent({ 
  description, 
  children, 
  className = "" 
}: CardContentProps) {
  if (children) {
    return <div className={`${styles.cardContent} ${className}`.trim()}>{children}</div>;
  }

  return (
    <div className={`${styles.cardContent} ${className}`.trim()}>
      {description && <p className={styles.cardDescription}>{description}</p>}
    </div>
  );
}

/**
 * CardFooter - Bottom section with Provider and Type
 */
export interface CardFooterProps {
  provider?: string;
  type?: string;
  children?: ReactNode;
  className?: string;
}

export function CardFooter({ 
  provider, 
  type,
  children, 
  className = "" 
}: CardFooterProps) {
  if (children) {
    return (
      <div className={`${styles.cardFooter} ${className}`.trim()}>
        <div className={styles.footerContent}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.cardFooter} ${className}`.trim()}>
      <div className={styles.footerContent}>
        {provider && (
          <div className={styles.footerColumn}>
            <p className={styles.footerLabel}>Provider</p>
            <p className={styles.footerValue}>{provider}</p>
          </div>
        )}
        {type && (
          <div className={styles.footerColumn}>
            <p className={styles.footerLabel}>Type</p>
            <p className={styles.footerValue}>{type}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;