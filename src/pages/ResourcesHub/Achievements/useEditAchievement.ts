import {
  useAchievementIdService,
  useUpdateCacheThenServerAchievement,
} from 'services/useAssetResourcesService'

export const useEditAchievements = (achievementId?: number) => {
  const { data: achievement, refetch } = useAchievementIdService({
    id: achievementId || '',
  })

  const cellEditFn = useUpdateCacheThenServerAchievement()

  return {
    cellEditFn,
    achievement,
    refetch,
  }
}
