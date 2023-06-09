import { useEffect, useState } from 'react'
import { useCollectionsService } from 'services/useCollectionService'

const useCollectionsHook = () => {
  const [collections, setCollections] = useState<any>(null)
  const { data } = useCollectionsService({
    page: 1,
    limit: 100,
    search_text: '',
  })

  const { items } = data

  useEffect(() => {
    setCollections(items)
  }, [data, items])

  return { collections }
}

export default useCollectionsHook
