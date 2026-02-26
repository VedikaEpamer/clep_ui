import { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  Typography,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PublicIcon from '@mui/icons-material/Public';
import { REGION_LABELS } from '../../../constants/uiLabels';
import type { Region, Country } from '../../../data/regionData';
import type { ImpactedLocation } from '../../../types/event.types';
import styles from './RegionAccordion.module.css';

// ── Expand icon SX (chevron-right rotates 90deg when open) ────────────────────
const expandSx = {
  flexDirection: 'row-reverse' as const,
  '& .MuiAccordionSummary-expandIconWrapper': { transform: 'rotate(0deg)', transition: 'transform 0.2s' },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': { transform: 'rotate(90deg)' },
  '& .MuiAccordionSummary-content': { alignItems: 'center', marginLeft: '6px', my: '4px' },
};

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
        <AccordionSummary
          expandIcon={<ChevronRightIcon fontSize="small" className={styles.chevron} />}
          className={styles.countrySummary}
          sx={{
            ...expandSx,
            '& .MuiAccordionSummary-content': { alignItems: 'center', marginLeft: '4px', my: '3px' },
          }}
        >
          <Typography className={styles.countryLabel}>{country.name}</Typography>
          {selectedLeaves.length > 0 && (
            <Typography variant="caption" className={styles.subCount}>
              {selectedLeaves.length} {country.code === 'US' ? 'state(s)' : 'province(s)'}
            </Typography>
          )}
          <Checkbox
            size="small"
            checked={allChecked}
            indeterminate={someChecked}
            onClick={handleCountryToggle}
            sx={{ p: 0.5, ml: 'auto' }}
          />
        </AccordionSummary>
        <AccordionDetails className={styles.stateDetails}>
          {country.subRegions.map((sr) => {
            const code = `${country.code}-${sr.code}`;
            return (
              <div key={code} className={styles.stateRow}>
                <Typography className={styles.stateLabel}>{sr.name}</Typography>
                <Checkbox
                  size="small"
                  checked={selectedCodes.includes(code)}
                  onChange={(e) => onChange(regionId, code, e.target.checked)}
                  sx={{ p: 0.5 }}
                />
              </div>
            );
          })}
        </AccordionDetails>
      </Accordion>
    );
  }

  return (
    <div className={styles.simpleCountryItem}>
      <Typography className={styles.countryLabel}>{country.name}</Typography>
      <Checkbox
        size="small"
        checked={selectedCodes.includes(country.code)}
        onChange={(e) => onChange(regionId, country.code, e.target.checked)}
        sx={{ p: 0.5 }}
      />
    </div>
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

  // ── GLOBAL: simple non-expandable row with globe icon ─────────────────────
  if (region.isGlobal) {
    const isChecked = selectedCodes.includes('GLOBAL');
    return (
      <div className={styles.globalRow}>
        <PublicIcon fontSize="small" className={styles.globalIcon} />
        <Typography className={styles.regionLabel}>{region.label}</Typography>
        <Checkbox
          size="small"
          checked={isChecked}
          onChange={(e) => onChange(region.id, 'GLOBAL', e.target.checked)}
          sx={{ p: 0.5, ml: 'auto', mr: 0 }}
        />
      </div>
    );
  }

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
      <AccordionSummary
        expandIcon={<ChevronRightIcon className={styles.chevron} />}
        className={styles.summary}
        sx={expandSx}
      >
        <Typography className={styles.regionLabel}>{region.label}</Typography>
        {selectedCodes.length > 0 && (
          <Typography variant="caption" className={styles.selectedCount}>
            {REGION_LABELS.SELECTED_COUNT(selectedCodes.length)}
          </Typography>
        )}
        <Checkbox
          size="small"
          checked={allSelected}
          indeterminate={someSelected}
          onClick={handleRegionToggle}
          sx={{ p: 0.5, ml: 'auto' }}
        />
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


