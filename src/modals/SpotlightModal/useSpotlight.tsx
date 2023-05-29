// import { useAssetsService } from 'services'
import { useGamesServiceLazy } from 'services/useGameService'

const useSpotlight = () => {
  const { getGames, data } = useGamesServiceLazy()
  // const { data: assetsData, refetch: assetsRefetch } = useAssetsService({
  //   game_id: '',
  //   collection_id: '',
  //   page: 1,
  //   limit: 100,
  //   search_text: '',
  // })

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
  }
}

export default useSpotlight
