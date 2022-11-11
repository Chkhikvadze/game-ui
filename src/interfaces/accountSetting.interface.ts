export interface IAccountSetting {
  id: number
  financial_year_start_month: string
  paying_organisation: boolean
  stump_duty: boolean
  registered_company: boolean
  applicable_texes: string
  vehicle_safety_rating: string
  manual_drive: boolean
  class_during_replacement: boolean
  inflation_rate: number
  interest_rate: number
  excise_tax: number
  road_charges: number
  force_electric_vehicle_replacement: boolean
  selection_approach_and_priority_for_replacement: boolean
  modified_on: any
}
