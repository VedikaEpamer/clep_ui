import {
  Select,
  OutlinedInput,
  FormHelperText,
  FormControl,
  MenuItem,
  type SelectProps,
  type SelectChangeEvent,
} from '@mui/material';
import type { ReactNode } from 'react';

export interface AppSelectProps
  extends Omit<SelectProps<string>, 'onChange' | 'input' | 'variant' | 'children'> {
  /** Options rendered as MenuItems inside the select */
  options: string[];
  /** Placeholder text shown when no value is selected */
  placeholder?: string;
  /** Simplified onChange – returns the selected string value */
  onChange?: (value: string) => void;
  /** Helper / error text rendered below the select */
  helperText?: ReactNode;
  /** Stretch to fill the parent width (default: true) */
  fullWidth?: boolean;
}

/**
 * Atom – project-level select input built on MUI Select + OutlinedInput.
 *   • outline variant, small size by default
 *   • displayEmpty = true so placeholder is always visible
 *   • options rendered internally – no need to pass MenuItem children
 *   • simplified onChange(value: string) callback
 *   • fullWidth defaults to true
 *   • helperText support
 */
export default function AppSelect({
  options,
  placeholder,
  onChange,
  helperText,
  fullWidth = true,
  size = 'small',
  disabled,
  sx,
  ...rest
}: AppSelectProps) {
  const handleChange = (e: SelectChangeEvent<string>) => {
    onChange?.(e.target.value);
  };

  return (
    <FormControl fullWidth={fullWidth} size={size} disabled={disabled} sx={sx}>
      <Select
        displayEmpty
        input={<OutlinedInput />}
        onChange={handleChange}
        {...rest}
      >
        {placeholder && (
          <MenuItem value=""><em>{placeholder}</em></MenuItem>
        )}
        {options.map((opt) => (
          <MenuItem key={opt} value={opt}>{opt}</MenuItem>
        ))}
      </Select>
      {helperText && (
        <FormHelperText sx={{ marginLeft: 0 }}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
