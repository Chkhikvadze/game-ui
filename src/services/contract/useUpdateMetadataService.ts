import { useMutation } from '@apollo/client'
import UPDATE_METADATA_GQL from '../../gql/contract/updateMetadata.gql'
import { Contract } from 'services'

interface Data {
  updateMetadata: Contract
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

    const contract = data?.updateMetadata

    if (errors?.length || !contract) {
      throw new Error(errors ? errors[0].message : 'Something went wrong')
    }

    return contract
  }

  return {
    updateMetadataService,
    loading,
  }
}
