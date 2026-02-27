export interface SubRegion {
  code: string; // e.g. "CA", "TX" — combined with country as "US-CA"
  name: string;
}

export interface Country {
  code: string;
  name: string;
  subRegions?: SubRegion[]; // states / provinces
}

export interface Region {
  id: string;
  label: string;
  countries: Country[];
  isGlobal?: boolean;
}

export const REGIONS: Region[] = [
  {
    id: 'north_america',
    label: 'NORTH AMERICA',
    countries: [
      {
        code: 'US',
        name: 'United States',
        subRegions: [
          { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' },
          { code: 'AZ', name: 'Arizona' }, { code: 'AR', name: 'Arkansas' },
          { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' },
          { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' },
          { code: 'FL', name: 'Florida' }, { code: 'GA', name: 'Georgia' },
          { code: 'HI', name: 'Hawaii' }, { code: 'ID', name: 'Idaho' },
          { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' },
          { code: 'IA', name: 'Iowa' }, { code: 'KS', name: 'Kansas' },
          { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' },
          { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' },
          { code: 'MA', name: 'Massachusetts' }, { code: 'MI', name: 'Michigan' },
          { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' },
          { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' },
          { code: 'NE', name: 'Nebraska' }, { code: 'NV', name: 'Nevada' },
          { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' },
          { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' },
          { code: 'NC', name: 'North Carolina' }, { code: 'ND', name: 'North Dakota' },
          { code: 'OH', name: 'Ohio' }, { code: 'OK', name: 'Oklahoma' },
          { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' },
          { code: 'RI', name: 'Rhode Island' }, { code: 'SC', name: 'South Carolina' },
          { code: 'SD', name: 'South Dakota' }, { code: 'TN', name: 'Tennessee' },
          { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' },
          { code: 'VT', name: 'Vermont' }, { code: 'VA', name: 'Virginia' },
          { code: 'WA', name: 'Washington' }, { code: 'WV', name: 'West Virginia' },
          { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' },
        ],
      },
      {
        code: 'CA',
        name: 'Canada',
        subRegions: [
          { code: 'AB', name: 'Alberta' }, { code: 'BC', name: 'British Columbia' },
          { code: 'MB', name: 'Manitoba' }, { code: 'NB', name: 'New Brunswick' },
          { code: 'NL', name: 'Newfoundland & Labrador' }, { code: 'NS', name: 'Nova Scotia' },
          { code: 'NT', name: 'Northwest Territories' }, { code: 'NU', name: 'Nunavut' },
          { code: 'ON', name: 'Ontario' }, { code: 'PE', name: 'Prince Edward Island' },
          { code: 'QC', name: 'Quebec' }, { code: 'SK', name: 'Saskatchewan' },
          { code: 'YT', name: 'Yukon' },
        ],
      },
      { code: 'MX', name: 'Mexico' },
    ],
  },
  {
    id: 'latin_america',
    label: 'LATIN AMERICA',
    countries: [
      { code: 'BR', name: 'Brazil' },
      { code: 'AR', name: 'Argentina' },
      { code: 'CL', name: 'Chile' },
      { code: 'CO', name: 'Colombia' },
      { code: 'PE', name: 'Peru' },
    ],
  },
  {
    id: 'europe',
    label: 'EUROPE',
    countries: [
      { code: 'GB', name: 'United Kingdom' },
      { code: 'DE', name: 'Germany' },
      { code: 'FR', name: 'France' },
      { code: 'IT', name: 'Italy' },
      { code: 'ES', name: 'Spain' },
      { code: 'NL', name: 'Netherlands' },
      { code: 'CH', name: 'Switzerland' },
    ],
  },
  {
    id: 'middle_east_africa',
    label: 'MIDDLE EAST & AFRICA',
    countries: [
      { code: 'SA', name: 'Saudi Arabia' },
      { code: 'AE', name: 'United Arab Emirates' },
      { code: 'ZA', name: 'South Africa' },
      { code: 'NG', name: 'Nigeria' },
      { code: 'EG', name: 'Egypt' },
    ],
  },
  {
    id: 'asia_pacific',
    label: 'ASIA PACIFIC',
    countries: [
      { code: 'JP', name: 'Japan' },
      { code: 'AU', name: 'Australia' },
      { code: 'CN', name: 'China' },
      { code: 'IN', name: 'India' },
      { code: 'SG', name: 'Singapore' },
      { code: 'KR', name: 'South Korea' },
    ],
  },
  {
    id: 'global',
    label: 'GLOBAL',
    isGlobal: true,
    countries: [{ code: 'GLOBAL', name: 'Global' }],
  },
];

export const PERILS = [
  'Hurricane / Typhoon',
  'Earthquake',
  'Flood',
  'Severe Convective Storm',
  'Wildfire',
  'Winter Storm',
  'Terrorism',
  'Cyber',
  'Marine',
  'Aviation',
];

export const EVENT_TYPES = [
  'Natural Catastrophe',
  'Man-Made',
  'Cyber',
  'Pandemic',
  'Political Risk',
];

export const EVENT_SUB_TYPES: Record<string, string[]> = {
  'Natural Catastrophe': ['Hurricane', 'Earthquake', 'Flood', 'Wildfire', 'Tornado', 'Winter Storm'],
  'Man-Made': ['Industrial Accident', 'Explosion', 'Structural Collapse'],
  'Cyber': ['Ransomware', 'Data Breach', 'DDoS'],
  'Pandemic': ['Infectious Disease', 'Biological'],
  'Political Risk': ['Strike', 'Riot', 'War'],
};

export const CAT_PREMIUM_OPTIONS = [
  'Allocated',
  'Unallocated',
  'Partial Allocation',
  'Not Applicable',
];

export const REPORTING_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF'];

export const BUSINESS_GROUPS = [
  'Property',
  'Casualty',
  'Marine',
  'Aviation',
  'Energy',
  'Life & Health',
  'Cyber',
  'Credit & Surety',
  'Engineering',
  'Other',
];

export const INDUSTRY_LOSS_SOURCES = [
  'PCS',
  'PERILS AG',
  'AIR Worldwide',
  'RMS',
  'Verisk',
  'Munich Re',
  'Swiss Re',
  'Internal Estimate',
];

export const EXTERNAL_SOURCE_TYPES = [
  'Broker',
  'Market',
  'Client',
  'Cedant',
  'Reinsurer',
  'Regulator',
  'Other',
];

export const SEVERITY_LEVELS = [
  'Minor',
  'Moderate',
  'Major',
  'Severe',
  'Catastrophic',
];

export const ANALYSTS = [
  'John Smith',
  'Sarah Johnson',
  'Michael Chen',
  'Emily Davis',
  'Robert Wilson',
];

export interface FunctionalTeam {
  id: string;
  name: string;
  members: string;
}

export const FUNCTIONAL_TEAMS: FunctionalTeam[] = [
  { id: 'finance',    name: 'Finance Team',          members: 'Patricia Wong, James Miller' },
  { id: 'claims',     name: 'Claims Team',            members: 'Robert Taylor, Lisa Anderson' },
  { id: 'cat-model',  name: 'CAT Modeler Team',       members: 'Jake Martin, Tim Chen' },
  { id: 'reserving',  name: 'Reserving Team',         members: 'Thomas Wright, Sarah Collins' },
  { id: 'risk-mgmt',  name: 'Risk Mgmt Team',         members: 'Michael Dawson (COO), Jennifer Becks (CFO)' },
  { id: 'cuo-cfo',    name: 'CUO/CFO Escalation Team', members: 'Executive Leadership Team' },
];

export interface ExecutiveArea {
  id: string;
  name: string;
  lead: string;
}

export const EXECUTIVE_AREAS: ExecutiveArea[] = [
  { id: 'na-treaty',   name: 'North America Treaty', lead: 'Michael Rodriguez' },
  { id: 'intl-treaty', name: 'International Treaty', lead: 'Sarah Chen' },
  { id: 'na-fac',      name: 'North America Fac',    lead: 'David Thompson' },
  { id: 'specialties', name: 'Specialties',          lead: 'Jennifer Williams' },
  { id: 'intl-fac',    name: 'International Fac',    lead: 'Robert Anderson' },
];
