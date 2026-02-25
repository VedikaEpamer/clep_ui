import {
  Select,
  OutlinedInput,
  FormHelperText,
  FormControl,
  MenuItem,
  Checkbox,
  ListItemText,
  type SelectChangeEvent,
  type SxProps,
  type Theme,
} from '@mui/material';
import type { ReactNode, MouseEvent } from 'react';
import styles from './AppMultiSelect.module.css';

export interface AppMultiSelectProps {
  /** The list of selectable options */
  options: string[];
  /** Currently selected values */
  value: string[];
  /** Fires with the new full selection array */
  onChange: (values: string[]) => void;
  /** Shown inside the control when nothing is selected (default: 'Select...') */
  placeholder?: string;
  /** Helper / error text rendered below the control */
  helperText?: ReactNode;
  /** Stretch to fill parent width (default: true) */
  fullWidth?: boolean;
  size?: 'small' | 'medium';
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

/**
 * Atom – multi-select dropdown with per-item checkboxes and a Select All toggle.
 *
 * Features:
 *   • "Select All" / "Deselect All" header row
 *   • Checkbox per option
 *   • renderValue: shows up to 2 names then "+N more"
 *   • placeholder shown when nothing is selected
 *   • fullWidth + small size by default
 */
export default function AppMultiSelect({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  helperText,
  fullWidth = true,
  size = 'small',
  disabled,
  sx,
}: AppMultiSelectProps) {
  const allSelected = options.length > 0 && value.length === options.length;

  const handleChange = (e: SelectChangeEvent<string[]>) => {
    onChange(e.target.value as string[]);
  };

  // Use onMouseDown + preventDefault so Select doesn't register this row
  // as a real value change – we handle it ourselves.
  const handleSelectAllMouseDown = (e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    onChange(allSelected ? [] : [...options]);
  };

  const renderValue = (selected: string[]) => {
    if (selected.length === 0) return <em>{placeholder}</em>;
    const first2 = selected.slice(0, 2).join(', ');
    const extra = selected.length - 2;
    return extra > 0 ? `${first2} +${extra} more` : first2;
  };

  return (
    <FormControl fullWidth={fullWidth} size={size} disabled={disabled} sx={sx}>
      <Select<string[]>
        multiple
        displayEmpty
        value={value}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={renderValue}
        MenuProps={{ PaperProps: { style: { maxHeight: 320 } } }}
      >
        {/* ── Select All / Deselect All ── */}
        <MenuItem
          dense
          disableRipple={false}
          onMouseDown={handleSelectAllMouseDown}
          className={styles.selectAllItem}
          sx={{
            backgroundColor: allSelected
              ? 'rgba(0, 82, 255, 0.06)'
              : 'transparent',
            '&:hover': {
              backgroundColor: allSelected
                ? 'rgba(0, 82, 255, 0.1)'
                : 'rgba(0, 82, 255, 0.04)',
            },
          }}
        >
          <span className={styles.selectAllLabel}>
            {allSelected ? 'Deselect All' : 'Select All'}
          </span>
        </MenuItem>

        {/* ── Options ── */}
        {options.map((opt) => (
          <MenuItem key={opt} value={opt} dense>
            <Checkbox
              checked={value.includes(opt)}
              size="small"
              sx={{
                padding: '2px 8px 2px 0',
                color: 'var(--color-primary)',
                '&.Mui-checked': { color: 'var(--color-primary)' },
              }}
            />
            <ListItemText primary={opt} primaryTypographyProps={{ fontSize: '0.875rem' }} />
          </MenuItem>
        ))}
      </Select>

      {helperText && (
        <FormHelperText sx={{ marginLeft: 0 }}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
