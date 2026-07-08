/**
 * SideRailBranchDropdown — Custom Carbon-compliant branch switcher
 *
 * Part of the SideRailNavigation family. Renders a dropdown for
 * switching branches within the automation shell side rail.
 * All styling in CSS Modules — no inline styles.
 */

import { useState } from 'react';
import { ChevronDown } from '@carbon/icons-react';
import { BranchOption } from './types';
import styles from './SideRailBranchDropdown.module.css';

interface SideRailBranchDropdownProps {
  branches: BranchOption[];
  selectedBranch: string;
  onBranchChange: (branchId: string) => void;
  isExpanded: boolean;
}

export default function SideRailBranchDropdown({ 
  branches, 
  selectedBranch, 
  onBranchChange, 
  isExpanded 
}: SideRailBranchDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedBranchData = branches.find(branch => branch.id === selectedBranch);
  const displayName = selectedBranchData?.name || 'Select branch';

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleBranchSelect = (branchId: string) => {
    onBranchChange(branchId);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className={`${styles.dropdownContainer} ${!isExpanded ? styles.dropdownContainerHidden : ''}`}>
      <button
        className={`${styles.dropdownTrigger} ${isOpen ? styles.dropdownTriggerOpen : ''}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        type="button"
      >
        <span className={styles.branchName}>
          {displayName}
        </span>
        <ChevronDown 
          size={16} 
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
        />
      </button>

      {isOpen && (
        <>
          <div 
            className={styles.overlay} 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className={styles.dropdownMenu} role="listbox">
            {branches.map((branch) => (
              <button
                key={branch.id}
                className={`${styles.dropdownItem} ${branch.id === selectedBranch ? styles.selected : ''}`}
                onClick={() => handleBranchSelect(branch.id)}
                role="option"
                aria-selected={branch.id === selectedBranch}
                type="button"
              >
                <span className={styles.branchText}>{branch.name}</span>
                {branch.isActive && (
                  <span className={styles.activeBadge}>Active</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
