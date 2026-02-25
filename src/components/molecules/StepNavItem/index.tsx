import { Typography } from '@mui/material';
import clsx from 'clsx';
import StepBadge from '../../atoms/StepBadge';
import { STATUS_LABELS } from '../../../constants/uiLabels';
import type { StepConfig } from '../../../types/event.types';
import styles from './StepNavItem.module.css';

interface StepNavItemProps {
  step: StepConfig;
  currentStep: number;
  onClick: (stepId: number) => void;
}

/** Molecule – single step entry in the sidebar navigation list */
export default function StepNavItem({ step, currentStep, onClick }: StepNavItemProps) {
  const isActive = step.id === currentStep;
  const isComplete = step.id < currentStep;
  const variant = isComplete ? 'complete' : isActive ? 'active' : 'inactive';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick(step.id)}
      onKeyDown={(e) => e.key === 'Enter' && onClick(step.id)}
      className={clsx(styles.item, {
        [styles['item--active']]: isActive,
        [styles['item--complete']]: isComplete && !isActive,
        [styles['item--inactive']]: !isActive && !isComplete,
      })}
    >
      <StepBadge number={step.id} variant={variant} />
      <div className={styles.textBlock}>
        <Typography
          variant="body2"
          className={clsx(styles.stepLabel, {
            [styles['stepLabel--active']]: isActive,
            [styles['stepLabel--complete']]: isComplete && !isActive,
            [styles['stepLabel--inactive']]: !isActive && !isComplete,
          })}
        >
          {step.label}
        </Typography>
        {isActive && (
          <Typography
            variant="caption"
            className={clsx(styles.statusText, styles['statusText--active'])}
          >
            {STATUS_LABELS.ACTIVE}
          </Typography>
        )}
        {isComplete && (
          <Typography
            variant="caption"
            className={clsx(styles.statusText, styles['statusText--complete'])}
          >
            {STATUS_LABELS.COMPLETE}
          </Typography>
        )}
      </div>
    </div>
  );
}
