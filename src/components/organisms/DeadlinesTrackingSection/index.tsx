import SectionHeader from "../../molecules/SectionHeader";
import SectionDescription from "../../molecules/SectionDescription";
import FormField from "../../molecules/FormField";
import AppTextField from "../../atoms/AppTextField";
import {
  STEP_LABELS,
  SECTION_LABELS,
  FIELD_LABELS,
  PLACEHOLDERS,
} from "../../../constants/uiLabels";
import type { EventFormData } from "../../../types/event.types";
import { FUNCTIONAL_TEAMS, EXECUTIVE_AREAS } from "../../../data/regionData";
import sectionStyles from "../shared/section.module.css";
import styles from "./DeadlinesTrackingSection.module.css";

interface DeadlinesTrackingSectionProps {
  data: EventFormData;
  onChange: (field: keyof EventFormData, value: string) => void;
  onTrackImmediately: (val: boolean) => void;
  onFunctionalTeamToggle: (id: string) => void;
  onExecutiveAreaToggle: (id: string) => void;
  isActive: boolean;
}

/** Organism – Step 5: Deadlines & Operational Tracking */
export default function DeadlinesTrackingSection({
  data,
  onChange,
  onTrackImmediately,
  onFunctionalTeamToggle,
  onExecutiveAreaToggle,
  isActive,
}: DeadlinesTrackingSectionProps) {
  const selectedTeams = FUNCTIONAL_TEAMS.filter((t) =>
    data.functionalTeams.includes(t.id),
  );

  const selectedAreas = EXECUTIVE_AREAS.filter((a) =>
    data.executiveAreas.includes(a.id),
  );

  const allSelected = [...selectedTeams, ...selectedAreas];

  return (
    <section className={sectionStyles.card}>
      <SectionHeader
        stepNumber={5}
        title={STEP_LABELS.DEADLINES_TRACKING}
        isEditing={isActive}
      />

      <div className={sectionStyles.body}>
        <SectionDescription
          bordered
          title={SECTION_LABELS.DEADLINES_HEADING}
          description={SECTION_LABELS.DEADLINES_DESCRIPTION}
        />

        <div className={sectionStyles.fieldsBlockBlue}>
        <div className={styles.sectionsStack}>
          {/* ── Track Immediately ──────────────────────────────────────────── */}
          <label className={styles.trackBox}>
            <input
              type="checkbox"
              className={styles.trackCheckbox}
              checked={data.trackImmediately}
              onChange={(e) => onTrackImmediately(e.target.checked)}
            />
            <div>
              <div className={styles.trackLabel}>
                {SECTION_LABELS.TRACK_IMMEDIATELY_LABEL}
              </div>
              <div className={styles.trackDesc}>
                {SECTION_LABELS.TRACK_IMMEDIATELY_DESCRIPTION}
              </div>
            </div>
          </label>

          {/* ── Operational Summary ────────────────────────────────────────── */}
          <FormField label={FIELD_LABELS.OPERATIONAL_SUMMARY}>
            <AppTextField
              multiline
              rows={3}
              placeholder={PLACEHOLDERS.NOTES}
              value={data.operationalSummary}
              onChange={(v) => onChange("operationalSummary", v)}
            />
          </FormField>

          {/* ── Workflow Deadlines ─────────────────────────────────────────── */}
          <div>
            <div className={styles.subHeading}>
              {SECTION_LABELS.WORKFLOW_DEADLINES_HEADING}
            </div>
            <div className={styles.deadlinesGrid}>
              <FormField label={FIELD_LABELS.HIGH_LEVEL_EXPOSURE_DEADLINE}>
                <AppTextField
                  type="date"
                  value={data.highLevelExposureDeadline}
                  onChange={(v) => onChange("highLevelExposureDeadline", v)}
                />
              </FormField>
              <FormField label={FIELD_LABELS.CONTRACT_LEVEL_DEADLINE}>
                <AppTextField
                  type="date"
                  value={data.contractLevelDeadline}
                  onChange={(v) => onChange("contractLevelDeadline", v)}
                />
              </FormField>
              <FormField label={FIELD_LABELS.RESERVING_EXTRACT_DEADLINE}>
                <AppTextField
                  type="date"
                  value={data.reservingExtractDeadline}
                  onChange={(v) => onChange("reservingExtractDeadline", v)}
                />
              </FormField>
              <FormField label={FIELD_LABELS.CAT_MODEL_RUN_DEADLINE}>
                <AppTextField
                  type="date"
                  value={data.catModelRunDeadline}
                  onChange={(v) => onChange("catModelRunDeadline", v)}
                />
              </FormField>
            </div>
          </div>

          {/* ── Functional Teams ──────────────────────────────────────────── */}
          <div>
            <div className={styles.subHeading}>
              {SECTION_LABELS.FUNCTIONAL_TEAMS_HEADING}
            </div>
            <div className={styles.subDesc}>
              {SECTION_LABELS.FUNCTIONAL_TEAMS_DESCRIPTION}
            </div>
            <div className={styles.checkboxGrid}>
              {FUNCTIONAL_TEAMS.map((team) => {
                const checked = data.functionalTeams.includes(team.id);
                return (
                  <label
                    key={team.id}
                    className={`${styles.checkboxCard}${checked ? ` ${styles.selected}` : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onFunctionalTeamToggle(team.id)}
                    />
                    <div>
                      <div className={styles.cardName}>{team.name}</div>
                      <div className={styles.cardSub}>{team.members}</div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* ── Executive Areas ────────────────────────────────────────────── */}
          <div>
            <div className={styles.subHeading}>
              {SECTION_LABELS.EXECUTIVE_AREAS_HEADING}
            </div>
            <div className={styles.subDesc}>
              {SECTION_LABELS.EXECUTIVE_AREAS_DESCRIPTION}
            </div>
            <div className={styles.checkboxGrid}>
              {EXECUTIVE_AREAS.map((area) => {
                const checked = data.executiveAreas.includes(area.id);
                return (
                  <label
                    key={area.id}
                    className={`${styles.checkboxCard}${checked ? ` ${styles.selected}` : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onExecutiveAreaToggle(area.id)}
                    />
                    <div>
                      <div className={styles.cardName}>{area.name}</div>
                      <div className={styles.cardSub}>Lead: {area.lead}</div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* ── Additional Recipients ─────────────────────────────────────── */}
          <div>
            <div className={styles.subHeading}>
              {SECTION_LABELS.ADDITIONAL_RECIPIENTS_LABEL}
            </div>
            <input
              type="text"
              className={styles.recipientsInput}
              placeholder="Search or enter email addresses..."
              value={data.additionalRecipients}
              onChange={(e) => onChange("additionalRecipients", e.target.value)}
            />
            <div className={styles.recipientsDesc}>
              {SECTION_LABELS.ADDITIONAL_RECIPIENTS_DESCRIPTION}
            </div>
          </div>

          {/* ── Notification Summary ──────────────────────────────────────── */}
          <div className={styles.summaryBox}>
            <div className={styles.summaryHeading}>
              {SECTION_LABELS.NOTIFICATION_SUMMARY_HEADING}
            </div>
            {allSelected.length === 0 ? (
              <div className={styles.summaryEmpty}>
                No teams or areas selected yet.
              </div>
            ) : (
              <div className={styles.summaryGroups}>
                {selectedTeams.length > 0 && (
                  <div className={styles.summaryGroup}>
                    <div className={styles.summaryGroupLabel}>
                      Functional Teams ({selectedTeams.length}):
                    </div>
                    <div className={styles.summaryTagList}>
                      {selectedTeams.map((team) => (
                        <span key={team.id} className={styles.summaryTag}>
                          {team.name} (Lead: {team.members.split(',')[0].trim()})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {selectedAreas.length > 0 && (
                  <div className={styles.summaryGroup}>
                    <div className={styles.summaryGroupLabel}>
                      Executive Areas ({selectedAreas.length}):
                    </div>
                    <div className={styles.summaryTagList}>
                      {selectedAreas.map((area) => (
                        <span key={area.id} className={styles.summaryTag}>
                          {area.name} (Lead: {area.lead})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
