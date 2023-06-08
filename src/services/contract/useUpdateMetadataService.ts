import { useMutation } from '@apollo/client'
import UPDATE_METADATA_GQL from '../../gql/contract/updateMetadata.gql'

interface Data {
  updateMetadata: {
    collection: Record<string, any>
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

    if (errors?.length || !data) {
      throw new Error(errors ? errors[0].message : 'Something went wrong')
    }

    return data.updateMetadata
  }

  return {
    updateMetadataService,
    loading,
  }
}
