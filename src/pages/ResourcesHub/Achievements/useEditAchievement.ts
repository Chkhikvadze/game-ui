import { useState } from 'react'
import useUploadFile from 'hooks/useUploadFile'
import {
  useAchievementIdService,
  useUpdateAchievementByIdService,
  useUpdateCacheThenServerAchievement,
} from 'services/useAssetResourcesService'

export const useEditAchievements = (achievementId?: number) => {
  const [uploading, setUploading] = useState(false)

  const { uploadFile, uploadProgress } = useUploadFile()

  const { data: achievement, refetch } = useAchievementIdService({
    id: achievementId || '',
  })

  const cellEditFn = useUpdateCacheThenServerAchievement()
  const [updateAchievementById] = useUpdateAchievementByIdService()

  const handleUpdateMedia = async (event: React.FormEvent<HTMLInputElement>, achievement: any) => {
    setUploading(true)

    const { files }: any = event.target

    const fileObj = {
      fileName: files[0].name,
      type: files[0].type,
      fileSize: files[0].size,
      locationField: 'collection',
      game_id: achievement.game_id,
    }

    const res = await uploadFile(fileObj, files[0])

    await updateAchievementById(achievement.id, {
      game_id: achievement.game_id,
      media: res,
    })

    setUploading(false)
  }

  return {
    cellEditFn,
    achievement,
    refetch,
    handleUpdateMedia,
    uploading,
  }
}
