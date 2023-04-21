import { IUser } from './user.interface'
// import { ILocation } from './location.interface'
// import { ISetting } from './setting.interface'
import { IGame } from './game.interface'

export interface IAccount {
  id: number
  user: IUser
  user_id: number
  base_location_id: number
  company_name: string
  // organisation_abn: string
  // organisation_name: string
  // organisation_type: string
  // have_fleet_operation: string
  // organisation_fleet_size: string
  // settings_id: number
  // modified_on: Date
  // creator_user: IUser
  // created_by: number
  // modifier_user: IUser
  // modified_by: IUser
  location: string
  deleted: boolean
}
