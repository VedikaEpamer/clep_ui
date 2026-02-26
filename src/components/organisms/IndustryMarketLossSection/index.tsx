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
        <SectionDescription
          title={SECTION_LABELS.INDUSTRY_LOSS_HEADING}
          description={SECTION_LABELS.INDUSTRY_LOSS_DESCRIPTION}
        />

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormField
              label={FIELD_LABELS.INDUSTRY_LOSS_ESTIMATE}
              placeholder={PLACEHOLDERS.INDUSTRY_LOSS_ESTIMATE}
              value={data.industrylossEstimate}
              onChange={(v) => onChange('industrylossEstimate', v)}
              helperText={HELPER_TEXTS.INDUSTRY_LOSS_ESTIMATE}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormField
              label={FIELD_LABELS.INDUSTRY_LOSS_SOURCE}
              select
              value={data.industryLossSource}
              onChange={(v) => onChange('industryLossSource', v)}
            >
              <MenuItem value=""><em>{SELECT_DEFAULTS.LOSS_SOURCE}</em></MenuItem>
              {INDUSTRY_LOSS_SOURCES.map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </FormField>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormField
              label={FIELD_LABELS.INDUSTRY_LOSS_DATE}
              type="date"
              value={data.industryLossDate}
              onChange={(v) => onChange('industryLossDate', v)}
              helperText={HELPER_TEXTS.INDUSTRY_LOSS_DATE}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormField
              label={FIELD_LABELS.MARKET_SHARE}
              placeholder={PLACEHOLDERS.MARKET_SHARE_PCT}
              value={data.marketShare}
              onChange={(v) => onChange('marketShare', v)}
              helperText={HELPER_TEXTS.MARKET_SHARE}
            />
          </Grid>
        </Grid>
      </div>
    </section>
  );
}
