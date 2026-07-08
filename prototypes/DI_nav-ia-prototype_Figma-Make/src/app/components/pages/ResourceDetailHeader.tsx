import { useNavigate } from 'react-router';
import { IconButton } from '@carbon/react';
import { ArrowLeft, Information } from '@carbon/icons-react';
import styles from './ResourceDetailHeader.module.css';

interface ResourceDetailHeaderProps {
  title: string;
  infoActive: boolean;
  onInfoClick: () => void;
}

export default function ResourceDetailHeader({
  title,
  infoActive,
  onInfoClick,
}: ResourceDetailHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className={styles.header} role="banner">
      <div className={styles.progressiveBlur} aria-hidden />

      <div className={styles.titleGroup}>
        <IconButton
          kind="ghost"
          label="Go back"
          align="right"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
        </IconButton>
        <h1 className={styles.title}>{title}</h1>
      </div>

      {/* centre slot intentionally empty */}
      <div />

      <div className={styles.rightCluster}>
        <div className={styles.iconCircle}>
          <IconButton
            kind="ghost"
            label="Resource information"
            align="bottom-end"
            isSelected={infoActive}
            onClick={onInfoClick}
          >
            <Information />
          </IconButton>
        </div>
      </div>
    </header>
  );
}
