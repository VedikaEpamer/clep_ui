import { useState } from 'react';
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
import type { Region, Country } from '../../../data/regionData';
import type { ImpactedLocation } from '../../../types/event.types';
import styles from './RegionAccordion.module.css';

// helpers
function getCountryLeafCodes(country: Country): string[] {
  if (country.subRegions && country.subRegions.length > 0) {
    return country.subRegions.map((sr) => `${country.code}-${sr.code}`);
  }
  return [country.code];
}
function getRegionLeafCodes(region: Region): string[] {
  return region.countries.flatMap(getCountryLeafCodes);
}

interface CountryAccordionProps {
  country: Country;
  regionId: string;
  selectedCodes: string[];
  onChange: (regionId: string, code: string, checked: boolean) => void;
}

function CountryAccordion({ country, regionId, selectedCodes, onChange }: CountryAccordionProps) {
  const leafCodes = getCountryLeafCodes(country);
  const selectedLeaves = leafCodes.filter((c) => selectedCodes.includes(c));
  const allChecked = selectedLeaves.length === leafCodes.length;
  const someChecked = selectedLeaves.length > 0 && !allChecked;

  const handleCountryToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (allChecked) {
      leafCodes.forEach((c) => onChange(regionId, c, false));
    } else {
      leafCodes.forEach((c) => {
        if (!selectedCodes.includes(c)) onChange(regionId, c, true);
      });
    }
  };

  if (country.subRegions && country.subRegions.length > 0) {
    return (
      <Accordion disableGutters elevation={0} className={styles.countryAccordion}
        sx={{ '&::before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon fontSize="small" />}
          className={styles.countrySummary}
          sx={{ '& .MuiAccordionSummary-content': { alignItems: 'center', gap: 0.5, my: '4px' } }}>
          <Checkbox size="small" checked={allChecked} indeterminate={someChecked}
            onClick={handleCountryToggle} sx={{ p: 0.5 }} />
          <Typography className={styles.countryLabel}>{country.name}</Typography>
          {selectedLeaves.length > 0 && (
            <Typography variant="caption" className={styles.subCount}>
              {selectedLeaves.length} {country.code === 'US' ? 'state(s)' : 'province(s)'}
            </Typography>
          )}
        </AccordionSummary>
        <AccordionDetails className={styles.stateDetails}>
          <div className={styles.stateGrid}>
            {country.subRegions.map((sr) => {
              const code = `${country.code}-${sr.code}`;
              return (
                <FormControlLabel key={code}
                  control={<Checkbox size="small" checked={selectedCodes.includes(code)}
                    onChange={(e) => onChange(regionId, code, e.target.checked)} />}
                  label={<Typography className={styles.stateLabel}>{sr.name}</Typography>}
                  className={styles.stateItem} />
              );
            })}
          </div>
        </AccordionDetails>
      </Accordion>
    );
  }

  return (
    <FormControlLabel
      control={<Checkbox size="small" checked={selectedCodes.includes(country.code)}
        onChange={(e) => onChange(regionId, country.code, e.target.checked)} />}
      label={<Typography className={styles.countryLabel}>{country.name}</Typography>}
      className={styles.simpleCountryItem} />
  );
}

interface RegionAccordionProps {
  region: Region;
  selected: ImpactedLocation[];
  onChange: (regionId: string, countryCode: string, checked: boolean) => void;
}
export default function RegionAccordion({ region, selected, onChange }: RegionAccordionProps) {
  const regionEntry = selected.find((r) => r.region === region.id);
  const selectedCodes = regionEntry?.countries ?? [];
  const allLeafCodes = getRegionLeafCodes(region);
  const allSelected = allLeafCodes.every((c) => selectedCodes.includes(c));
  const someSelected = allLeafCodes.some((c) => selectedCodes.includes(c)) && !allSelected;
  const [expanded, setExpanded] = useState(false);

  const handleRegionToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (allSelected) {
      allLeafCodes.forEach((c) => onChange(region.id, c, false));
    } else {
      allLeafCodes.forEach((c) => {
        if (!selectedCodes.includes(c)) onChange(region.id, c, true);
      });
    }
  };

  return (
    <Accordion disableGutters elevation={0} expanded={expanded}
      onChange={(_, isExpanded) => setExpanded(isExpanded)}
      className={styles.accordion}
      sx={{ '&:not(:last-child)': { borderBottom: 0 }, '&::before': { display: 'none' } }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} className={styles.summary}
        sx={{ '& .MuiAccordionSummary-content': { alignItems: 'center', gap: 1, my: '6px' } }}>
        <Checkbox size="small" checked={allSelected} indeterminate={someSelected}
          onClick={handleRegionToggle} sx={{ p: 0.5 }} />
        <Typography className={styles.regionLabel}>{region.label}</Typography>
        {selectedCodes.length > 0 && (
          <Typography variant="caption" className={styles.selectedCount}>
            {REGION_LABELS.SELECTED_COUNT(selectedCodes.length)}
          </Typography>
        )}
      </AccordionSummary>
      <AccordionDetails className={styles.details}>
        {region.countries.map((country) => (
          <CountryAccordion key={country.code} country={country} regionId={region.id}
            selectedCodes={selectedCodes} onChange={onChange} />
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
