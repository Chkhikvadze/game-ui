import { useMutation } from '@apollo/client'
import UPDATE_METADATA_GQL from '../../gql/contract/updateMetadata.gql'
import { Contract } from 'services'

interface Data {
  updateMetadata: {
    collection: Record<string, any>
    contract: Contract
    transaction_hash: string
  }
}

interface Variables {
  collection_id: string
}

export const useUpdateMetadataService = () => {
  const [mutation, { loading }] = useMutation<Data, Variables>(UPDATE_METADATA_GQL)

  const updateMetadataService = async (collection_id: string) => {
    const { data, errors } = await mutation({
      variables: { collection_id },
    })

    const result = data?.updateMetadata

    if (errors?.length || !result) {
      throw new Error(errors ? errors[0].message : 'Something went wrong')
    }

    return result
  }

  return {
    updateMetadataService,
    loading,
  }
}
