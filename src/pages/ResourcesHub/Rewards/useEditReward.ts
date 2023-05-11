import { useState } from 'react'
import useUploadFile from 'hooks/useUploadFile'
import {
  useUpdateCacheThenServerReward,
  useUpdateRewardByIdService,
} from 'services/useAssetResourcesService'

export const useEditReward = (rewardId?: number) => {
  const [uploading, setUploading] = useState(false)

  const { uploadFile, uploadProgress } = useUploadFile()

  const cellEditFn = useUpdateCacheThenServerReward()
  const [updateRewardById] = useUpdateRewardByIdService()

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

  return {
    cellEditFn,
    handleUpdateMedia,
    uploading,
  }
}
