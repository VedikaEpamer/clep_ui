import type { ReactNode } from 'react';
import AppTextField, { type AppTextFieldProps } from '../../atoms/AppTextField';
import styles from './FormField.module.css';

interface FormFieldProps extends AppTextFieldProps {
  /** Static label rendered above the input */
  label: string;
  /** MenuItem elements when used as a select */
  children?: ReactNode;
}

/**
 * Molecule – stacks a static label above an AppTextField.
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
export default function FormField({ label, children, ...rest }: FormFieldProps) {
  return (
    <div className={styles.root}>
      <label className={styles.label}>{label}</label>
      <AppTextField {...rest}>{children}</AppTextField>
    </div>
  );
}
