import { useState } from 'react';
import { Grid, TextField, MenuItem, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SectionHeader from '../../molecules/SectionHeader';
import {
  STEP_LABELS,
  SECTION_LABELS,
  FIELD_LABELS,
  PLACEHOLDERS,
  EXTERNAL_SOURCE_LABELS,
  SELECT_DEFAULTS,
  BUTTON_LABELS,
} from '../../../constants/uiLabels';
import type { EventFormData, ExternalSource } from '../../../types/event.types';
import { EXTERNAL_SOURCE_TYPES } from '../../../data/regionData';
import sectionStyles from '../shared/section.module.css';
import styles from './OtherIDsSection.module.css';

interface OtherIDsSectionProps {
  data: EventFormData;
  onChange: (field: keyof EventFormData, value: string) => void;
  onAddSource: (source: ExternalSource) => void;
  onRemoveSource: (id: string) => void;
  isActive: boolean;
}

/** Organism – Step 3: Other IDs + External Sources */
export default function OtherIDsSection({
  data,
  onChange,
  onAddSource,
  onRemoveSource,
  isActive,
}: OtherIDsSectionProps) {
  const [sourceType, setSourceType] = useState('');
  const [sourceId, setSourceId] = useState('');

  const handleAdd = () => {
    if (!sourceType.trim() || !sourceId.trim()) return;
    onAddSource({
      id: `src-${Date.now()}`,
      sourceType: sourceType.trim(),
      sourceId: sourceId.trim(),
    });
    setSourceType('');
    setSourceId('');
  };

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

        {/* ── Core reference IDs ── */}
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField fullWidth label={FIELD_LABELS.BROKER_EVENT_ID}
              placeholder={PLACEHOLDERS.BROKER_EVENT_ID} value={data.brokerEventId}
              onChange={(e) => onChange('brokerEventId', e.target.value)} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField fullWidth label={FIELD_LABELS.MARKET_EVENT_ID}
              placeholder={PLACEHOLDERS.MARKET_EVENT_ID} value={data.marketEventId}
              onChange={(e) => onChange('marketEventId', e.target.value)} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField fullWidth label={FIELD_LABELS.CLIENT_EVENT_ID}
              placeholder={PLACEHOLDERS.CLIENT_EVENT_ID} value={data.clientEventId}
              onChange={(e) => onChange('clientEventId', e.target.value)} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField fullWidth label={FIELD_LABELS.EXTERNAL_REFERENCE}
              placeholder={PLACEHOLDERS.EXTERNAL_REFERENCE} value={data.externalReference}
              onChange={(e) => onChange('externalReference', e.target.value)} />
          </Grid>
        </Grid>

        {/* ── External Sources ── */}
        <hr className={styles.divider} />

        <Typography className={styles.subSectionTitle}>
          {SECTION_LABELS.EXTERNAL_SOURCES_HEADING}
        </Typography>
        <Typography className={styles.subSectionDesc}>
          {SECTION_LABELS.EXTERNAL_SOURCES_DESCRIPTION}
        </Typography>

        {/* Add row */}
        <div className={styles.addRow}>
          <TextField
            select
            size="small"
            label={EXTERNAL_SOURCE_LABELS.SOURCE_TYPE}
            value={sourceType}
            onChange={(e) => setSourceType(e.target.value)}
          >
            <MenuItem value=""><em>{SELECT_DEFAULTS.SOURCE_TYPE}</em></MenuItem>
            {EXTERNAL_SOURCE_TYPES.map((t) => (
              <MenuItem key={t} value={t}>{t}</MenuItem>
            ))}
          </TextField>

          <TextField
            size="small"
            label={EXTERNAL_SOURCE_LABELS.SOURCE_ID}
            placeholder={EXTERNAL_SOURCE_LABELS.PLACEHOLDER_SOURCE_ID}
            value={sourceId}
            onChange={(e) => setSourceId(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleAdd(); }}
          />

          <Button
            variant="contained"
            size="small"
            className={styles.addBtn}
            startIcon={<AddIcon />}
            onClick={handleAdd}
            disabled={!sourceType || !sourceId.trim()}
          >
            {BUTTON_LABELS.ADD_SOURCE}
          </Button>
        </div>

        {/* Summary table */}
        <div className={styles.summaryWrapper}>
          <div className={styles.summaryHeader}>
            <Typography className={styles.summaryHeaderCell}>
              {EXTERNAL_SOURCE_LABELS.COLUMN_SOURCE_TYPE}
            </Typography>
            <Typography className={styles.summaryHeaderCell}>
              {EXTERNAL_SOURCE_LABELS.COLUMN_SOURCE_ID}
            </Typography>
            <Typography className={styles.summaryHeaderCell}>
              {EXTERNAL_SOURCE_LABELS.COLUMN_ACTIONS}
            </Typography>
          </div>

          {data.externalSources.length === 0 ? (
            <p className={styles.emptyNote}>{EXTERNAL_SOURCE_LABELS.SUMMARY_EMPTY}</p>
          ) : (
            data.externalSources.map((src) => (
              <div key={src.id} className={styles.summaryRow}>
                <Typography className={styles.summaryCell}>
                  <span className={styles.typeBadge}>{src.sourceType}</span>
                </Typography>
                <Typography className={styles.summaryCell}>{src.sourceId}</Typography>
                <Button
                  size="small"
                  className={styles.removeBtn}
                  onClick={() => onRemoveSource(src.id)}
                >
                  {BUTTON_LABELS.REMOVE}
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
