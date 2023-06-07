import { useEffect, useState } from 'react'
import { useAssetsService } from 'services'

const useAssetHook = () => {
  const [assets, setAssets] = useState<any>(null)
  const [limit, setLimit] = useState(10)

  const { data, refetch: assetsRefetch } = useAssetsService({
    game_id: '',
    collection_id: '',
    page: 1,
    limit: limit,
    search_text: '',
  })

  const { items } = data

  useEffect(() => {
    setAssets(items)
  }, [data, items])

  return { assets, assetsRefetch, setLimit }
}

export default useAssetHook
