import {
  Select,
  OutlinedInput,
  FormHelperText,
  FormControl,
  type SelectProps,
  type SelectChangeEvent,
} from '@mui/material';
import type { ReactNode } from 'react';

export interface AppSelectProps
  extends Omit<SelectProps<string | string[]>, 'onChange' | 'input' | 'variant'> {
  /** Simplified onChange – returns the string value (single) or string[] (multiple) */
  onChange?: (value: string | string[]) => void;
  /** Helper / error text rendered below the select */
  helperText?: ReactNode;
  /** Stretch to fill the parent width (default: true) */
  fullWidth?: boolean;
}

/**
 * Atom – project-level select input built on MUI Select + OutlinedInput.
 *   • outline variant, small size by default
 *   • displayEmpty = true so placeholder MenuItems are always visible
 *   • simplified onChange(value: string) callback
 *   • fullWidth defaults to true
 *   • helperText support
 */
export default function AppSelect({
  onChange,
  helperText,
  fullWidth = true,
  size = 'small',
  children,
  disabled,
  sx,
  ...rest
}: AppSelectProps) {
  const handleChange = (e: SelectChangeEvent<string | string[]>) => {
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
        {children}
      </Select>
      {helperText && (
        <FormHelperText sx={{ marginLeft: 0 }}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
