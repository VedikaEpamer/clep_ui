import { Grid } from '@mui/material';
import SectionHeader from '../../molecules/SectionHeader';
import SectionDescription from '../../molecules/SectionDescription';
import FormField from '../../molecules/FormField';
import AppTextField from '../../atoms/AppTextField';
import AppSelect from '../../atoms/AppSelect';
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
            <FormField label={FIELD_LABELS.LOSS_PICK_DEADLINE}>
              <AppTextField
                type="date"
                value={data.lossPickDeadline}
                onChange={(v) => onChange('lossPickDeadline', v)}
              />
            </FormField>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormField label={FIELD_LABELS.FINAL_SUBMISSION_DEADLINE}>
              <AppTextField
                type="date"
                value={data.finalSubmissionDeadline}
                onChange={(v) => onChange('finalSubmissionDeadline', v)}
              />
            </FormField>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormField label={FIELD_LABELS.ASSIGNED_ANALYST}>
              <AppSelect
                options={ANALYSTS}
                placeholder={SELECT_DEFAULTS.ANALYST}
                value={data.assignedAnalyst}
                onChange={(v) => onChange('assignedAnalyst', v)}
              />
            </FormField>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormField label={FIELD_LABELS.REVIEWER_NAME}>
              <AppSelect
                options={ANALYSTS}
                placeholder={SELECT_DEFAULTS.REVIEWER}
                value={data.reviewerName}
                onChange={(v) => onChange('reviewerName', v)}
              />
            </FormField>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormField label={FIELD_LABELS.NOTES}>
              <AppTextField
                multiline
                rows={3}
                placeholder={PLACEHOLDERS.NOTES}
                value={data.notes}
                onChange={(v) => onChange('notes', v)}
              />
            </FormField>
          </Grid>
        </Grid>
      </div>
    </section>
  );
}
