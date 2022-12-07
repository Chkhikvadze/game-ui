import { useFormik } from 'formik'
import { usePlayerByIdService, useUpdatePlayerByIdService } from 'services/usePlayerService'
import { useParams, useNavigate } from 'react-router-dom'
import useSnackbarAlert from 'hooks/useSnackbar'
import { useEffect, useState } from 'react'
import useUploadFile from 'hooks/useUploadFile'

const useEditPlayer = () => {
  const navigate = useNavigate()

  const [fileUploadType, setFileUploadType] = useState('')
  const params = useParams()
  const playerId = params.playerId
  const { setSnackbar } = useSnackbarAlert()
  const { uploadFile, uploadProgress, loading: generateLinkLoading } = useUploadFile()

  const { data: playerById, refetch: playerRefetch } = usePlayerByIdService({ id: playerId })

  const { unique_id, name, avatar, username, email } = playerById

  const [updatePlayerById] = useUpdatePlayerByIdService()

  const defaultValues = {
    unique_id: unique_id,
    avatar: avatar,
    name: name,
    username: username,
    email: email,
  }

  const handleSubmit = async (values: any) => {
    const updatedValues = {
      unique_id: values.unique_id,
      avatar: values.avatar,
      name: values.name,
      username: values.username,
      email: values.email,
    }

    await updatePlayerById(playerId, {
      ...updatedValues,
    })

    setSnackbar({
      message: 'Player successfully updated',
      variant: 'success',
    })

    navigate(-1)
  }

  const handleChangeFile = async (e: React.SyntheticEvent<EventTarget>, fieldName: string) => {
    const { files }: any = e.target

    const fileObj = {
      fileName: files[0].name,
      type: files[0].type,
      fileSize: files[0].size,
      locationField: 'player',
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
    onSubmit: async (values) => handleSubmit(values),
    // validationSchema:projectValidationSchema,
  })

  useEffect(() => {
    playerRefetch()
  }, []) //eslint-disable-line

  return {
    formik,
    onDeleteImg,
    handleChangeFile,
    generateLinkLoading,
    fileUploadType,
  }
}

export default useEditPlayer
