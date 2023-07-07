import { Nullable } from 'types'

export interface IGame {
  game: any
  id: string
  name: string
  category: Nullable<string>
  description: Nullable<string>
  created_on: Date
  modified_on: Date
  created_by: string
  modified_by: Nullable<string>
  account_id: Nullable<string>
  banner_image: Nullable<string>
  logo_image: string
  background_image: Nullable<string>
  url: Nullable<string>
  web_link: Nullable<string>
  discord: Nullable<string>
  twitter: Nullable<string>
  instagram: Nullable<string>
  status: string
  contact_email: Nullable<string>
  contact_phone: Nullable<string>
  is_url: Nullable<boolean>
  medias: any[]
  main_media: Nullable<string>
  social_links: any[]
}
