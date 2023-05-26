import moment from 'moment'
import { useCollectionsServiceLazy, usePlayersServiceLazy } from 'services'

const useReportData = () => {
  const { fetchPlayers } = usePlayersServiceLazy()
  const { fetchCollections } = useCollectionsServiceLazy()

  const groupPlayersByCreatedDate = (players: any[]) => {
    const counts: Record<string, number> = {}

    players.forEach(player => {
      const month = moment(player.created_on).format('MMM')
      counts[month] = (counts[month] || 0) + 1
    })

    let result = Object.keys(counts).map(key => ({ name: key, value: counts[key] }))
    result = result.slice(-12)

    return result
  }

  const groupCollectionsByCategories = (collections: any[]) => {
    const counts: Record<string, number> = {}

    collections.forEach(({ categories }) => {
      categories?.forEach((category: any) => {
        const { value } = category
        counts[value] = (counts[value] || 0) + 1
      })
    })

    let result = Object.keys(counts).map(key => ({ name: key, value: counts[key] }))
    result = result.slice(-12)

    return result
  }

  const getGameReportData = async (gameId: string) => {
    const players = await fetchPlayers({ page: 1, limit: 100, search_text: '', game_id: gameId })
    const playersChartData = groupPlayersByCreatedDate(players)

    const collections = await fetchCollections({
      page: 1,
      limit: 100,
      search_text: '',
      game_id: gameId,
    })
    const collectionsChartData = groupCollectionsByCategories(collections)

    // fetch game
    // fetch collections
    // fetch assets

    return {
      playersChartData,
      collectionsChartData,
    }
  }

  return { getGameReportData }
}

export default useReportData
