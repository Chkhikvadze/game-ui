import { useContext, useState } from 'react'
import useUploadFile from 'hooks/useUploadFile'
import { useModal } from 'hooks'
import {
  useUpdateCacheThenServerReward,
  useUpdateRewardByIdService,
  useDeleteRewardService,
  useRewardsService,
} from 'services/useAssetResourcesService'
import { ToastContext } from 'contexts'
import { t } from 'i18next'

export const useEditReward = (rewardId?: number) => {
  const { setToast } = useContext(ToastContext)
  const { openModal, closeModal } = useModal()
  const [uploading, setUploading] = useState(false)

  const { uploadFile, uploadProgress } = useUploadFile()

  const cellEditFn = useUpdateCacheThenServerReward()
  const [updateRewardById] = useUpdateRewardByIdService()
  const [deleteRewardService] = useDeleteRewardService()

  const handleUpdateMedia = async (event: React.FormEvent<HTMLInputElement>, reward: any) => {
    setUploading(true)

    const { files }: any = event.target

    const fileObj = {
      fileName: files[0].name,
      type: files[0].type,
      fileSize: files[0].size,
      locationField: 'collection',
      game_id: reward.game_id,
    }

    const res = await uploadFile(fileObj, files[0])

    await updateRewardById(reward.id, {
      game_id: reward.game_id,
      media: res,
    })

    setUploading(false)
  }

  const deleteReward = async (id: string) => {
    const res = await deleteRewardService(id)
    if (!res || !res.success) {
      return setToast({
        message: 'failed to delete reward',
        type: 'negative',
        open: true,
      })
    }
    setToast({
      message: t('reward was deleted'),
      type: 'positive',
      open: true,
    })
  }

  return {
    cellEditFn,
    handleUpdateMedia,
    uploading,
    deleteReward,
  }
}
