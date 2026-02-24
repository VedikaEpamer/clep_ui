import { LinearProgress } from '@mui/material';
import { PROGRESS_LABELS } from '../../../constants/uiLabels';
import styles from './ProgressTracker.module.css';

interface ProgressTrackerProps {
  current: number;
  total: number;
}

/** Atom – labelled linear progress bar shown in the sidebar */
export default function ProgressTracker({ current, total }: ProgressTrackerProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className={styles.root}>
      <span className={styles.label}>{PROGRESS_LABELS.PROGRESS}</span>
      <div className={styles.barRow}>
        <LinearProgress
          variant="determinate"
          value={pct}
          className={styles.progressBar}
          sx={{
            '& .MuiLinearProgress-bar': {
              backgroundColor: 'var(--color-progress-bar)',
              borderRadius: 'var(--radius-pill)',
            },
          }}
        />
        <span className={styles.pct}>{pct}%</span>
      </div>
      <span className={styles.stepOf}>{PROGRESS_LABELS.STEP_OF(current, total)}</span>
    </div>
  );
}
