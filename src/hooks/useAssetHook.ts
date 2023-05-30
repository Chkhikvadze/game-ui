import { useEffect, useState } from 'react'
import { useAssetsService } from 'services'

const useAssetHook = () => {
  const [assets, setAssets] = useState<any>(null)

  const { data, refetch: assetsRefetch } = useAssetsService({
    game_id: '',
    collection_id: '',
    page: 1,
    limit: 100,
    search_text: '',
  })

  const { items } = data

  useEffect(() => {
    setAssets(items)
  }, [data, items])

  return { assets, assetsRefetch }
}

export default useAssetHook
