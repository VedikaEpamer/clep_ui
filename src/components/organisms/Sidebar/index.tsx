import { Divider, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import StatusBadge from '../../atoms/StatusBadge';
import ProgressTracker from '../../atoms/ProgressTracker';
import AppButton from '../../atoms/AppButton';
import StepNavItem from '../../molecules/StepNavItem';
import { STEPS, TOTAL_STEPS } from '../../../data/stepConfig';
import { BRAND, STATUS_LABELS, PAGE_LABELS, BUTTON_LABELS } from '../../../constants/uiLabels';
import styles from './Sidebar.module.css';

interface SidebarProps {
  currentStep: number;
  eventId: string;
  onStepClick: (step: number) => void;
  onSaveDraft: () => void;
  onExportPDF: () => void;
}

/** Organism – left sidebar with branding, step navigation, progress & action buttons */
export default function Sidebar({
  currentStep,
  eventId,
  onStepClick,
  onSaveDraft,
  onExportPDF,
}: SidebarProps) {
  return (
    <aside className={styles.root}>
      {/* Branding */}
      <div className={styles.brand}>
        <div className={styles.brandInner}>
          <div className={styles.logoCircle}>{BRAND.LOGO_INITIALS}</div>
          <div>
            <Typography className={styles.companyName}>{BRAND.COMPANY_NAME}</Typography>
            <Typography className={styles.platformLabel}>{BRAND.PLATFORM}</Typography>
          </div>
        </div>
      </div>

      <Divider className={styles.divider} />

      {/* Draft Event info */}
      <div className={styles.draftInfo}>
        <StatusBadge label={STATUS_LABELS.DRAFT_EVENT} />
        <Typography className={styles.eventName}>{PAGE_LABELS.NEW_EVENT}</Typography>
        <Typography className={styles.eventId}>{eventId}</Typography>
      </div>

      <Divider className={styles.divider} />

      {/* Progress */}
      <div className={styles.progressWrapper}>
        <ProgressTracker current={currentStep} total={TOTAL_STEPS} />
      </div>

      <Divider className={styles.divider} />

      {/* Step navigation */}
      <nav className={styles.stepList}>
        {STEPS.map((step) => (
          <StepNavItem
            key={step.id}
            step={step}
            currentStep={currentStep}
            onClick={onStepClick}
          />
        ))}
      </nav>

      {/* Action buttons */}
      <div className={styles.actionButtons}>
        <AppButton
          label={BUTTON_LABELS.SAVE_DRAFT}
          startIcon={<SaveIcon />}
          variant="outlined"
          onClick={onSaveDraft}
          fullWidth
          className={styles.sidebarBtn}
        />
        <AppButton
          label={BUTTON_LABELS.EXPORT_PDF}
          startIcon={<PictureAsPdfIcon />}
          variant="outlined"
          onClick={onExportPDF}
          fullWidth
          className={styles.sidebarBtn}
        />
      </div>
    </aside>
  );
}
