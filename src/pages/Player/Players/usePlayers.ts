import { useFormik } from 'formik'
import { useModal } from 'hooks'
import {
  useCreatePlayerService,
  useDeletePlayerByIdService,
  usePlayersService,
} from 'services/usePlayerService'
import useSnackbarAlert from 'hooks/useSnackbar'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import useUploadFile from 'hooks/useUploadFile'

const initialValues = {
  unique_id: '',
  avatar: '',
  name: '',
  project_id: '',
}

const usePlayers = () => {
  const params = useParams()
  const [fileUploadType, setFileUploadType] = useState('')

  const { openModal, closeModal } = useModal()
  const { setSnackbar } = useSnackbarAlert()

  const [createPlayerService] = useCreatePlayerService()
  const { data, refetch: refetchPlayers } = usePlayersService({
    page: 1,
    limit: 100,
    search_text: '',
    project_id: params.projectId,
  })
  const [deletePlayerById] = useDeletePlayerByIdService()

  const { uploadFile, uploadProgress, loading: generateLinkLoading } = useUploadFile()

  const openCreatePlayerModal = () => {
    openModal({
      name: 'create-player-modal',
    })
  }

  const handleSubmit = async (values: any) => {
    const playerInput = {
      unique_id: values.unique_id,
      avatar: values.avatar,
      name: values.name,
      project_id: params.projectId,
    }

    const res = await createPlayerService(playerInput, () => {})

    if (!res) {
      setSnackbar({ message: 'Failed to Add Player', variant: 'error' })
      closeModal('create-player-modal')
      return
    }

    if (res) {
      setSnackbar({
        message: 'New player was created',
        variant: 'success',
      })
      closeModal('create-player-modal')
      refetchPlayers()
      return
    }
  }

  const handleDeletePlayer = async (project: any) => {
    openModal({
      name: 'delete-confirmation-modal',
      data: {
        closeModal: () => closeModal('delete-confirmation-modal'),
        deleteItem: async () => {
          const res = await deletePlayerById(project.id)
          if (res.success) {
            await refetchPlayers()
            setSnackbar({
              message: 'Player successfully deleted',
              variant: 'success',
            })
            closeModal('delete-confirmation-modal')
          }
          if (!res.success) {
            setSnackbar({
              message: 'Player delete failed',
              variant: 'error',
            })
          }
        },
        label: 'Are you sure you want to delete this Player?',
        title: 'Delete Player',
      },
    })
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

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => handleSubmit(values),
    // validationSchema:projectValidationSchema
  })

  return {
    data,
    formik,
    openCreatePlayerModal,
    handleChangeFile,
    onDeleteImg,
    fileUploadType,
    uploadProgress,
    generateLinkLoading,
    handleDeletePlayer,
  }
}

export default usePlayers
