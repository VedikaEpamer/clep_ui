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
import {
  CAT_PREMIUM_OPTIONS,
  EVENT_TYPES,
  EVENT_SUB_TYPES,
  REPORTING_CURRENCIES,
} from '../../../data/regionData';
import sectionStyles from '../shared/section.module.css';

interface EventIdentitySectionProps {
  data: EventFormData;
  onChange: (field: keyof EventFormData, value: string) => void;
  isActive: boolean;
}

/** Organism – Step 1: Event Identity & Core Metadata form */
export default function EventIdentitySection({
  data,
  onChange,
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
        <p className={sectionStyles.sectionTitle}>{SECTION_LABELS.EVENT_IDENTITY_HEADING}</p>
        <p className={sectionStyles.sectionDescription}>{SECTION_LABELS.EVENT_IDENTITY_DESCRIPTION}</p>

        <Grid container spacing={2.5}>
          {/* Row 1: Status + ID */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label={FIELD_LABELS.EVENT_STATUS}
              value={data.eventStatus}
              slotProps={{ input: { readOnly: true } }}
              helperText={HELPER_TEXTS.EVENT_STATUS}
              sx={{ '& .MuiInputBase-root': { bgcolor: 'var(--color-readonly-bg)' } }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label={FIELD_LABELS.EVENT_ID}
              value={data.eventId}
              slotProps={{ input: { readOnly: true } }}
              sx={{ '& .MuiInputBase-root': { bgcolor: 'var(--color-readonly-bg)' } }}
            />
          </Grid>

          {/* Row 2: CAT Code + CAT Premium */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label={FIELD_LABELS.CAT_CODE}
              placeholder={PLACEHOLDERS.CAT_CODE}
              value={data.catCode}
              onChange={(e) => onChange('catCode', e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              fullWidth
              label={FIELD_LABELS.CAT_PREMIUM_ALLOCATION}
              value={data.catPremiumAllocation}
              onChange={(e) => onChange('catPremiumAllocation', e.target.value)}
            >
              <MenuItem value=""><em>{SELECT_DEFAULTS.PREMIUM_STATUS}</em></MenuItem>
              {CAT_PREMIUM_OPTIONS.map((opt) => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Row 3: Event Name */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label={FIELD_LABELS.EVENT_NAME}
              placeholder={PLACEHOLDERS.EVENT_NAME}
              value={data.eventName}
              onChange={(e) => onChange('eventName', e.target.value)}
            />
          </Grid>

          {/* Row 4: Event Type + Sub-Type */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              fullWidth
              label={FIELD_LABELS.EVENT_TYPE}
              value={data.eventType}
              onChange={(e) => {
                onChange('eventType', e.target.value);
                onChange('eventSubType', '');
              }}
            >
              <MenuItem value=""><em>{SELECT_DEFAULTS.EVENT_TYPE}</em></MenuItem>
              {EVENT_TYPES.map((t) => (
                <MenuItem key={t} value={t}>{t}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              fullWidth
              label={FIELD_LABELS.EVENT_SUB_TYPE}
              value={data.eventSubType}
              onChange={(e) => onChange('eventSubType', e.target.value)}
              disabled={!data.eventType}
            >
              <MenuItem value=""><em>{SELECT_DEFAULTS.SUB_TYPE}</em></MenuItem>
              {subTypes.map((st) => (
                <MenuItem key={st} value={st}>{st}</MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Row 5: Event Date + Affected Year */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label={FIELD_LABELS.EVENT_DATE}
              type="date"
              value={data.eventDate}
              onChange={(e) => onChange('eventDate', e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label={FIELD_LABELS.AFFECTED_YEAR}
              placeholder={PLACEHOLDERS.AFFECTED_YEAR}
              value={data.affectedYear}
              onChange={(e) => onChange('affectedYear', e.target.value)}
            />
          </Grid>

          {/* Row 6: Reporting Currency + Underwriting Year */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              fullWidth
              label={FIELD_LABELS.REPORTING_CURRENCY}
              value={data.reportingCurrency}
              onChange={(e) => onChange('reportingCurrency', e.target.value)}
            >
              <MenuItem value=""><em>{SELECT_DEFAULTS.CURRENCY}</em></MenuItem>
              {REPORTING_CURRENCIES.map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label={FIELD_LABELS.UNDERWRITING_YEAR}
              placeholder={PLACEHOLDERS.UNDERWRITING_YEAR}
              value={data.underwritingYear}
              onChange={(e) => onChange('underwritingYear', e.target.value)}
            />
          </Grid>

          {/* Row 7: Description */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label={FIELD_LABELS.EVENT_DESCRIPTION}
              multiline
              rows={3}
              placeholder={PLACEHOLDERS.EVENT_DESCRIPTION}
              value={data.eventDescription}
              onChange={(e) => onChange('eventDescription', e.target.value)}
            />
          </Grid>
        </Grid>
      </div>
    </section>
  );
}
