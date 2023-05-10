import { useGamesServiceLazy } from 'services/useGameService'

const useSpotlight = () => {
  const { getGames, data } = useGamesServiceLazy()

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
