// =============================================================================
// UI Labels & Constants
// All static text used across the application lives here.
// Components & pages import from this file – never hard-code strings in JSX.
// =============================================================================

// ── Brand ────────────────────────────────────────────────────────────────────
export const BRAND = {
  COMPANY_NAME: 'Dream Re',
  PLATFORM: 'LLEP PLATFORM',
  LOGO_INITIALS: 'DR',
} as const;

// ── Status ───────────────────────────────────────────────────────────────────
export const STATUS_LABELS = {
  DRAFT_EVENT: 'Draft Event',
  DRAFT: 'Draft',
  ACTIVE: 'Active',
  COMPLETE: 'Complete',
  CURRENTLY_EDITING: 'Currently editing',
} as const;

// ── Page / Header ────────────────────────────────────────────────────────────
export const PAGE_LABELS = {
  CREATE_EVENT_TITLE: 'Create New Event',
  CREATE_EVENT_SUBTITLE: 'Phase 1 – Event Identification & Validation',
  NEW_EVENT: 'New Event',
} as const;

// ── Step Names ───────────────────────────────────────────────────────────────
export const STEP_LABELS = {
  EVENT_IDENTITY: 'Event Identity',
  IMPACT_REGIONS_PERILS: 'Impact Regions & Perils',
  OTHER_IDS: 'Other IDs',
  INDUSTRY_MARKET_LOSS: 'Industry Market Loss',
  DEADLINES_TRACKING: 'Deadlines & Tracking',
} as const;

// ── Section Titles & Descriptions ────────────────────────────────────────────
export const SECTION_LABELS = {
  // Step 1
  EVENT_IDENTITY_HEADING: 'Event Identity & Core Metadata',
  EVENT_IDENTITY_DESCRIPTION:
    'Capture foundational information that uniquely identifies the event and enables validation logic, notifications, and workflow routing.',

  // Step 2
  IMPACT_REGIONS_HEADING: 'Impact Regions & Perils',
  IMPACT_REGIONS_DESCRIPTION:
    'Define the geographic and peril scope of the event for internal classification, reporting, and validation against RDM.',

  // Step 3
  OTHER_IDS_HEADING: 'External & Market Reference IDs',
  OTHER_IDS_DESCRIPTION:
    'Capture broker, market, and client event identifiers for cross-referencing across systems.',

  // Step 4
  INDUSTRY_LOSS_HEADING: 'Industry Loss Estimates',
  INDUSTRY_LOSS_DESCRIPTION:
    'Provide industry market loss estimates and sources for benchmark and validation purposes.',

  // Step 5
  DEADLINES_HEADING: 'Workflow Deadlines & Assignment',
  DEADLINES_DESCRIPTION:
    'Set key deadlines and assign the event to the appropriate analysts for tracking and escalation management.',

  // Step 3 – External Sources sub-section
  EXTERNAL_SOURCES_HEADING: 'External Sources',
  EXTERNAL_SOURCES_DESCRIPTION:
    'Add external reference IDs from brokers, markets, clients or other parties.',
} as const;

// ── Form Field Labels ─────────────────────────────────────────────────────────
export const FIELD_LABELS = {
  // Step 1
  EVENT_STATUS: 'Event Status',
  EVENT_ID: 'Event ID (Auto-Generated)',
  CAT_CODE: 'CAT Code (Optional)',
  CAT_PREMIUM_ALLOCATION: 'CAT Premium Allocation *',
  EVENT_NAME: 'Event Name *',
  EVENT_TYPE: 'Event Type *',
  EVENT_SUB_TYPE: 'Event Sub-Type *',
  EVENT_DATE: 'Event Date *',
  AFFECTED_YEAR: 'Affected Year *',
  REPORTING_CURRENCY: 'Reporting Currency *',
  UNDERWRITING_YEAR: 'Underwriting Year *',
  EVENT_DESCRIPTION: 'Event Description',

  // Step 2
  IMPACTED_REGIONS: 'Impacted Regions *',
  PERILS: 'Perils *',

  // Step 3
  BROKER_EVENT_ID: 'Broker Event ID',
  MARKET_EVENT_ID: 'Market Event ID',
  CLIENT_EVENT_ID: 'Client Event ID',
  EXTERNAL_REFERENCE: 'External Reference',

  // Step 4
  INDUSTRY_LOSS_ESTIMATE: 'Industry Loss Estimate *',
  INDUSTRY_LOSS_SOURCE: 'Industry Loss Source *',
  INDUSTRY_LOSS_DATE: 'Industry Loss Date *',
  MARKET_SHARE: 'Market Share (%)',

  // Step 5
  LOSS_PICK_DEADLINE: 'Loss Pick Deadline *',
  FINAL_SUBMISSION_DEADLINE: 'Final Submission Deadline *',
  ASSIGNED_ANALYST: 'Assigned Analyst *',
  REVIEWER_NAME: 'Reviewer Name',
  NOTES: 'Notes',
} as const;

