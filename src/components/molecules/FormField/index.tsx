import type { ReactNode } from 'react';
import AppTextField, { type AppTextFieldProps } from '../../atoms/AppTextField';
import AppSelect, { type AppSelectProps } from '../../atoms/AppSelect';
import styles from './FormField.module.css';

// ── Select variant ───────────────────────────────────────────────────────────
interface FormSelectProps extends AppSelectProps {
  label: string;
  select: true;
  children?: ReactNode;
}

// ── Plain input variant ──────────────────────────────────────────────────────
interface FormInputProps extends AppTextFieldProps {
  label: string;
  select?: false;
  children?: never;
}

type FormFieldProps = FormSelectProps | FormInputProps;

/**
 * Molecule – stacks a static label above either an AppSelect or AppTextField.
 *
 * Usage (plain input):
 *   <FormField label="Event Name" value={...} onChange={...} placeholder="..." />
 *
 * Usage (select):
 *   <FormField label="Event Type" select value={...} onChange={...}>
 *     <MenuItem value="">...</MenuItem>
 *   </FormField>
 *
 * Usage (read-only):
 *   <FormField label="Event Status" value={...} readOnly helperText="..." />
 *
 * Usage (date):
 *   <FormField label="Event Date" type="date" value={...} onChange={...} />
 *
 * Usage (multiline):
 *   <FormField label="Notes" multiline rows={3} value={...} onChange={...} />
 */
export default function FormField({ label, children, select, ...rest }: FormFieldProps) {
  return (
    <div className={styles.root}>
      <label className={styles.label}>{label}</label>
      {select ? (
        <AppSelect {...(rest as AppSelectProps)}>{children}</AppSelect>
      ) : (
        <AppTextField {...(rest as AppTextFieldProps)} />
      )}
    </div>
  );
}
