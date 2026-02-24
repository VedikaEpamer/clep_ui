import { Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AppButton from '../../atoms/AppButton';
import { BUTTON_LABELS, PROGRESS_LABELS } from '../../../constants/uiLabels';
import { TOTAL_STEPS } from '../../../data/stepConfig';
import styles from './FormFooter.module.css';

interface FormFooterProps {
  currentStep: number;
  onBack: () => void;
  onNext: () => void;
}

/** Organism – sticky bottom navigation: Back / Step X of N / Next */
export default function FormFooter({ currentStep, onBack, onNext }: FormFooterProps) {
  const isFirst = currentStep === 1;
  const isLast = currentStep === TOTAL_STEPS;

  return (
    <footer className={styles.root}>
      <AppButton
        label={BUTTON_LABELS.BACK}
        variant="text"
        startIcon={<ArrowBackIcon fontSize="small" />}
        onClick={onBack}
        disabled={isFirst}
        className={styles.backBtn}
      />

      <Typography variant="body2" className={styles.stepIndicator}>
        {PROGRESS_LABELS.STEP_OF(currentStep, TOTAL_STEPS)}
      </Typography>

      <AppButton
        label={isLast ? BUTTON_LABELS.SUBMIT : BUTTON_LABELS.NEXT}
        variant="contained"
        endIcon={!isLast && <ArrowForwardIcon fontSize="small" />}
        onClick={onNext}
        className={styles.nextBtn}
      />
    </footer>
  );
}
