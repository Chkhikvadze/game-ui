import { useParams } from 'react-router-dom'
import { useCollectionByIdService } from 'services/useCollectionService'
import {
  useCreatePropertyInCacheThenServerService,
  usePropertiesService,
} from 'services/usePropertyService'

const useDataGrid = () => {
  const params = useParams()
  const collectionId: string = params?.collectionId!
  const {
    data: collection,
    // refetch: refetchCollection
  } = useCollectionByIdService({
    id: collectionId,
  })
  const { project_id } = collection

  const filter = {
    project_id,
    collection_id: collectionId,
    page: 1,
    limit: 100,
    search_text: '',
    sort: 'name',
    order: 'ASC',
  }

  const {
    data,
    //  refetch: nftsRefetch
  } = usePropertiesService(filter)

  const [createPropertyService] = useCreatePropertyInCacheThenServerService({
    filter,
  })

  const addBlankRow = async () => {
    const propertyInput = {
      collection_id: collectionId,
      project_id,
      name: '',
      description: '',
      property_type: 'String',
      custom_props: {},
      value: null,
      display_value: null,
      asset_url: null,
      order: data.items.length,
    }

    createPropertyService(propertyInput)
  }

  return { addBlankRow }
}

export default useDataGrid
