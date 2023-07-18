import { useEffect } from 'react'
import {
  useAssetsService,
  useCollectionsService,
  useGamesService,
  useGamesServiceLazy,
} from 'services'

const useSpotlight = () => {
  const { getGames, data } = useGamesServiceLazy()

  const { data: gamesData } = useGamesService({
    page: 1,
    limit: 100,
    search_text: '',
  })

  const { data: collectionsData } = useCollectionsService({
    page: 1,
    limit: 100,
    search_text: '',
  })

  console.log('collectionsForChat', collectionsData)

  const onHandleClickGetGames = async () => {
    getGames({
      variables: {
        filter: {
          search_text: '',
          page: 1,
          limit: 10,
          sort: 'name',
          order: 'ASC',
        },
      },
    })
  }

  return {
    onHandleClickGetGames,
    data,
    gamesForChat: gamesData?.items,
    collectionsForChat: collectionsData?.items,
  }
}

export default useSpotlight
