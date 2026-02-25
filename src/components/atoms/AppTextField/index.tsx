import { TextField, type TextFieldProps } from '@mui/material';

export interface AppTextFieldProps extends Omit<TextFieldProps, 'onChange'> {
  /** Simplified onChange – returns the string value directly */
  onChange?: (value: string) => void;
  /** Makes the input read-only and applies the readonly background */
  readOnly?: boolean;
}

/**
 * Atom – thin wrapper around MUI TextField with project-level defaults:
 *   • always outlined variant
 *   • fullWidth by default
 *   • simplified onChange(value: string) callback
 *   • readOnly shorthand prop
 *   For select / dropdown fields use AppSelect instead.
 */
export default function AppTextField({
  onChange,
  readOnly = false,
  fullWidth = true,
  size = 'small',
  sx,
  slotProps,
  ...rest
}: AppTextFieldProps) {
  return (
    <TextField
      fullWidth={fullWidth}
      size={size}
      variant="outlined"
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      slotProps={{
        ...slotProps,
        input: {
          readOnly,
          ...(slotProps as { input?: object })?.input,
        },
      }}
      sx={[
        readOnly ? { '& .MuiInputBase-root': { bgcolor: 'var(--color-readonly-bg)' } } : {},
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
      {...rest}
    />
  );
}
