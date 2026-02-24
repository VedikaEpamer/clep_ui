import { Grid, TextField, MenuItem } from '@mui/material';
import SectionHeader from '../../molecules/SectionHeader';
import {
  STEP_LABELS,
  SECTION_LABELS,
  FIELD_LABELS,
  PLACEHOLDERS,
  SELECT_DEFAULTS,
} from '../../../constants/uiLabels';
import type { EventFormData } from '../../../types/event.types';
import { ANALYSTS } from '../../../data/regionData';
import sectionStyles from '../shared/section.module.css';

interface DeadlinesTrackingSectionProps {
  data: EventFormData;
  onChange: (field: keyof EventFormData, value: string) => void;
  isActive: boolean;
}

/** Organism – Step 5: Deadlines & Tracking */
export default function DeadlinesTrackingSection({
  data,
  onChange,
  isActive,
}: DeadlinesTrackingSectionProps) {
  return (
    <section className={sectionStyles.card}>
      <SectionHeader
        stepNumber={5}
        title={STEP_LABELS.DEADLINES_TRACKING}
        isEditing={isActive}
      />

      <div className={sectionStyles.body}>
        <p className={sectionStyles.sectionTitle}>{SECTION_LABELS.DEADLINES_HEADING}</p>
        <p className={sectionStyles.sectionDescription}>{SECTION_LABELS.DEADLINES_DESCRIPTION}</p>

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label={FIELD_LABELS.LOSS_PICK_DEADLINE}
              type="date"
              value={data.lossPickDeadline}
              onChange={(e) => onChange('lossPickDeadline', e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label={FIELD_LABELS.FINAL_SUBMISSION_DEADLINE}
              type="date"
              value={data.finalSubmissionDeadline}
              onChange={(e) => onChange('finalSubmissionDeadline', e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              fullWidth
              label={FIELD_LABELS.ASSIGNED_ANALYST}
              value={data.assignedAnalyst}
              onChange={(e) => onChange('assignedAnalyst', e.target.value)}
            >
              <MenuItem value=""><em>{SELECT_DEFAULTS.ANALYST}</em></MenuItem>
              {ANALYSTS.map((a) => (
                <MenuItem key={a} value={a}>{a}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              fullWidth
              label={FIELD_LABELS.REVIEWER_NAME}
              value={data.reviewerName}
              onChange={(e) => onChange('reviewerName', e.target.value)}
            >
              <MenuItem value=""><em>{SELECT_DEFAULTS.REVIEWER}</em></MenuItem>
              {ANALYSTS.map((a) => (
                <MenuItem key={a} value={a}>{a}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label={FIELD_LABELS.NOTES}
              multiline
              rows={3}
              placeholder={PLACEHOLDERS.NOTES}
              value={data.notes}
              onChange={(e) => onChange('notes', e.target.value)}
            />
          </Grid>
        </Grid>
      </div>
    </section>
  );
}
