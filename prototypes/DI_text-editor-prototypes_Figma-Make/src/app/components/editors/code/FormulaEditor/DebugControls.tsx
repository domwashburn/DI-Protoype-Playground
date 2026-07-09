import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';

// SVG path data from Figma import (svg-4p2vfri7d1)
const skipBackTriangle = "M12.6667 13.3333L6 8L12.6667 2.66667V13.3333Z";
const skipForwardTriangle = "M3.33333 2.66667L10 8L3.33333 13.3333V2.66667Z";
import styles from './DebugControls.module.css';

export interface DebugControlsProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  playbackSpeed: number;
  onStepBackward: () => void;
  onStepForward: () => void;
  onStepFirst: () => void;
  onStepLast: () => void;
  onTogglePlay: () => void;
  onSpeedChange: (speed: number) => void;
}

const SPEED_OPTIONS = [
  { value: 2000, label: '0.5×' },
  { value: 1000, label: '1×' },
  { value: 500, label: '2×' },
  { value: 250, label: '4×' },
];

export function DebugControls({
  currentStep,
  totalSteps,
  isPlaying,
  playbackSpeed,
  onStepBackward,
  onStepForward,
  onStepFirst,
  onStepLast,
  onTogglePlay,
  onSpeedChange,
}: DebugControlsProps) {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const progressPct = totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0;

  return (
    <div className={styles.controls}>
      <div aria-hidden className={styles.border} />

      {/* Toolbar row */}
      <div className={styles.toolbar}>

        {/* Step counter pill */}
        <div className={styles.stepCounter}>
          <span className={styles.stepCurrent}>{currentStep + 1}</span>
          <span className={styles.stepSep}>/</span>
          <span className={styles.stepTotal}>{totalSteps}</span>
        </div>

        {/* Playback button group */}
        <div className={styles.buttonGroup}>
          {/* Skip to first */}
          <button
            onClick={onStepFirst}
            disabled={isFirstStep || isPlaying}
            className={styles.controlButton}
            title="Jump to first step"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d={skipBackTriangle} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              <path d="M3.33333 12.6667V3.33333" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </button>

          {/* Step backward */}
          <button
            onClick={onStepBackward}
            disabled={isFirstStep || isPlaying}
            className={styles.controlButton}
            title="Step backward"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </button>

          {/* Play / Pause */}
          <div className={styles.playWrapper}>
            <button
              onClick={onTogglePlay}
              disabled={isLastStep && !isPlaying}
              className={styles.playButton}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="3.5" y="2.5" width="3" height="11" rx="0.5" stroke="white" strokeWidth="1.33333" />
                  <rect x="9.5" y="2.5" width="3" height="11" rx="0.5" stroke="white" strokeWidth="1.33333" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 2L13.3333 8L4 14V2Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                </svg>
              )}
            </button>
          </div>

          {/* Step forward */}
          <button
            onClick={onStepForward}
            disabled={isLastStep || isPlaying}
            className={styles.controlButton}
            title="Step forward"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </button>

          {/* Skip to last */}
          <button
            onClick={onStepLast}
            disabled={isLastStep || isPlaying}
            className={styles.controlButton}
            title="Jump to last step"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d={skipForwardTriangle} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              <path d="M12.6667 3.33333V12.6667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </button>
        </div>

        {/* Speed selector */}
        <Select
          value={playbackSpeed.toString()}
          onValueChange={(v) => onSpeedChange(Number(v))}
          disabled={isPlaying}
        >
          <SelectTrigger className={styles.speedTrigger}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SPEED_OPTIONS.map(opt => (
              <SelectItem key={opt.value} value={opt.value.toString()}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Progress bar */}
      <div
        className={styles.progress}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={totalSteps - 1}
        aria-valuenow={currentStep}
      >
        <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
      </div>
    </div>
  );
}
