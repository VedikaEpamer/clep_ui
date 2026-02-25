// ─── External Source Reference ─────────────────────────────────────────────
export interface ExternalSource {
  id: string;         // unique key (timestamp-based)
  sourceType: string; // 'Broker' | 'Market' | 'Client' | ...
  sourceId: string;   // the reference ID value
}

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
  primaryPeril: string;
  businessGroups: string;
  eventDate: string;
  lossStartDate: string;
  lossEndDate: string;
  shortDescription: string;
  longDescription: string;

  // Step 2 – Impact Regions & Perils
  impactedRegions: ImpactedLocation[];
  perils: string[];

  // Step 3 – Other IDs
  brokerEventId: string;
  marketEventId: string;
  clientEventId: string;
  externalReference: string;
  externalSources: ExternalSource[];

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
  primaryPeril: '',
  businessGroups: '',
  eventDate: '',
  lossStartDate: '',
  lossEndDate: '',
  shortDescription: '',
  longDescription: '',
  impactedRegions: [],
  perils: [],
  brokerEventId: '',
  marketEventId: '',
  clientEventId: '',
  externalReference: '',
  externalSources: [],
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
