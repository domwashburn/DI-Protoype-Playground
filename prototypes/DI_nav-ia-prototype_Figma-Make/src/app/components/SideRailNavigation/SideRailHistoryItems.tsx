import { HistoryGroup } from './types';
import styles from './SideRailHistoryItems.module.css';

interface SideRailHistoryItemsProps {
  historyGroups: HistoryGroup[];
  activeItemId?: string;
  onItemClick: (itemId: string) => void;
  isExpanded: boolean;
}

export default function SideRailHistoryItems({ 
  historyGroups, 
  activeItemId, 
  onItemClick, 
  isExpanded 
}: SideRailHistoryItemsProps) {
  if (!isExpanded || !historyGroups?.length) return null;

  return (
    <div className={styles.historyContainer}>
      {historyGroups.map((group, groupIndex) => (
        <div key={groupIndex} className={styles.historyGroup}>
          <div className={styles.historyGroupHeader}>{group.title}</div>
          {group.items.map((item) => (
            <button
              key={item.id}
              className={`${styles.historyItem} ${activeItemId === item.id ? styles.active : ''}`}
              onClick={() => onItemClick(item.id)}
              title={item.title}
              type="button"
            >
              {item.title}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}