import { Nullable } from 'types'

export interface ICollection {
  collection: any
  id: string
  name: string
  description: string
  web_link: string
  properties: Nullable<any>
  categories: Nullable<any>
  supply: Nullable<number>
  created_on: Date
  modified_on: Date
  created_by: string
  modified_by: string
  account_id: Nullable<string>
  game_id: string
  banner_image: Nullable<string>
  logo_image: string
  featured_image: Nullable<string>
  cover_image: Nullable<string>
  url: string
  category: Nullable<string>
  status: string
  unique_id: Nullable<string>
  custom_property_props: Nullable<any>
  custom_asset_props: Nullable<any>
  medias: Nullable<any>[]
  main_media: Nullable<string>
  social_links: Nullable<any>[]
  ai_analysis: Nullable<any>[]
  is_metadata_updating: boolean
}
