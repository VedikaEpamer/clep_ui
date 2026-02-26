import { TextField, MenuItem, InputAdornment } from '@mui/material';
import SectionHeader from '../../molecules/SectionHeader';
import SectionDescription from '../../molecules/SectionDescription';
import {
  STEP_LABELS,
  SECTION_LABELS,
  FIELD_LABELS,
  PLACEHOLDERS,
} from '../../../constants/uiLabels';
import type { EventFormData } from '../../../types/event.types';
import { INDUSTRY_LOSS_SOURCES, SEVERITY_LEVELS } from '../../../data/regionData';
import sectionStyles from '../shared/section.module.css';
import styles from './IndustryMarketLossSection.module.css';

interface IndustryMarketLossSectionProps {
  data: EventFormData;
  onChange: (field: keyof EventFormData, value: string) => void;
  isActive: boolean;
}

const SEVERITY_ACTIVE_CLASS: Record<string, string> = {
  Minor:        styles.severityMinor,
  Moderate:     styles.severityModerate,
  Major:        styles.severityMajor,
  Severe:       styles.severitySevere,
  Catastrophic: styles.severityCatastrophic,
};

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
          title={SECTION_LABELS.MARKET_LOSS_HEADING}
          description={SECTION_LABELS.MARKET_LOSS_DESCRIPTION}
        />

        <div className={sectionStyles.fieldsBlock}>

          {/* ── Three estimate inputs ── */}
          <div className={styles.estimatesGrid}>
            {(
              [
                { label: FIELD_LABELS.LOW_ESTIMATE,    field: 'lowEstimate'    },
                { label: FIELD_LABELS.MEDIUM_ESTIMATE, field: 'mediumEstimate' },
                { label: FIELD_LABELS.HIGH_ESTIMATE,   field: 'highEstimate'   },
              ] as { label: string; field: keyof EventFormData }[]
            ).map(({ label, field }) => (
              <div key={field}>
                <span className={styles.fieldLabel}>{label}</span>
                <TextField
                  fullWidth
                  size="small"
                  placeholder={PLACEHOLDERS.ESTIMATE_VALUE}
                  value={data[field] as string}
                  onChange={(e) => onChange(field, e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">millions</InputAdornment>
                    ),
                  }}
                />
              </div>
            ))}
          </div>

          {/* ── Estimate Source ── */}
          <div className={styles.fullRow}>
            <span className={styles.fieldLabel}>{FIELD_LABELS.ESTIMATE_SOURCE}</span>
            <TextField
              select
              fullWidth
              size="small"
              value={data.estimateSource}
              onChange={(e) => onChange('estimateSource', e.target.value)}
            >
              {INDUSTRY_LOSS_SOURCES.map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </TextField>
          </div>

          {/* ── Severity Level ── */}
          <div className={styles.fullRow}>
            <span className={styles.fieldLabel}>{FIELD_LABELS.SEVERITY_LEVEL}</span>
            <div className={styles.severityGroup}>
              {SEVERITY_LEVELS.map((level) => {
                const isActive = data.severityLevel === level;
                const cls = [
                  styles.severityBtn,
                  isActive ? styles.severityBtnActive : '',
                  isActive ? SEVERITY_ACTIVE_CLASS[level] : '',
                ].filter(Boolean).join(' ');
                return (
                  <button
                    key={level}
                    type="button"
                    className={cls}
                    onClick={() => onChange('severityLevel', level)}
                  >
                    {level}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Comments & Caveats ── */}
          <div className={styles.commentsRow}>
            <span className={styles.fieldLabel}>{FIELD_LABELS.MARKET_LOSS_COMMENTS}</span>
            <TextField
              fullWidth
              multiline
              rows={4}
              size="small"
              placeholder={PLACEHOLDERS.MARKET_LOSS_COMMENTS}
              value={data.marketLossComments}
              onChange={(e) => onChange('marketLossComments', e.target.value)}
            />
          </div>

          {/* ── Info box ── */}
          <div className={styles.infoBox}>
            <p className={styles.infoTitle}>{SECTION_LABELS.MARKET_LOSS_INFO_TITLE}</p>
            <p className={styles.infoText}>
              {SECTION_LABELS.MARKET_LOSS_INFO_DESCRIPTION}
            </p>
          </div>

        </div>{/* end fieldsBlock */}
      </div>
    </section>
  );
}
