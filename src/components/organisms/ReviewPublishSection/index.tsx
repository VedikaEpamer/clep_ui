import { Typography, Button } from '@mui/material';
import RateReviewIcon from '@mui/icons-material/RateReview';
import type { EventFormData } from '../../../types/event.types';
import { REVIEW_LABELS, BUTTON_LABELS, FIELD_LABELS } from '../../../constants/uiLabels';
import { REGIONS } from '../../../data/regionData';
import styles from './ReviewPublishSection.module.css';

interface ReviewPublishSectionProps {
  data: EventFormData;
  onPublish: () => void;
  onSaveDraft: () => void;
}

// helper
const val = (v: string | undefined) =>
  v && v.trim() ? v : <span className={styles.empty}>{REVIEW_LABELS.NOT_PROVIDED}</span>;

/** Helper: build a human-readable label for a selected code (e.g. "US-CA" → "California, US") */
function resolveLocationLabel(code: string): string {
  // compound code e.g. "US-CA"
  if (code.includes('-')) {
    const [countryCode, srCode] = code.split('-');
    for (const region of REGIONS) {
      const country = region.countries.find((c) => c.code === countryCode);
      if (country?.subRegions) {
        const sr = country.subRegions.find((s) => s.code === srCode);
        if (sr) return `${sr.name} (${countryCode})`;
      }
    }
    return code;
  }
  // plain country code
  for (const region of REGIONS) {
    const country = region.countries.find((c) => c.code === code);
    if (country) return country.name;
  }
  return code;
}

interface ReviewRowProps { label: string; value: React.ReactNode }
function ReviewRow({ label, value }: ReviewRowProps) {
  return (
    <div className={styles.row}>
      <Typography className={styles.label}>{label}</Typography>
      <Typography className={styles.value}>{value}</Typography>
    </div>
  );
}

interface ReviewGroupProps {
  title: string;
  children: React.ReactNode;
}
function ReviewGroup({ title, children }: ReviewGroupProps) {
  return (
    <div className={styles.group}>
      <Typography className={styles.groupTitle}>{title}</Typography>
      {children}
    </div>
  );
}

