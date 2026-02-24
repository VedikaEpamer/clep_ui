// ─── Event Form Data Types ────────────────────────────────────────────────────

export interface ImpactedLocation {
  region: string;
  countries: string[];
}

export interface EventFormData {
  // Step 1 – Event Identity
  eventStatus: string;
  eventId: string;
  catCode: string;
  catPremiumAllocation: string;
  eventName: string;
  eventType: string;
  eventSubType: string;
  eventDescription: string;
  eventDate: string;
  affectedYear: string;
  reportingCurrency: string;
  underwritingYear: string;

  // Step 2 – Impact Regions & Perils
  impactedRegions: ImpactedLocation[];
  perils: string[];

  // Step 3 – Other IDs
  brokerEventId: string;
  marketEventId: string;
  clientEventId: string;
  externalReference: string;

  // Step 4 – Industry Market Loss
  industrylossEstimate: string;
  industryLossSource: string;
  industryLossDate: string;
  marketShare: string;

  // Step 5 – Deadlines & Tracking
  lossPickDeadline: string;
  finalSubmissionDeadline: string;
  assignedAnalyst: string;
  reviewerName: string;
  notes: string;
}

export const initialFormData: EventFormData = {
  eventStatus: 'Draft',
  eventId: 'EVT-2026-923',
  catCode: '',
  catPremiumAllocation: '',
  eventName: '',
  eventType: '',
  eventSubType: '',
  eventDescription: '',
  eventDate: '',
  affectedYear: '',
  reportingCurrency: '',
  underwritingYear: '',
  impactedRegions: [],
  perils: [],
  brokerEventId: '',
  marketEventId: '',
  clientEventId: '',
  externalReference: '',
  industrylossEstimate: '',
  industryLossSource: '',
  industryLossDate: '',
  marketShare: '',
  lossPickDeadline: '',
  finalSubmissionDeadline: '',
  assignedAnalyst: '',
  reviewerName: '',
  notes: '',
};

export interface StepConfig {
  id: number;
  label: string;
  shortLabel: string;
}
