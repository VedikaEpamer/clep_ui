import { useState } from 'react';
import { TextField, MenuItem, IconButton, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SectionHeader from '../../molecules/SectionHeader';
import SectionDescription from '../../molecules/SectionDescription';
import {
  STEP_LABELS,
  SECTION_LABELS,
  EXTERNAL_SOURCE_LABELS,
} from '../../../constants/uiLabels';
import type { EventFormData, ExternalSource } from '../../../types/event.types';
import { EXTERNAL_SOURCE_TYPES } from '../../../data/regionData';
import sectionStyles from '../shared/section.module.css';
import styles from './OtherIDsSection.module.css';

interface Row {
  localId: string;
  reduxId: string | null; // null = not yet synced to Redux
  sourceType: string;
  sourceId: string;
}

interface OtherIDsSectionProps {
  data: EventFormData;
  onAddSource: (source: ExternalSource) => void;
  onRemoveSource: (id: string) => void;
  isActive: boolean;
}

/** Organism – Step 3: Other IDs + External Sources */
export default function OtherIDsSection({
  data,
  onAddSource,
  onRemoveSource,
  isActive,
}: OtherIDsSectionProps) {
  const [rows, setRows] = useState<Row[]>(() =>
    // Initialise from Redux store (e.g. on re-mount)
    data.externalSources.map((s) => ({
      localId: s.id,
      reduxId: s.id,
      sourceType: s.sourceType,
      sourceId: s.sourceId,
    }))
  );

  const handleAddRow = () => {
    setRows((prev) => [
      ...prev,
      { localId: `local-${Date.now()}`, reduxId: null, sourceType: '', sourceId: '' },
    ]);
  };

  const handleRowChange = (localId: string, field: 'sourceType' | 'sourceId', value: string) => {
    setRows((prev) =>
      prev.map((row) => {
        if (row.localId !== localId) return row;

        const next = { ...row, [field]: value };
        const filled = next.sourceType.trim() !== '' && next.sourceId.trim() !== '';

        if (filled) {
          if (row.reduxId) {
            // Already committed — remove old entry, add updated one
            onRemoveSource(row.reduxId);
          }
          const newReduxId = `src-${Date.now()}`;
          onAddSource({ id: newReduxId, sourceType: next.sourceType.trim(), sourceId: next.sourceId.trim() });
          return { ...next, reduxId: newReduxId };
        }

        // If previously committed but now incomplete, remove from Redux
        if (row.reduxId) {
          onRemoveSource(row.reduxId);
          return { ...next, reduxId: null };
        }

        return next;
      })
    );
  };

  const handleRemoveRow = (localId: string) => {
    const row = rows.find((r) => r.localId === localId);
    if (row?.reduxId) onRemoveSource(row.reduxId);
    setRows((prev) => prev.filter((r) => r.localId !== localId));
  };

  const committedRows = rows.filter((r) => r.reduxId !== null);
  const isEmpty = rows.length === 0;

  return (
    <section className={sectionStyles.card}>
      <SectionHeader
        stepNumber={3}
        title={STEP_LABELS.OTHER_IDS}
        isEditing={isActive}
      />

      <div className={sectionStyles.body}>
        <SectionDescription
          bordered
          title={SECTION_LABELS.OTHER_IDS_HEADING}
          description={SECTION_LABELS.OTHER_IDS_DESCRIPTION}
        />

        <div className={sectionStyles.fieldsBlock}>

          {/* ── Editable rows ── */}
          {rows.length > 0 && (
            <div className={styles.rowsContainer}>
              {rows.map((row) => (
                <div key={row.localId} className={styles.entryRow}>
                  <div>
                    <span className={styles.rowHeaderLabel}>{EXTERNAL_SOURCE_LABELS.EXTERNAL_SOURCE_LABEL}</span>
                    <TextField
                      select
                      size="small"
                      value={row.sourceType}
                      onChange={(e) => handleRowChange(row.localId, 'sourceType', e.target.value)}
                      className={styles.sourceSelect}
                      SelectProps={{ displayEmpty: true }}
                      inputProps={{ 'aria-label': EXTERNAL_SOURCE_LABELS.EXTERNAL_SOURCE_LABEL }}
                    >
                      <MenuItem value="">
                        <em className={styles.placeholder}>{EXTERNAL_SOURCE_LABELS.SELECT_SOURCE_PLACEHOLDER}</em>
                      </MenuItem>
                      {EXTERNAL_SOURCE_TYPES.map((t) => (
                        <MenuItem key={t} value={t}>{t}</MenuItem>
                      ))}
                    </TextField>
                  </div>

                  <div>
                    <span className={styles.rowHeaderLabel}>{EXTERNAL_SOURCE_LABELS.EVENT_ID_LABEL}</span>
                    <TextField
                      size="small"
                      value={row.sourceId}
                      placeholder={EXTERNAL_SOURCE_LABELS.ENTER_EVENT_ID_PLACEHOLDER}
                      onChange={(e) => handleRowChange(row.localId, 'sourceId', e.target.value)}
                      className={styles.eventIdField}
                      inputProps={{ 'aria-label': EXTERNAL_SOURCE_LABELS.EVENT_ID_LABEL }}
                    />
                  </div>

                  <IconButton
                    size="small"
                    className={styles.deleteBtn}
                    onClick={() => handleRemoveRow(row.localId)}
                    aria-label="Remove row"
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </div>
              ))}
            </div>
          )}

          {/* ── Add External Event ID button ── */}
          <button type="button" className={styles.addDashedBtn} onClick={handleAddRow}>
            {EXTERNAL_SOURCE_LABELS.ADD_EXTERNAL_EVENT_ID}
          </button>

          {/* ── Empty state ── */}
          {isEmpty && (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>{EXTERNAL_SOURCE_LABELS.EMPTY_STATE_TITLE}</p>
              <p className={styles.emptySub}>{EXTERNAL_SOURCE_LABELS.EMPTY_STATE_SUB}</p>
            </div>
          )}

          {/* ── External IDs Summary ── */}
          {committedRows.length > 0 && (
            <div className={styles.summarySection}>
              <Typography className={styles.summaryTitle}>
                {EXTERNAL_SOURCE_LABELS.SUMMARY_SECTION_TITLE}
              </Typography>
              <div className={styles.summaryList}>
                {committedRows.map((row) => (
                  <div key={row.localId} className={styles.summaryItem}>
                    <span className={styles.summarySourceLabel}>{row.sourceType}</span>
                    <span className={styles.summaryId}>{row.sourceId}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>{/* end fieldsBlock */}
      </div>
    </section>
  );
}
