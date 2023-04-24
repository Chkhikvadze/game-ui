import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { usePlayerByIdService, useUpdatePlayerByIdService } from 'services/usePlayerService'

import { useParams } from 'react-router-dom'
import useSnackbarAlert from 'hooks/useSnackbar'
import useUploadFile from 'hooks/useUploadFile'

import { useTranslation } from 'react-i18next'
import { usePlayerAssetsService } from 'services/usePlayerAssetService'
import { useModal } from 'hooks'

const useEditPlayer = () => {
  const { t } = useTranslation()
  const { setSnackbar } = useSnackbarAlert()

  const params = useParams()
  const playerId = params.playerId

  const { closeModal } = useModal()

  const [fileUploadType, setFileUploadType] = useState('')

  const { uploadFile, uploadProgress } = useUploadFile()

  const { data: playerById, refetch: playerRefetch } = usePlayerByIdService({ id: playerId })

  const { unique_id, name, avatar, username, email, custom_props, game_id } = playerById

  // console.log('playerAssets', playerAssets)

  const [updatePlayerById] = useUpdatePlayerByIdService()

  const defaultValues = {
    unique_id,
    name,
    avatar,
    username,
    email,
    custom_props,
  }

  const handleSubmit = async (values: any) => {
    await updatePlayerById(playerId, {
      ...values,
    })

    setSnackbar({
      message: t('player successfully-updated'),
      variant: 'success',
    })

    closeModal('edit-player-modal')
  }

  const handleChangeFile = async (e: React.SyntheticEvent<EventTarget>, fieldName: string) => {
    const { files }: any = e.target

    const fileObj = {
      fileName: files[0].name,
      type: files[0].type,
      fileSize: files[0].size,
      locationField: 'collection',
      game_id,
    }

    setFileUploadType(fieldName)

    const res = await uploadFile(fileObj, files[0])

    await formik.setFieldValue(fieldName, res)
  }

  const onDeleteImg = (fieldName: string) => {
    formik.setFieldValue(fieldName, '')
    setFileUploadType('')
  }

  useEffect(() => {
    if (uploadProgress === 99.99) {
      setFileUploadType('')
    }
  }, [uploadProgress])

  const formik = useFormik({
    initialValues: defaultValues,
    enableReinitialize: true,
    onSubmit: async values => handleSubmit(values),
    // validationSchema:gameValidationSchema,
  })

  useEffect(() => {
    playerRefetch()
  }, []) //eslint-disable-line

  return {
    formik,
    onDeleteImg,
    handleChangeFile,
    fileUploadType,
    // new values
    closeModal,
  }
}

export default useEditPlayer
