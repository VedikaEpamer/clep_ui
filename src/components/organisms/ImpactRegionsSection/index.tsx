import { Typography } from '@mui/material';
import SectionHeader from '../../molecules/SectionHeader';
import SectionDescription from '../../molecules/SectionDescription';
import RegionAccordion from '../../molecules/RegionAccordion';
import {
  STEP_LABELS,
  SECTION_LABELS,
  FIELD_LABELS,
  REGION_LABELS,
} from '../../../constants/uiLabels';
import type { EventFormData, ImpactedLocation } from '../../../types/event.types';
import { REGIONS } from '../../../data/regionData';
import sectionStyles from '../shared/section.module.css';
import styles from './ImpactRegionsSection.module.css';

// Resolve a stored code (e.g. "US-CA") to a human-readable label
function resolveCode(code: string): string {
  if (code === 'GLOBAL') return 'Global';
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
  isActive: boolean;
}

/** Organism – Step 2: Impact Regions */
export default function ImpactRegionsSection({
  data,
  onRegionChange,
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
        <SectionDescription
          bordered
          title={SECTION_LABELS.IMPACT_REGIONS_HEADING}
          description={SECTION_LABELS.IMPACT_REGIONS_DESCRIPTION}
        />

        {/* ── Content block ── */}
        <div className={sectionStyles.fieldsBlock}>
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
          <Typography variant="caption" className={styles.accordionHelper}>
            {REGION_LABELS.ACCORDION_HELPER}
          </Typography>
        </div>
        </div>{/* end fieldsBlock */}

      </div>
    </section>
  );
}
