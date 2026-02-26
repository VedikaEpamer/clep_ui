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
          bordered
          title={SECTION_LABELS.INDUSTRY_LOSS_HEADING}
          description={SECTION_LABELS.INDUSTRY_LOSS_DESCRIPTION}
        />

        <div className={sectionStyles.fieldsBlock}>
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormField label={FIELD_LABELS.INDUSTRY_LOSS_ESTIMATE}>
              <AppTextField
                placeholder={PLACEHOLDERS.INDUSTRY_LOSS_ESTIMATE}
                value={data.industrylossEstimate}
                onChange={(v) => onChange('industrylossEstimate', v)}
                helperText={HELPER_TEXTS.INDUSTRY_LOSS_ESTIMATE}
              />
            </FormField>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormField label={FIELD_LABELS.INDUSTRY_LOSS_SOURCE}>
              <AppSelect
                options={INDUSTRY_LOSS_SOURCES}
                placeholder={SELECT_DEFAULTS.LOSS_SOURCE}
                value={data.industryLossSource}
                onChange={(v) => onChange('industryLossSource', v)}
              />
            </FormField>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormField label={FIELD_LABELS.INDUSTRY_LOSS_DATE}>
              <AppTextField
                type="date"
                value={data.industryLossDate}
                onChange={(v) => onChange('industryLossDate', v)}
                helperText={HELPER_TEXTS.INDUSTRY_LOSS_DATE}
              />
            </FormField>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormField label={FIELD_LABELS.MARKET_SHARE}>
              <AppTextField
                placeholder={PLACEHOLDERS.MARKET_SHARE_PCT}
                value={data.marketShare}
                onChange={(v) => onChange('marketShare', v)}
                helperText={HELPER_TEXTS.MARKET_SHARE}
              />
            </FormField>
          </Grid>
        </Grid>
        </div>{/* end fieldsBlock */}
      </div>
    </section>
  );
}
