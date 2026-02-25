import { Chip, Typography } from '@mui/material';
import clsx from 'clsx';
import SectionHeader from '../../molecules/SectionHeader';
import RegionAccordion from '../../molecules/RegionAccordion';
import {
  STEP_LABELS,
  SECTION_LABELS,
  FIELD_LABELS,
  REGION_LABELS,
} from '../../../constants/uiLabels';
import type { EventFormData, ImpactedLocation } from '../../../types/event.types';
import { REGIONS, PERILS } from '../../../data/regionData';
import sectionStyles from '../shared/section.module.css';
import styles from './ImpactRegionsSection.module.css';

// Resolve a stored code (e.g. "US-CA") to a human-readable label
function resolveCode(code: string): string {
  if (code.includes('-')) {
    const [countryCode, srCode] = code.split('-');
    for (const region of REGIONS) {
      const country = region.countries.find((c) => c.code === countryCode);
      if (country?.subRegions) {
        const sr = country.subRegions.find((s) => s.code === srCode);
        if (sr) return `${sr.name}`;
      }
    }
    return code;
  }
  for (const region of REGIONS) {
    const country = region.countries.find((c) => c.code === code);
    if (country) return country.name;
  }
  return code;
}

interface ImpactRegionsSectionProps {
  data: EventFormData;
  onRegionChange: (regionId: string, countryCode: string, checked: boolean) => void;
  onPerilToggle: (peril: string) => void;
  isActive: boolean;
}

/** Organism – Step 2: Impact Regions & Perils */
export default function ImpactRegionsSection({
  data,
  onRegionChange,
  onPerilToggle,
  isActive,
}: ImpactRegionsSectionProps) {
  const allSelectedCodes = data.impactedRegions.flatMap((r: ImpactedLocation) => r.countries);
  const totalSelected = allSelectedCodes.length;

  return (
    <section className={sectionStyles.card}>
      <SectionHeader
        stepNumber={2}
        title={STEP_LABELS.IMPACT_REGIONS_PERILS}
        isEditing={isActive}
      />

      <div className={sectionStyles.body}>
        <p className={sectionStyles.sectionTitle}>{SECTION_LABELS.IMPACT_REGIONS_HEADING}</p>
        <p className={sectionStyles.sectionDescription}>{SECTION_LABELS.IMPACT_REGIONS_DESCRIPTION}</p>

        {/* ── Selected-regions chip display ── */}
        <div className={styles.selectedChipsBar}>
          <Typography variant="caption" className={styles.chipsBarLabel}>
            {REGION_LABELS.IMPACTED_REGIONS_CHIPS}
          </Typography>
          <div className={styles.chipsRow}>
            {totalSelected === 0 ? (
              <Typography variant="caption" className={styles.chipsEmpty}>
                No regions selected yet
              </Typography>
            ) : (
              allSelectedCodes.map((code) => (
                <span key={code} className={styles.selectedChip}>
                  {resolveCode(code)}
                </span>
              ))
            )}
          </div>
        </div>

        {/* Impacted Regions accordion */}
        <div>
          <div className={styles.regionsHeader}>
            <Typography variant="body2" className={styles.regionsLabel}>
              {FIELD_LABELS.IMPACTED_REGIONS}
            </Typography>
            <Typography variant="caption" className={styles.locationsCount}>
              {REGION_LABELS.LOCATIONS_SELECTED(totalSelected)}
            </Typography>
          </div>

          <div className={styles.regionsWrapper}>
            {REGIONS.map((region) => (
              <RegionAccordion
                key={region.id}
                region={region}
                selected={data.impactedRegions}
                onChange={onRegionChange}
              />
            ))}
          </div>
        </div>

        {/* Perils */}
        <div>
          <Typography variant="body2" className={styles.perilsLabel}>
            {FIELD_LABELS.PERILS}
          </Typography>
          <div className={styles.perilsGrid}>
            {PERILS.map((peril) => {
              const selected = data.perils.includes(peril);
              return (
                <Chip
                  key={peril}
                  label={peril}
                  onClick={() => onPerilToggle(peril)}
                  variant={selected ? 'filled' : 'outlined'}
                  className={clsx({
                    [styles['perilChip--selected']]: selected,
                    [styles['perilChip--unselected']]: !selected,
                  })}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
