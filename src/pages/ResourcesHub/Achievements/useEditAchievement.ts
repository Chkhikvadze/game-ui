import { useContext, useState } from 'react'
import useUploadFile from 'hooks/useUploadFile'
import {
  useAchievementIdService,
  useUpdateAchievementByIdService,
  useUpdateCacheThenServerAchievement,
  useDeleteAchievementService,
  useAchievementsService,
} from 'services/useAssetResourcesService'
import { useModal } from 'hooks'
import { AuthContext, ToastContext } from 'contexts'
import { t } from 'i18next'

export const useEditAchievements = (achievementId?: number) => {
  const { setToast } = useContext(ToastContext)
  const { openModal, closeModal } = useModal()
  const [uploading, setUploading] = useState(false)
  const [deleteAchievementService] = useDeleteAchievementService()

  const { uploadFile, uploadProgress } = useUploadFile()

  const { data: achievement } = useAchievementIdService({
    id: achievementId || '',
  })

  const { refetch } = useAchievementsService({ page: 1, limit: 10, game_id: achievement.game_id })

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

  const deleteAchievement = async (id: string) => {
    const res = await deleteAchievementService(id)
    if (!res || !res.success) {
      return setToast({
        message: 'failed to delete achievement',
        type: 'negative',
        open: true,
      })
    }
    setToast({
      message: t('achievement was deleted'),
      type: 'positive',
      open: true,
    })
    refetch()
  }

  return {
    cellEditFn,
    achievement,
    refetch,
    handleUpdateMedia,
    uploading,
    deleteAchievement,
  }
}
