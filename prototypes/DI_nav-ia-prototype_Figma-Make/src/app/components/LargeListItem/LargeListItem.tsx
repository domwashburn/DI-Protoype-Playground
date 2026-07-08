import React from "react";
import { OverflowMenu, OverflowMenuItem } from "@carbon/react";
import styles from "./LargeListItem.module.css";

export interface LargeListItemMenuItem {
  label: string;
  onClick: () => void;
  isDanger?: boolean;
  isDivider?: boolean;
}

export interface LargeListItemProps {
  id: string;
  title: string;
  isSelected?: boolean;
  onClick?: () => void;

  // Optional icon on the left
  showIcon?: boolean;
  icon?: React.ReactNode;

  // Content variant
  variant?: "details" | "description";
  details?: string[]; // For variant='details' - array of detail lines
  description?: string; // For variant='description' - single text with 2-line clamp

  // Overflow menu
  showMenu?: boolean;
  menuItems?: LargeListItemMenuItem[];
  onMenuAction?: (action: string, id: string) => void;
}

/**
 * LargeListItem - A flexible list item component that preserves the exact structure
 * of the working ServiceListItem but adds configurability through props.
 *
 * This component maintains the EXACT CSS classes and structure from InboxLayoutTemplate
 * to ensure no regression in spacing or layout.
 */
export default function LargeListItem({
  id,
  title,
  isSelected = false,
  onClick,
  showIcon = true,
  icon,
  variant = "details",
  details = [],
  description = "",
  showMenu = true,
  menuItems = [],
  onMenuAction,
}: LargeListItemProps) {
  return (
    <div className={styles.serviceListItem} onClick={onClick}>
      <div
        className={`${styles.serviceItem} ${isSelected ? styles.serviceItemSelected : ""}`}
      >
        {isSelected && (
          <div className={styles.selectedBorder} />
        )}
        <div className={styles.serviceContent}>
          {/* Optional Icon - uses EXACT same structure as original */}
          {showIcon && (
            <div className={styles.serviceIcon}>{icon}</div>
          )}

          {/* Service Details - preserves EXACT structure */}
          <div className={styles.serviceDetails}>
            <div className={styles.serviceName}>
              <p
                className={
                  isSelected
                    ? styles.serviceNameSelected
                    : styles.serviceNameDefault
                }
              >
                {title}
              </p>
            </div>

            {/* Details/Description - conditional based on variant */}
            <div className={styles.serviceDetailsWrapper}>
              {variant === "details" &&
                details.map((detail, index) => (
                  <p
                    key={index}
                    className={styles.serviceDetailText}
                  >
                    {detail}
                  </p>
                ))}
              {variant === "description" && description && (
                <p
                  className={`${styles.serviceDetailText} ${styles.descriptionClamp}`}
                >
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* Optional Overflow Menu - uses Carbon OverflowMenu */}
          {showMenu &&
            menuItems.length > 0 &&
            (() => {
              /* Convert isDivider separators into hasDivider flags on the following item */
              const processed: Array<
                LargeListItemMenuItem & { hasDivider?: boolean }
              > = [];
              let pendingDivider = false;
              for (const item of menuItems) {
                if (item.isDivider) {
                  pendingDivider = true;
                } else {
                  processed.push({
                    ...item,
                    hasDivider: pendingDivider,
                  });
                  pendingDivider = false;
                }
              }
              return (
                <div
                  className={styles.serviceOverflowMenu}
                  onClick={(e) => e.stopPropagation()}
                >
                  <OverflowMenu
                    size="sm"
                    aria-label="Options"
                    flipped
                  >
                    {processed.map((item, index) => (
                      <OverflowMenuItem
                        key={index}
                        itemText={item.label}
                        isDelete={item.isDanger}
                        hasDivider={item.hasDivider}
                        onClick={() => {
                          item.onClick();
                          if (onMenuAction) {
                            onMenuAction(item.label, id);
                          }
                        }}
                      />
                    ))}
                  </OverflowMenu>
                </div>
              );
            })()}
        </div>
        <div className={styles.itemBorder} />
      </div>
    </div>
  );
}