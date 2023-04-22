import { IUser } from './user.interface'
// import { ILocation } from './location.interface'
// import { ISetting } from './setting.interface'
import { IGame } from './game.interface'

export interface IAccount {
  id: number
  user: IUser
  user_id: string
  company_name: string
  location: string
  deleted: boolean
}
