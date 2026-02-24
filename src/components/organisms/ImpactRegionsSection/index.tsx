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
  const totalSelected = data.impactedRegions.reduce(
    (sum: number, r: ImpactedLocation) => sum + r.countries.length,
    0
  );

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

        {/* Impacted Regions */}
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
