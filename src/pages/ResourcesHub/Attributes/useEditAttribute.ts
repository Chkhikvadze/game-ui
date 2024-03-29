import { useContext, useState } from 'react'
import useUploadFile from 'hooks/useUploadFile'
import {
  useAttributeIdService,
  useUpdateAttributeByIdService,
  useUpdateCacheThenServerAttribute,
  useDeleteAttributeService,
} from 'services/useAssetResourcesService'
import { useModal } from 'hooks'
import { ToastContext } from 'contexts'
import { t } from 'i18next'
import { useAttributes } from './useAttributes'

export const useEditAttributes = (attributeId?: number) => {
  const { setToast } = useContext(ToastContext)
  const { openModal, closeModal } = useModal()
  const [uploading, setUploading] = useState(false)

  const { uploadFile, uploadProgress } = useUploadFile()

  const { data: attribute, refetch } = useAttributeIdService({
    id: attributeId || '',
  })
  const { attributesRefetch } = useAttributes()

  const cellEditFn = useUpdateCacheThenServerAttribute()

  const [updateAttributeById] = useUpdateAttributeByIdService()

  const [deleteAttributeService] = useDeleteAttributeService()

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

  const deleteAttribute = async (id: string) => {
    const res = await deleteAttributeService(id)
    if (!res || !res.success) {
      return setToast({
        message: 'failed to delete attribute',
        type: 'negative',
        open: true,
      })
    }
    setToast({
      message: t('attribute was deleted'),
      type: 'positive',
      open: true,
    })
    closeModal('create-team-modal')
  }

  const deleteRow = async (itemId: string) => {
    await deleteAttribute(itemId)
    attributesRefetch()
  }

  const getContextMenuItems = (params: any) => {
    const itemId = params.node.data?.id

    const result = [
      ...params.defaultItems,
      {
        name: 'Delete',
        action: () => {
          const deleteFunc = async () => {
            await deleteRow(itemId)
            closeModal('delete-confirmation-modal')
          }
          openModal({
            name: 'delete-confirmation-modal',
            data: {
              deleteItem: deleteFunc,
              closeModal: () => closeModal('delete-confirmation-modal'),
              label: t('are-you-sure-you-want-to-delete-this-row?'),
              title: t('delete-row'),
            },
          })
        },
      },
    ]
    return result
  }

  return {
    attribute,
    handleUpdateMedia,
    refetch,
    cellEditFn,
    uploading,
    deleteAttribute,
    getContextMenuItems,
    attributesRefetch,
  }
}
