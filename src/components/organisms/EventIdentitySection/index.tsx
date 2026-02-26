import { Grid } from '@mui/material';
import SectionHeader from '../../molecules/SectionHeader';
import SectionDescription from '../../molecules/SectionDescription';
import FormField from '../../molecules/FormField';
import AppTextField from '../../atoms/AppTextField';
import AppSelect from '../../atoms/AppSelect';
import AppMultiSelect from '../../atoms/AppMultiSelect';
import {
  STEP_LABELS,
  SECTION_LABELS,
  FIELD_LABELS,
  PLACEHOLDERS,
  SELECT_DEFAULTS,
  HELPER_TEXTS,
} from '../../../constants/uiLabels';
import type { EventFormData } from '../../../types/event.types';
import {
  CAT_PREMIUM_OPTIONS,
  EVENT_TYPES,
  EVENT_SUB_TYPES,
  PERILS,
  BUSINESS_GROUPS,
} from '../../../data/regionData';
import sectionStyles from '../shared/section.module.css';

interface EventIdentitySectionProps {
  data: EventFormData;
  onChange: (field: keyof EventFormData, value: string) => void;
  onBusinessGroupsChange: (values: string[]) => void;
  isActive: boolean;
}

/** Organism – Step 1: Event Identity & Core Metadata form */
export default function EventIdentitySection({
  data,
  onChange,
  onBusinessGroupsChange,
  isActive,
}: EventIdentitySectionProps) {
  const subTypes = data.eventType ? EVENT_SUB_TYPES[data.eventType] ?? [] : [];

  return (
    <section className={sectionStyles.card}>
      <SectionHeader
        stepNumber={1}
        title={STEP_LABELS.EVENT_IDENTITY}
        isEditing={isActive}
      />

      <div className={sectionStyles.body}>
        {/* ── Block 1: description ── */}
        <SectionDescription
          bordered
          title={SECTION_LABELS.EVENT_IDENTITY_HEADING}
          description={SECTION_LABELS.EVENT_IDENTITY_DESCRIPTION}
        />

        {/* ── Block 2: fields ── */}
        <div className={sectionStyles.fieldsBlock}>
          <Grid container spacing={2.5}>
            {/* Row 1: Status + ID */}
            <Grid size={{ xs: 12, md: 6 }}>
              <FormField label={FIELD_LABELS.EVENT_STATUS}>
                <AppTextField
                  value={data.eventStatus}
                  readOnly
                  helperText={HELPER_TEXTS.EVENT_STATUS}
                />
              </FormField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormField label={FIELD_LABELS.EVENT_ID}>
                <AppTextField value={data.eventId} readOnly />
              </FormField>
            </Grid>

            {/* Row 2: CAT Code + CAT Premium */}
            <Grid size={{ xs: 12, md: 6 }}>
              <FormField label={FIELD_LABELS.CAT_CODE}>
                <AppTextField
                  placeholder={PLACEHOLDERS.CAT_CODE}
                  value={data.catCode}
                  onChange={(v) => onChange('catCode', v)}
                />
              </FormField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormField label={FIELD_LABELS.CAT_PREMIUM_ALLOCATION}>
                <AppSelect
                  options={CAT_PREMIUM_OPTIONS}
                  placeholder={SELECT_DEFAULTS.PREMIUM_STATUS}
                  value={data.catPremiumAllocation}
                  onChange={(v) => onChange('catPremiumAllocation', v)}
                />
              </FormField>
            </Grid>

            {/* Row 3: Event Name */}
            <Grid size={{ xs: 12 }}>
              <FormField label={FIELD_LABELS.EVENT_NAME}>
                <AppTextField
                  placeholder={PLACEHOLDERS.EVENT_NAME}
                  value={data.eventName}
                  onChange={(v) => onChange('eventName', v)}
                />
              </FormField>
            </Grid>

            {/* Row 4: Event Type + Sub-Type */}
            <Grid size={{ xs: 12, md: 6 }}>
              <FormField label={FIELD_LABELS.EVENT_TYPE}>
                <AppSelect
                  options={EVENT_TYPES}
                  placeholder={SELECT_DEFAULTS.EVENT_TYPE}
                  value={data.eventType}
                  onChange={(v) => {
                    onChange('eventType', v);
                    onChange('eventSubType', '');
                  }}
                />
              </FormField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormField label={FIELD_LABELS.EVENT_SUB_TYPE}>
                <AppSelect
                  options={subTypes}
                  placeholder={SELECT_DEFAULTS.SUB_TYPE}
                  value={data.eventSubType}
                  onChange={(v) => onChange('eventSubType', v)}
                  disabled={!data.eventType}
                />
              </FormField>
            </Grid>

            {/* Row 5: Primary Peril + Business Groups */}
            <Grid size={{ xs: 12, md: 6 }}>
              <FormField label={FIELD_LABELS.PRIMARY_PERIL}>
                <AppSelect
                  options={PERILS}
                  placeholder={SELECT_DEFAULTS.PERIL}
                  value={data.primaryPeril}
                  onChange={(v) => onChange('primaryPeril', v)}
                />
              </FormField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormField label={FIELD_LABELS.BUSINESS_GROUPS}>
                <AppMultiSelect
                  options={BUSINESS_GROUPS}
                  value={data.businessGroups}
                  onChange={onBusinessGroupsChange}
                  placeholder={SELECT_DEFAULTS.BUSINESS_GROUPS}
                />
              </FormField>
            </Grid>

            {/* Row 6: Event Date + Loss Start Date */}
            <Grid size={{ xs: 12, md: 6 }}>
              <FormField label={FIELD_LABELS.EVENT_DATE}>
                <AppTextField
                  type="date"
                  value={data.eventDate}
                  onChange={(v) => onChange('eventDate', v)}
                />
              </FormField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormField label={FIELD_LABELS.LOSS_START_DATE}>
                <AppTextField
                  type="date"
                  value={data.lossStartDate}
                  onChange={(v) => onChange('lossStartDate', v)}
                />
              </FormField>
            </Grid>

            {/* Row 7: Loss End Date */}
            <Grid size={{ xs: 12, md: 6 }}>
              <FormField label={FIELD_LABELS.LOSS_END_DATE}>
                <AppTextField
                  type="date"
                  value={data.lossEndDate}
                  onChange={(v) => onChange('lossEndDate', v)}
                />
              </FormField>
            </Grid>

            {/* Row 8: Short Description */}
            <Grid size={{ xs: 12 }}>
              <FormField label={FIELD_LABELS.SHORT_DESCRIPTION}>
                <AppTextField
                  placeholder={PLACEHOLDERS.SHORT_DESCRIPTION}
                  value={data.shortDescription}
                  onChange={(v) => onChange('shortDescription', v)}
                />
              </FormField>
            </Grid>

            {/* Row 9: Long Description */}
            <Grid size={{ xs: 12 }}>
              <FormField label={FIELD_LABELS.LONG_DESCRIPTION}>
                <AppTextField
                  multiline
                  rows={3}
                  placeholder={PLACEHOLDERS.LONG_DESCRIPTION}
                  value={data.longDescription}
                  onChange={(v) => onChange('longDescription', v)}
                />
              </FormField>
            </Grid>
          </Grid>
        </div>
      </div>
    </section>
  );
}

