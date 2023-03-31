export const FINANCIAL_YEAR_START_MONTH_OPTIONS = [
  { label: 'January', value: 'january' },
  { label: 'February', value: 'february' },
  { label: 'March', value: 'march' },
  { label: 'April', value: 'april' },
  { label: 'May', value: 'may' },
  { label: 'June', value: 'june' },
  { label: 'July', value: 'july' },
  { label: 'August', value: 'august' },
  { label: 'September', value: 'september' },
  { label: 'October', value: 'october' },
  { label: 'November', value: 'november' },
  { label: 'December', value: 'december' },
]

export const ORGANISATION_SIZE = [
  { value: 'less-than-100', label: 'Less than 100 employees' },
  { value: 'more-than-100', label: 'More than 100 employees' },
]

export const ORGANIZATION_TYPE = Object.freeze({
  aggFMO: {
    name: 'Aggregator – Fleet Management Organisation (FMO)',
    value: 'Aggregator – Fleet Management Organisation (FMO)',
  },
  aggOther: {
    name: 'Aggregator – Other',
    value: 'Aggregator – Other',
  },
  business: {
    name: 'Business',
    value: 'Business',
  },
  localGov: {
    name: 'Local Government',
    value: 'Local Government',
  },
  ngo: {
    name: 'Non-governmental organisation (NGO)',
    value: 'Non-governmental organisation (NGO)',
  },
})

export const ORGANISATION_ROLE_OPTIONS = [
  { label: 'Fleet manager', value: 'Fleet manager' },
  { label: 'Fleet consultant', value: 'Fleet consultant' },
  { label: 'Sustainability', value: 'Sustainability' },
  { label: 'Facilities manager', value: 'Facilities manager' },
  { label: 'Procurement manager', value: 'Procurement manager' },
  { label: 'Channel partner', value: 'Channel partner' },
  { label: 'Senior executive', value: 'Senior executive' },
  { label: 'Business owner', value: 'Business owner' },
  { label: 'Transport planner', value: 'Transport planner' },
  { label: 'Energy manager', value: 'Energy manager' },
  { label: 'Others', value: 'Others' },
]

export const ORGANISATION_FLEET_SIZE_OPTIONS = [
  {
    value: '1-4',
    label: '1-4',
  },
  {
    value: '5-9',
    label: '5-9',
  },
  {
    value: '10-19',
    label: '10-19',
  },
  {
    value: '20-49',
    label: '20-49',
  },
  {
    value: '50-250',
    label: '50-250',
  },
  {
    value: '251-500',
    label: '251-500',
  },
  {
    value: '501-1000',
    label: '501-1000',
  },
  {
    value: 'Greater than 1000',
    label: 'Greater than 1000',
  },
  {
    value: 'Unsure',
    label: 'Unsure',
  },
]

export const ORGANISATION_INDUSTRY = [
  // { label: 'Company Industry', value: 'Company Industry' },
  { label: 'Association and Not for Profit', value: 'Association and Not for Profit' },
  { label: 'Automotive', value: 'Automotive' },
  { label: 'Bus Operator', value: 'Bus Operator' },
  { label: 'Charging Infrastructure', value: 'Charging Infrastructure' },
  { label: 'Education', value: 'Education' },
  { label: 'Energy Network Business', value: 'Energy Network Business' },
  { label: 'Energy Retailer', value: 'Energy Retailer' },
  { label: 'Finance', value: 'Finance' },
  { label: 'FMO', value: 'FMO' },
  { label: 'GPS', value: 'GPS' },
  { label: 'Healthcare', value: 'Healthcare' },
  { label: 'Insurance', value: 'Insurance' },
  { label: 'IT', value: 'IT' },
  { label: 'Large Corporate', value: 'Large Corporate' },
  { label: 'Logistics Freight', value: 'Logistics Freight' },
  { label: 'Logistics Last Mile', value: 'Logistics Last Mile' },
  { label: 'Local Government', value: 'Local Government' },
  { label: 'Manufacturing', value: 'Manufacturing' },
  { label: 'Mass Transit', value: 'Mass Transit' },
  { label: 'Other Government', value: 'Other Government' },
  { label: 'Pharmaceutical', value: 'Pharmaceutical' },
  { label: 'Real Estate', value: 'Real Estate' },
  { label: 'Retail', value: 'Retail' },
  { label: 'Telecommunications', value: 'Telecommunications' },
  { label: 'Transport', value: 'Transport' },
  { label: 'Transit Authority', value: 'Transit Authority' },
  { label: 'Utilities', value: 'Utilities' },
  { label: 'Others', value: 'Others' },
]

export const FLEET_TRANSITION_STATUS = [
  { label: 'Not started', value: 'Not started' },
  { label: 'Budget for transition plan', value: 'Budget for transition plan' },
  { label: 'High level transition plan completed', value: 'High level transition plan completed' },
  { label: 'Detailed transition plan', value: 'Detailed transition plan' },
  { label: 'Pilot', value: 'Pilot' },
  { label: 'Looking for management software', value: 'Looking for management software' },
  { label: 'Scaling up', value: 'Scaling up' },
  { label: 'Looking for charging infrastructure', value: 'Looking for charging infrastructure' },
  { label: 'Looking for network planning advice', value: 'Looking for network planning advice' },
  { label: 'General advisory', value: 'General advisory' },
  { label: 'Other', value: 'Other' },
]

export const SOURCE_OF_RENEWABLE_ENERGY = [
  {
    value: 'power_purchase_agreement',
    label: 'Power purchase agreement',
  },
  { value: 'green_energy', label: 'Green energy' },
  { value: 'on_site_renewables', label: 'On site renewables' },
  {
    value: 'on_site_renewables_with_batteries',
    label: 'On site renewables with batteries',
  },
]

// new constants

export interface Option {
  label: string
  value: string
}

export const GAME_CATEGORY_OPTIONS: Option[] = [
  { value: 'Action', label: 'Action' },
  { value: 'Adventure', label: 'Adventure' },
  { value: 'Animal', label: 'Animal' },
  { value: 'Art & Creativity', label: 'Art & Creativity' },
  { value: 'Board & Card', label: 'Board & Card' },
  { value: 'Girl', label: 'Girl' },
  { value: 'Multiplayer', label: 'Multiplayer' },
  { value: 'Puzzle', label: 'Puzzle' },
  { value: 'Racing', label: 'Racing' },
  { value: 'Shooting', label: 'Shooting' },
  { value: 'Skill Games', label: 'Skill Games' },
  // { value: 'Special', label: 'Special' },
  { value: 'Simulation', label: 'Simulation' },
  { value: 'Sports', label: 'Sports' },
  { value: 'Strategy', label: 'Strategy' },
  // { value: 'Vehicle', label: 'Vehicle' },
]

export const collection_category_options = [
  { value: 'Art', label: 'Art' },
  { value: 'Lands', label: 'Lands' },
  { value: 'Collectibles', label: 'Collectibles' },
  { value: 'Guns', label: 'Guns' },
  { value: 'Skins', label: 'Skins' },
  { value: 'Properties', label: 'Properties' },
]

export const asset_type_options = [
  { value: 'Nested', label: 'Nested' },
  { value: 'Main', label: 'Main' },
]

export const property_type_options = [
  { value: 'Array', label: 'Array' },
  { value: 'Object', label: 'Object' },
  { value: 'String', label: 'String' },
  { value: 'Number', label: 'Number' },
]
