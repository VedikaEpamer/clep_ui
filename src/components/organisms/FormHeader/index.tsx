import { IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AppButton from '../../atoms/AppButton';
import { BUTTON_LABELS } from '../../../constants/uiLabels';
import styles from './FormHeader.module.css';

interface FormHeaderProps {
  title: string;
  subtitle: string;
  onClose: () => void;
  onCancel: () => void;
}

/** Organism – top bar: title / subtitle on the left, Cancel on the right */
export default function FormHeader({ title, subtitle, onClose, onCancel }: FormHeaderProps) {
  return (
    <header className={styles.root}>
      <div className={styles.left}>
        <IconButton size="small" onClick={onClose} sx={{ mt: 0.25 }}>
          <CloseIcon fontSize="small" />
        </IconButton>
        <div className={styles.titleBlock}>
          <Typography variant="h5" className={styles.title}>{title}</Typography>
          <Typography variant="body2" className={styles.subtitle}>{subtitle}</Typography>
        </div>
      </div>
      <AppButton
        label={BUTTON_LABELS.CANCEL}
        variant="text"
        onClick={onCancel}
        className={styles.cancelBtn}
      />
    </header>
  );
}
