import { useState } from 'react'
import useUploadFile from 'hooks/useUploadFile'
import {
  useAttributeIdService,
  useUpdateAttributeByIdService,
  useUpdateCacheThenServerAttribute,
} from 'services/useAssetResourcesService'

export const useEditAttributes = (attributeId?: number) => {
  const [uploading, setUploading] = useState(false)

  const { uploadFile, uploadProgress } = useUploadFile()

  const { data: attribute } = useAttributeIdService({
    id: attributeId || '',
  })

  const cellEditFn = useUpdateCacheThenServerAttribute()

  const [updateAttributeById] = useUpdateAttributeByIdService()

  const handleUpdateMedia = async (event: React.FormEvent<HTMLInputElement>, attribute: any) => {
    setUploading(true)

    const { files }: any = event.target

    const fileObj = {
      fileName: files[0].name,
      type: files[0].type,
      fileSize: files[0].size,
      locationField: 'collection',
      game_id: attribute.game_id,
    }

    const res = await uploadFile(fileObj, files[0])

    await updateAttributeById(attribute.id, {
      game_id: attribute.game_id,
      media: res,
    })

    setUploading(false)
  }

  return {
    attribute,
    handleUpdateMedia,
    cellEditFn,
    uploading,
  }
}
