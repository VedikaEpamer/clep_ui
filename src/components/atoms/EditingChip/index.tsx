import { Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { STATUS_LABELS } from '../../../constants/uiLabels';
import styles from './EditingChip.module.css';

/** Atom – small blue "Currently editing" chip shown under each active section header */
export default function EditingChip() {
  return (
    <Chip
      icon={<EditIcon sx={{ fontSize: '0.7rem !important' }} />}
      label={STATUS_LABELS.CURRENTLY_EDITING}
      size="small"
      className={styles.chip}
    />
  );
}
