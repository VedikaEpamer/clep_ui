import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { REGION_LABELS } from '../../../constants/uiLabels';
import type { Region } from '../../../data/regionData';
import type { ImpactedLocation } from '../../../types/event.types';
import styles from './RegionAccordion.module.css';

interface RegionAccordionProps {
  region: Region;
  selected: ImpactedLocation[];
  onChange: (regionId: string, countryCode: string, checked: boolean) => void;
}

/** Molecule – expandable region row with country checkboxes */
export default function RegionAccordion({ region, selected, onChange }: RegionAccordionProps) {
  const regionEntry = selected.find((r) => r.region === region.id);
  const selectedCountries = regionEntry?.countries ?? [];
  const allSelected = selectedCountries.length === region.countries.length;
  const someSelected = selectedCountries.length > 0 && !allSelected;

  const handleRegionToggle = () => {
    if (allSelected) {
      region.countries.forEach((c) => onChange(region.id, c.code, false));
    } else {
      region.countries.forEach((c) => {
        if (!selectedCountries.includes(c.code)) onChange(region.id, c.code, true);
      });
    }
  };

  return (
    <Accordion
      disableGutters
      elevation={0}
      className={styles.accordion}
      sx={{ '&:not(:last-child)': { borderBottom: 0 } }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        className={styles.summary}
        sx={{ '& .MuiAccordionSummary-content': { alignItems: 'center', gap: 1 } }}
      >
        <Checkbox
          size="small"
          checked={allSelected}
          indeterminate={someSelected}
          onClick={(e) => { e.stopPropagation(); handleRegionToggle(); }}
          sx={{ p: 0.5 }}
        />
        <Typography className={styles.regionLabel}>{region.label}</Typography>
        {selectedCountries.length > 0 && (
          <Typography variant="caption" className={styles.selectedCount}>
            {REGION_LABELS.SELECTED_COUNT(selectedCountries.length)}
          </Typography>
        )}
      </AccordionSummary>
      <AccordionDetails className={styles.details}>
        <div className={styles.countryGrid}>
          {region.countries.map((country) => (
            <FormControlLabel
              key={country.code}
              control={
                <Checkbox
                  size="small"
                  checked={selectedCountries.includes(country.code)}
                  onChange={(e) => onChange(region.id, country.code, e.target.checked)}
                />
              }
              label={<Typography className={styles.countryLabel}>{country.name}</Typography>}
              className={styles.countryItem}
            />
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
