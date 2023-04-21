import React from 'react'
import { useCreateAssetFromTokenIdService } from 'services'
import useUploadFile from 'hooks/useUploadFile'
import { useNavigate, useParams } from 'react-router-dom'
import { useCollectionByIdService } from 'services/useCollectionService'
import useSnackbarAlert from 'hooks/useSnackbar'

import { useTranslation } from 'react-i18next'

const useImportImages = () => {
  const { t } = useTranslation()
  const { setSnackbar } = useSnackbarAlert()
  const navigate = useNavigate()
  const params = useParams()
  const collectionId: string = params?.collectionId!
  const [selectedFiled, setSelectedFiles] = React.useState<any>({
    files: [],
    uploaded_files: {},
  })

  const { uploadFile, loading, uploadProgress } = useUploadFile()
  const { createAssetFromTokenIdService } = useCreateAssetFromTokenIdService()
  const { data: collection } = useCollectionByIdService({ id: collectionId })

  const handleFileChange = async (e: any) => {
    const { files }: any = e.target
    const token_id = []
    const selected_files = []

    setSelectedFiles({ ...selectedFiled, files: Object.values(files) })

    for (const [index, file] of Object.values(files).entries()) {
      const f: any = file
      const fileObj: any = {
        fileName: f.name,
        type: f.type,
        fileSize: f.size,
        locationField: 'collection',
        collection_id: collection.id,
        game_id: collection.game_id,
      }

      const file_name = f.name.replace(/\.[^/.]+$/, '')

      const res = await uploadFile(fileObj, f)

      token_id.push({ image_name: file_name, asset_url: res })
      selected_files[index] = res
    }

    setSelectedFiles({ files: Object.values(files), uploaded_files: selected_files })

    const response = await createAssetFromTokenIdService(
      token_id,
      collection.game_id,
      collection.id,
    )

    setSnackbar({
      message: `${t('file-uploaded-successfully')} (${files.length}, ${response.data.length}) `,
      variant: 'success',
    })

    navigate(-1)
  }

  return {
    handleFileChange,
    selectedFiled,
    loading: loading || (uploadProgress > 0 && uploadProgress < 99.99),
  }
}

export default useImportImages