// ── Placeholders ──────────────────────────────────────────────────────────────
export const PLACEHOLDERS = {
  CAT_CODE: 'e.g., CAT-2024-US-001',
  EVENT_NAME: 'e.g., Hurricane Milton',
  AFFECTED_YEAR: 'e.g., 2026',
  UNDERWRITING_YEAR: 'e.g., 2026',
  EVENT_DESCRIPTION: 'Brief description of the event...',
  BROKER_EVENT_ID: 'e.g., BRK-2026-001',
  MARKET_EVENT_ID: 'e.g., MKT-2026-001',
  CLIENT_EVENT_ID: 'e.g., CLT-2026-001',
  EXTERNAL_REFERENCE: 'Any additional reference',
  INDUSTRY_LOSS_ESTIMATE: 'e.g., 5,000,000,000',
  MARKET_SHARE_PCT: 'e.g., 2.5',
  NOTES: 'Any additional notes or tracking information...',
} as const;

// ── Select Default Options ────────────────────────────────────────────────────
export const SELECT_DEFAULTS = {
  PREMIUM_STATUS: 'Select premium status',
  EVENT_TYPE: 'Select event type',
  SUB_TYPE: 'Select sub-type',
  CURRENCY: 'Select currency',
  LOSS_SOURCE: 'Select source',
  ANALYST: 'Select analyst',
  REVIEWER: 'Select reviewer',
  SOURCE_TYPE: 'Select source type',
} as const;

// ── Helper Texts ──────────────────────────────────────────────────────────────
export const HELPER_TEXTS = {
  EVENT_STATUS: 'Status updates automatically as workflow progresses',
  INDUSTRY_LOSS_ESTIMATE: 'Enter value in reporting currency',
  INDUSTRY_LOSS_DATE: 'Date of the industry loss estimate',
  MARKET_SHARE: 'Estimated market share as a percentage',
} as const;

// ── Button Labels ─────────────────────────────────────────────────────────────
export const BUTTON_LABELS = {
  SAVE_DRAFT: 'Save Draft',
  EXPORT_PDF: 'Export PDF',
  CANCEL: 'Cancel',
  BACK: 'Back',
  NEXT: 'Next',
  SUBMIT: 'Submit',
  PUBLISH: 'Publish Event',
  ADD_SOURCE: 'Add Source',
  REMOVE: 'Remove',
} as const;

// ── Progress ──────────────────────────────────────────────────────────────────
export const PROGRESS_LABELS = {
  PROGRESS: 'Progress',
  STEP_OF: (current: number, total: number) => `Step ${current} of ${total}`,
} as const;

// ── Sidebar ───────────────────────────────────────────────────────────────────
export const SIDEBAR_LABELS = {
  STEP_OF: (current: number, total: number) => `Step ${current} of ${total}`,
} as const;

// ── Regions ───────────────────────────────────────────────────────────────────
export const REGION_LABELS = {
  LOCATIONS_SELECTED: (n: number) => `${n} location${n !== 1 ? 's' : ''} selected`,
  SELECTED_COUNT: (n: number) => `${n} selected`,
  STATES_SELECTED: (n: number) => `${n} state${n !== 1 ? 's' : ''}`,
  PROVINCES_SELECTED: (n: number) => `${n} province${n !== 1 ? 's' : ''}`,
  IMPACTED_REGIONS_CHIPS: 'Selected Regions',
} as const;

// ── External Sources (Step 3) ─────────────────────────────────────────────────
export const EXTERNAL_SOURCE_LABELS = {
  SECTION_TITLE: 'External Sources',
  SECTION_DESCRIPTION: 'Add external reference IDs from brokers, markets, clients or other parties.',
  SOURCE_TYPE: 'Source Type *',
  SOURCE_ID: 'Source ID *',
  ADD_BUTTON: 'Add Source',
  REMOVE_BUTTON: 'Remove',
  SUMMARY_TITLE: 'Added External Sources',
  SUMMARY_EMPTY: 'No external sources added yet.',
  COLUMN_SOURCE_TYPE: 'Source Type',
  COLUMN_SOURCE_ID: 'Source ID',
  COLUMN_ACTIONS: 'Actions',
  SELECT_SOURCE_TYPE: 'Select source type',
  PLACEHOLDER_SOURCE_ID: 'e.g., EXT-2026-001',
} as const;

// ── Review & Publish ──────────────────────────────────────────────────────────
export const REVIEW_LABELS = {
  SECTION_TITLE: 'Review & Publish',
  SECTION_DESCRIPTION:
    'Review the information entered across all steps before publishing the event.',
  PUBLISH_BUTTON: 'Publish Event',
  SAVE_DRAFT_BUTTON: 'Save as Draft',
  GROUP_EVENT_IDENTITY: 'Event Identity',
  GROUP_IMPACT: 'Impact Regions & Perils',
  GROUP_OTHER_IDS: 'Other IDs',
  GROUP_INDUSTRY_LOSS: 'Industry Market Loss',
  GROUP_DEADLINES: 'Deadlines & Tracking',
  NOT_PROVIDED: '—',
  REGIONS_LABEL: 'Impacted Regions',
  PERILS_LABEL: 'Perils',
} as const;

// ── Select Defaults additions ─────────────────────────────────────────────────
// (extend existing SELECT_DEFAULTS by re-exporting extras here if needed)
