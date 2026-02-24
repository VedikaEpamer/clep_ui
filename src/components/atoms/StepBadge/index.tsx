import { Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import clsx from 'clsx';
import styles from './StepBadge.module.css';

type StepBadgeVariant = 'active' | 'complete' | 'inactive';

interface StepBadgeProps {
  number: number;
  variant: StepBadgeVariant;
}

/** Atom – numbered step badge (blue = active, green tick = complete, outlined = inactive) */
export default function StepBadge({ number, variant }: StepBadgeProps) {
  return (
    <div
      className={clsx(styles.badge, {
        [styles['badge--active']]: variant === 'active',
        [styles['badge--complete']]: variant === 'complete',
        [styles['badge--inactive']]: variant === 'inactive',
      })}
    >
      {variant === 'complete' ? (
        <CheckIcon className={styles.checkIcon} />
      ) : (
        <Typography
          variant="caption"
          className={clsx(styles.number, {
            [styles['number--inactive']]: variant === 'inactive',
          })}
        >
          {number}
        </Typography>
      )}
    </div>
  );
}
