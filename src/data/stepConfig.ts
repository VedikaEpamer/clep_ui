import type { StepConfig } from '../types/event.types';

export const STEPS: StepConfig[] = [
  { id: 1, label: 'Event Identity', shortLabel: 'Event Identity' },
  { id: 2, label: 'Impact Regions & Perils', shortLabel: 'Impact Regions & Perils' },
  { id: 3, label: 'Other IDs', shortLabel: 'Other IDs' },
  { id: 4, label: 'Industry Market Loss', shortLabel: 'Industry Market Loss' },
  { id: 5, label: 'Deadlines & Tracking', shortLabel: 'Deadlines & Tracking' },
];

export const TOTAL_STEPS = STEPS.length;
