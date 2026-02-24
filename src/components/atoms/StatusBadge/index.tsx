import CircleIcon from '@mui/icons-material/Circle';
import styles from './StatusBadge.module.css';

interface StatusBadgeProps {
  label: string;
}

/** Atom – yellow dot + label used in the sidebar "DRAFT EVENT" area */
export default function StatusBadge({ label }: StatusBadgeProps) {
  return (
    <div className={styles.root}>
      <CircleIcon className={styles.dot} />
      <span className={styles.label}>{label}</span>
    </div>
  );
}
