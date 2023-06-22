import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import CREATE_COLLECTION_GQL from '../../gql/collection/createCollection.gql'
import { ICollection } from 'services'
import { Nullable } from 'types'

interface Data {
  createCollection: ICollection
}

interface Variables {
  input: CreateCollectionInput
}

interface CreateCollectionInput {
  id?: string
  name?: string
  description?: string
  web_link?: string
  properties?: Nullable<any>
  supply?: Nullable<number>
  created_on?: string
  modified_on?: string
  created_by?: string
  modified_by?: Nullable<any>
  account_id?: string
  game_id?: string
  banner_image?: Nullable<any>
  logo_image?: string
  featured_image?: Nullable<any>
  url?: string
  category?: Nullable<any>
  categories?: Nullable<any>[]
  status?: string
}

export const useCreateCollectionService = () => {
  const [mutation] = useMutation<Data, Variables>(CREATE_COLLECTION_GQL)
  const createCollectionService = async (input: CreateCollectionInput, callback: any) => {
    const response = await mutation({
      variables: { input },
    })
    const { data } = response // Check if response exists and extract data property
    const createCollection = data?.createCollection // Check if data exists and extract createCollection property

    if (callback) {
      callback()
    }

    return createCollection
  }

  return [createCollectionService]
}
