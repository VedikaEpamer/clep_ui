import { Typography } from '@mui/material';
import clsx from 'clsx';
import EditingChip from '../../atoms/EditingChip';
import StepBadge from '../../atoms/StepBadge';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  stepNumber: number;
  title: string;
  isEditing?: boolean;
}

/** Molecule – blue step number badge + section title + "Currently editing" chip */
export default function SectionHeader({ stepNumber, title, isEditing = false }: SectionHeaderProps) {
  return (
    <div
      className={clsx(styles.root, {
        [styles['root--editing']]: isEditing,
        [styles['root--complete']]: !isEditing,
      })}
    >
      <StepBadge number={stepNumber} variant={isEditing ? 'active' : 'complete'} />
      <div className={styles.textBlock}>
        <Typography variant="subtitle1" className={styles.title}>
          {title}
        </Typography>
        {isEditing && <EditingChip />}
      </div>
    </div>
  );
}
