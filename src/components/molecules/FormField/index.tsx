import type { ReactNode } from 'react';
import styles from './FormField.module.css';

interface FormFieldProps {
  /** Static label rendered above the input */
  label: string;
  /** The input atom (AppTextField, AppSelect, AppMultiSelect, etc.) */
  children: ReactNode;
}

/**
 * Molecule – stacks a static label above any input atom.
 *
 * Usage:
 *   <FormField label="Event Name">
 *     <AppTextField value={...} onChange={...} />
 *   </FormField>
 *
 *   <FormField label="Event Type">
 *     <AppSelect options={EVENT_TYPES} placeholder="Select type" value={...} onChange={...} />
 *   </FormField>
 *
 *   <FormField label="Business Groups">
 *     <AppMultiSelect options={...} value={...} onChange={...} />
 *   </FormField>
 */
export default function FormField({ label, children }: FormFieldProps) {
  return (
    <div className={styles.root}>
      <label className={styles.label}>{label}</label>
      {children}
    </div>
  );
}
