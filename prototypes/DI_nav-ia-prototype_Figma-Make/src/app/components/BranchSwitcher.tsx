import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Branch, Launch } from '@carbon/icons-react';
import styles from './BranchSwitcher.module.css';

export interface Branch {
  id: string;
  name: string;
  isActive?: boolean;
}

interface BranchSwitcherProps {
  branches: Branch[];
  currentBranch?: string;
  onBranchChange?: (branchId: string) => void;
  onViewBranches?: () => void;
  className?: string;
}

export default function BranchSwitcher({
  branches,
  currentBranch,
  onBranchChange,
  onViewBranches,
  className = ''
}: BranchSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleBranchSelect = (branchId: string) => {
    if (onBranchChange) {
      onBranchChange(branchId);
    }
    setIsOpen(false);
  };

  const handleViewBranches = () => {
    if (onViewBranches) {
      onViewBranches();
    }
    setIsOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Calculate menu position - right-aligned with button
  const getMenuPosition = () => {
    if (!buttonRef.current) return { top: 0, right: 0 };

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    
    return {
      top: buttonRect.bottom + 2, // 2px gap below button
      right: windowWidth - buttonRect.right, // Distance from right edge of viewport
    };
  };

  const menuPosition = isOpen ? getMenuPosition() : { top: 0, right: 0 };

  return (
    <>
      <button
        ref={buttonRef}
        className={`${styles.triggerButton} ${className}`}
        onClick={toggleMenu}
        type="button"
        aria-label="Switch branch"
        aria-expanded={isOpen}
      >
        <Branch size={16} />
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            className={styles.menuContainer}
            style={{
              position: 'fixed',
              top: `${menuPosition.top}px`,
              right: `${menuPosition.right}px`,
            }}
          >
            <div className={styles.menu}>
              {/* Top Spacer */}
              <div className={styles.spacer} />

              {/* Branch List */}
              <div className={styles.menuItems}>
                {branches.map((branch) => (
                  <button
                    key={branch.id}
                    className={`${styles.menuItem} ${
                      branch.id === currentBranch ? styles.menuItemActive : ''
                    }`}
                    onClick={() => handleBranchSelect(branch.id)}
                    type="button"
                  >
                    <span className={styles.menuItemText}>{branch.name}</span>
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div className={styles.divider} />

              {/* View Branches Button */}
              <button
                className={styles.actionButton}
                onClick={handleViewBranches}
                type="button"
              >
                <span className={styles.actionButtonText}>View branches</span>
                <Launch size={16} className={styles.actionButtonIcon} />
              </button>

              {/* Bottom Spacer */}
              <div className={styles.spacer} />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
