import { Grid, TextField } from '@mui/material';
import SectionHeader from '../../molecules/SectionHeader';
import {
  STEP_LABELS,
  SECTION_LABELS,
  FIELD_LABELS,
  PLACEHOLDERS,
} from '../../../constants/uiLabels';
import type { EventFormData } from '../../../types/event.types';
import sectionStyles from '../shared/section.module.css';

interface OtherIDsSectionProps {
  data: EventFormData;
  onChange: (field: keyof EventFormData, value: string) => void;
  isActive: boolean;
}

/** Organism – Step 3: Other IDs */
export default function OtherIDsSection({ data, onChange, isActive }: OtherIDsSectionProps) {
  return (
    <section className={sectionStyles.card}>
      <SectionHeader
        stepNumber={3}
        title={STEP_LABELS.OTHER_IDS}
        isEditing={isActive}
      />

      <div className={sectionStyles.body}>
        <p className={sectionStyles.sectionTitle}>{SECTION_LABELS.OTHER_IDS_HEADING}</p>
        <p className={sectionStyles.sectionDescription}>{SECTION_LABELS.OTHER_IDS_DESCRIPTION}</p>

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label={FIELD_LABELS.BROKER_EVENT_ID}
              placeholder={PLACEHOLDERS.BROKER_EVENT_ID}
              value={data.brokerEventId}
              onChange={(e) => onChange('brokerEventId', e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label={FIELD_LABELS.MARKET_EVENT_ID}
              placeholder={PLACEHOLDERS.MARKET_EVENT_ID}
              value={data.marketEventId}
              onChange={(e) => onChange('marketEventId', e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label={FIELD_LABELS.CLIENT_EVENT_ID}
              placeholder={PLACEHOLDERS.CLIENT_EVENT_ID}
              value={data.clientEventId}
              onChange={(e) => onChange('clientEventId', e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label={FIELD_LABELS.EXTERNAL_REFERENCE}
              placeholder={PLACEHOLDERS.EXTERNAL_REFERENCE}
              value={data.externalReference}
              onChange={(e) => onChange('externalReference', e.target.value)}
            />
          </Grid>
        </Grid>
      </div>
    </section>
  );
}
