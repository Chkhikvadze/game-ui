import { useMutation } from '@apollo/client'
import UPDATE_COLLECTION_BY_ID_GQL from '../../gql/collection/updateCollectionById.gql'
import { ICollection } from 'services'
import { Nullable } from 'types'

interface Data {
  collection: ICollection
}

interface Variables {
  id: string
  input: UpdateCollectionInput
}

interface UpdateCollectionInput {
  id?: string
  name?: string
  description?: string
  web_link?: string
  properties?: Nullable<any>
  supply?: Nullable<number>
  created_on?: Date
  modified_on?: Date
  created_by?: string
  modified_by?: string
  account_id?: Nullable<string>
  game_id?: string
  categories?: Nullable<any>
}

export const useUpdateCollectionByIdService = () => {
  const [mutation] = useMutation<Data, Variables>(UPDATE_COLLECTION_BY_ID_GQL)
  const updateCollectionById = async (
    id: string,
    input: UpdateCollectionInput,
  ): Promise<{ success: boolean }> => {
    const { data } = await mutation({
      variables: {
        id,
        input,
      },
    })

    const collection = data?.collection

    return {
      success: !!collection,
    }
  }

  return [updateCollectionById]
}