/** Organism – Review & Publish summary (not a numbered step) */
export default function ReviewPublishSection({
  data,
  onPublish,
  onSaveDraft,
}: ReviewPublishSectionProps) {
  // Flatten all selected region codes for display
  const allSelectedCodes = data.impactedRegions.flatMap((r) => r.countries);

  return (
    <section className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <RateReviewIcon sx={{ color: '#fff' }} />
        <Typography className={styles.headerTitle}>{REVIEW_LABELS.SECTION_TITLE}</Typography>
        <Typography className={styles.headerDesc}>{REVIEW_LABELS.SECTION_DESCRIPTION}</Typography>
      </div>

      <div className={styles.body}>
        {/* Step 1 */}
        <ReviewGroup title={REVIEW_LABELS.GROUP_EVENT_IDENTITY}>
          <div className={styles.grid}>
            <ReviewRow label={FIELD_LABELS.EVENT_STATUS} value={val(data.eventStatus)} />
            <ReviewRow label={FIELD_LABELS.EVENT_ID} value={val(data.eventId)} />
            <ReviewRow label={FIELD_LABELS.EVENT_NAME} value={val(data.eventName)} />
            <ReviewRow label={FIELD_LABELS.CAT_CODE} value={val(data.catCode)} />
            <ReviewRow label={FIELD_LABELS.CAT_PREMIUM_ALLOCATION} value={val(data.catPremiumAllocation)} />
            <ReviewRow label={FIELD_LABELS.EVENT_TYPE} value={val(data.eventType)} />
            <ReviewRow label={FIELD_LABELS.EVENT_SUB_TYPE} value={val(data.eventSubType)} />
            <ReviewRow label={FIELD_LABELS.PRIMARY_PERIL} value={val(data.primaryPeril)} />
            <ReviewRow label={FIELD_LABELS.BUSINESS_GROUPS} value={val(data.businessGroups.join(', '))} />
            <ReviewRow label={FIELD_LABELS.EVENT_DATE} value={val(data.eventDate)} />
            <ReviewRow label={FIELD_LABELS.LOSS_START_DATE} value={val(data.lossStartDate)} />
            <ReviewRow label={FIELD_LABELS.LOSS_END_DATE} value={val(data.lossEndDate)} />
            <ReviewRow label={FIELD_LABELS.SHORT_DESCRIPTION} value={val(data.shortDescription)} />
            <ReviewRow label={FIELD_LABELS.LONG_DESCRIPTION} value={val(data.longDescription)} />
          </div>
        </ReviewGroup>

        {/* Step 2 */}
        <ReviewGroup title={REVIEW_LABELS.GROUP_IMPACT}>
          <div className={styles.row} style={{ borderTop: '1px solid var(--color-border-light)' }}>
            <Typography className={styles.label}>{REVIEW_LABELS.REGIONS_LABEL}</Typography>
            {allSelectedCodes.length === 0 ? (
              <Typography className={`${styles.value} ${styles.empty}`}>
                {REVIEW_LABELS.NOT_PROVIDED}
              </Typography>
            ) : (
              <div className={styles.chipList} style={{ padding: 0, paddingTop: 4 }}>
                {allSelectedCodes.map((code) => (
                  <span key={code} className={styles.chip}>{resolveLocationLabel(code)}</span>
                ))}
              </div>
            )}
          </div>
          <div className={styles.row}>
            <Typography className={styles.label}>{REVIEW_LABELS.PERILS_LABEL}</Typography>
            {data.perils.length === 0 ? (
              <Typography className={`${styles.value} ${styles.empty}`}>
                {REVIEW_LABELS.NOT_PROVIDED}
              </Typography>
            ) : (
              <div className={styles.chipList} style={{ padding: 0, paddingTop: 4 }}>
                {data.perils.map((p) => (
                  <span key={p} className={styles.chip}>{p}</span>
                ))}
              </div>
            )}
          </div>
        </ReviewGroup>

        {/* Step 3 */}
        <ReviewGroup title={REVIEW_LABELS.GROUP_OTHER_IDS}>
          <div className={styles.grid}>
            <ReviewRow label={FIELD_LABELS.BROKER_EVENT_ID} value={val(data.brokerEventId)} />
            <ReviewRow label={FIELD_LABELS.MARKET_EVENT_ID} value={val(data.marketEventId)} />
            <ReviewRow label={FIELD_LABELS.CLIENT_EVENT_ID} value={val(data.clientEventId)} />
            <ReviewRow label={FIELD_LABELS.EXTERNAL_REFERENCE} value={val(data.externalReference)} />
          </div>
          {data.externalSources.length > 0 && (
            <div className={styles.chipList}>
              {data.externalSources.map((src) => (
                <span key={src.id} className={styles.chip}>
                  {src.sourceType}: {src.sourceId}
                </span>
              ))}
            </div>
          )}
        </ReviewGroup>

        {/* Step 4 */}
        <ReviewGroup title={REVIEW_LABELS.GROUP_INDUSTRY_LOSS}>
          <div className={styles.grid}>
            <ReviewRow label={FIELD_LABELS.INDUSTRY_LOSS_ESTIMATE} value={val(data.industrylossEstimate)} />
            <ReviewRow label={FIELD_LABELS.INDUSTRY_LOSS_SOURCE} value={val(data.industryLossSource)} />
            <ReviewRow label={FIELD_LABELS.INDUSTRY_LOSS_DATE} value={val(data.industryLossDate)} />
            <ReviewRow label={FIELD_LABELS.MARKET_SHARE} value={val(data.marketShare)} />
          </div>
        </ReviewGroup>

        {/* Step 5 */}
        <ReviewGroup title={REVIEW_LABELS.GROUP_DEADLINES}>
          <div className={styles.grid}>
            <ReviewRow label={FIELD_LABELS.LOSS_PICK_DEADLINE} value={val(data.lossPickDeadline)} />
            <ReviewRow label={FIELD_LABELS.FINAL_SUBMISSION_DEADLINE} value={val(data.finalSubmissionDeadline)} />
            <ReviewRow label={FIELD_LABELS.ASSIGNED_ANALYST} value={val(data.assignedAnalyst)} />
            <ReviewRow label={FIELD_LABELS.REVIEWER_NAME} value={val(data.reviewerName)} />
            <ReviewRow label={FIELD_LABELS.NOTES} value={val(data.notes)} />
          </div>
        </ReviewGroup>

        {/* Actions */}
        <div className={styles.footer}>
          <Button variant="outlined" className={styles.draftBtn} onClick={onSaveDraft}>
            {BUTTON_LABELS.SAVE_DRAFT}
          </Button>
          <Button variant="contained" className={styles.publishBtn} onClick={onPublish}>
            {BUTTON_LABELS.PUBLISH}
          </Button>
        </div>
      </div>
    </section>
  );
}
