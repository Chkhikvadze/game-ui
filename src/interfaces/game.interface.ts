import { IUser } from './user.interface'
import { IAccount } from './account.interface'

export interface IGame {
  id: number
  account?: IAccount
  account_id: string
  name: string
  created_on?: Date
  modified_on?: Date
  readonly creator_user: IUser
  created_by?: string
  readonly modifier_user: IUser
  readonly modified_by?: string
  deleted?: boolean
}

export interface IGameInput {
  name?: string
  open_date?: Date
}
