import { Grid, TextField, MenuItem } from '@mui/material';
import SectionHeader from '../../molecules/SectionHeader';
import {
  STEP_LABELS,
  SECTION_LABELS,
  FIELD_LABELS,
  PLACEHOLDERS,
  SELECT_DEFAULTS,
  HELPER_TEXTS,
} from '../../../constants/uiLabels';
import type { EventFormData } from '../../../types/event.types';
import { INDUSTRY_LOSS_SOURCES } from '../../../data/regionData';
import sectionStyles from '../shared/section.module.css';

interface IndustryMarketLossSectionProps {
  data: EventFormData;
  onChange: (field: keyof EventFormData, value: string) => void;
  isActive: boolean;
}

/** Organism – Step 4: Industry Market Loss */
export default function IndustryMarketLossSection({
  data,
  onChange,
  isActive,
}: IndustryMarketLossSectionProps) {
  return (
    <section className={sectionStyles.card}>
      <SectionHeader
        stepNumber={4}
        title={STEP_LABELS.INDUSTRY_MARKET_LOSS}
        isEditing={isActive}
      />

      <div className={sectionStyles.body}>
        <p className={sectionStyles.sectionTitle}>{SECTION_LABELS.INDUSTRY_LOSS_HEADING}</p>
        <p className={sectionStyles.sectionDescription}>{SECTION_LABELS.INDUSTRY_LOSS_DESCRIPTION}</p>

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label={FIELD_LABELS.INDUSTRY_LOSS_ESTIMATE}
              placeholder={PLACEHOLDERS.INDUSTRY_LOSS_ESTIMATE}
              value={data.industrylossEstimate}
              onChange={(e) => onChange('industrylossEstimate', e.target.value)}
              helperText={HELPER_TEXTS.INDUSTRY_LOSS_ESTIMATE}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              fullWidth
              label={FIELD_LABELS.INDUSTRY_LOSS_SOURCE}
              value={data.industryLossSource}
              onChange={(e) => onChange('industryLossSource', e.target.value)}
            >
              <MenuItem value=""><em>{SELECT_DEFAULTS.LOSS_SOURCE}</em></MenuItem>
              {INDUSTRY_LOSS_SOURCES.map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label={FIELD_LABELS.INDUSTRY_LOSS_DATE}
              type="date"
              value={data.industryLossDate}
              onChange={(e) => onChange('industryLossDate', e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
              helperText={HELPER_TEXTS.INDUSTRY_LOSS_DATE}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label={FIELD_LABELS.MARKET_SHARE}
              placeholder={PLACEHOLDERS.MARKET_SHARE_PCT}
              value={data.marketShare}
              onChange={(e) => onChange('marketShare', e.target.value)}
              helperText={HELPER_TEXTS.MARKET_SHARE}
            />
          </Grid>
        </Grid>
      </div>
    </section>
  );
}
