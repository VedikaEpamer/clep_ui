import { Grid, MenuItem } from '@mui/material';
import SectionHeader from '../../molecules/SectionHeader';
import SectionDescription from '../../molecules/SectionDescription';
import FormField from '../../molecules/FormField';
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
        <SectionDescription
          title={SECTION_LABELS.DEADLINES_HEADING}
          description={SECTION_LABELS.DEADLINES_DESCRIPTION}
        />

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormField
              label={FIELD_LABELS.LOSS_PICK_DEADLINE}
              type="date"
              value={data.lossPickDeadline}
              onChange={(v) => onChange('lossPickDeadline', v)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormField
              label={FIELD_LABELS.FINAL_SUBMISSION_DEADLINE}
              type="date"
              value={data.finalSubmissionDeadline}
              onChange={(v) => onChange('finalSubmissionDeadline', v)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormField
              label={FIELD_LABELS.ASSIGNED_ANALYST}
              select
              value={data.assignedAnalyst}
              onChange={(v) => onChange('assignedAnalyst', v)}
            >
              <MenuItem value=""><em>{SELECT_DEFAULTS.ANALYST}</em></MenuItem>
              {ANALYSTS.map((a) => (
                <MenuItem key={a} value={a}>{a}</MenuItem>
              ))}
            </FormField>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormField
              label={FIELD_LABELS.REVIEWER_NAME}
              select
              value={data.reviewerName}
              onChange={(v) => onChange('reviewerName', v)}
            >
              <MenuItem value=""><em>{SELECT_DEFAULTS.REVIEWER}</em></MenuItem>
              {ANALYSTS.map((a) => (
                <MenuItem key={a} value={a}>{a}</MenuItem>
              ))}
            </FormField>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormField
              label={FIELD_LABELS.NOTES}
              multiline
              rows={3}
              placeholder={PLACEHOLDERS.NOTES}
              value={data.notes}
              onChange={(v) => onChange('notes', v)}
            />
          </Grid>
        </Grid>
      </div>
    </section>
  );
}
