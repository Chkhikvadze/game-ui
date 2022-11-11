import { IUser } from './user.interface'
import { IAccount } from './account.interface'

export interface IProject {
  id: number;
  account?: IAccount;
  personal_use?: number;
  account_id: number;
  project_name: string;
  open_date: number;
  replacement_date: number;
  holding_period: number;
  vehicle_purpose: string;
  pool_vehicle: boolean;
  daily_travel_distance: number;
  annual_travel_distance: number;
  location_postcode: string;
  created_on?: Date;
  modified_on?: Date;
  readonly creator_user: IUser;
  created_by?: number;
  readonly modifier_user: IUser;
  readonly modified_by: number;
  deleted?: boolean;
}

export interface IProjectInput {
  project_name?: string;
  open_date?: Date;
  location_postcode: string;
  replacement_date?: Date;
  holding_period: number;
  vehicle_purpose: string;
  pool_vehicle?: boolean;
  daily_travel_distance?: number;
  annual_travel_distance: number;
}
