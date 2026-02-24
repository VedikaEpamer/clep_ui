export interface Country {
  code: string;
  name: string;
}

export interface Region {
  id: string;
  label: string;
  countries: Country[];
}

export const REGIONS: Region[] = [
  {
    id: 'north_america',
    label: 'NORTH AMERICA',
    countries: [
      { code: 'US', name: 'United States' },
      { code: 'CA', name: 'Canada' },
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

export const ANALYSTS = [
  'John Smith',
  'Sarah Johnson',
  'Michael Chen',
  'Emily Davis',
  'Robert Wilson',
];
