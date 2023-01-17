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
// import objectKeyFormatter from 'helpers/objectKeyFormatter'

import { useTranslation } from 'react-i18next'

const initialValues = {
  player_unique_id: '',
  avatar: '',
  name: '',
  project_id: '',
  is_create_wallet: false,
}

// interface customProp {
//   prop_name: string
//   prop_type: 'Array' | 'String' | 'Object' | 'Number'
//   prop_value: any
// }

const usePlayers = () => {
  const { t } = useTranslation()
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
    // const customProps: { [key: string]: customProp } = {}
    // values.custom_props?.forEach((prop: customProp) => {
    //   const obj = {
    //     prop_name: prop.prop_name,
    //     prop_type: prop.prop_type,
    //     prop_value: prop.prop_value,
    //   }
    //   customProps[objectKeyFormatter(prop.prop_name)] = obj
    // })

    const playerInput = {
      unique_id: values.player_unique_id,
      avatar: values.avatar,
      name: values.name,
      username: values.username,
      email: values.email,
      project_id: params.projectId,
      is_create_wallet: values.is_create_wallet,
      custom_props: values.custom_props,
    }

    const res = await createPlayerService(playerInput, () => {})

    if (!res) {
      setSnackbar({ message: t('failed-to-add-player'), variant: 'error' })
      closeModal('create-player-modal')
      return
    }

    if (res) {
      setSnackbar({
        message: t('new-player-was-created'),
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
              message: t('player-successfully-deleted'),
              variant: 'success',
            })
            closeModal('delete-confirmation-modal')
          }
          if (!res.success) {
            setSnackbar({
              message: t('player-delete-failed'),
              variant: 'error',
            })
          }
        },
        label: t('are-you-sure-you-want-to-delete-this-player?'),
        title: t('delete-player'),
      },
    })
  }

  const handleChangeFile = async (e: React.SyntheticEvent<EventTarget>, fieldName: string) => {
    const { files }: any = e.target

    const fileObj = {
      fileName: files[0].name,
      type: files[0].type,
      fileSize: files[0].size,
      locationField: 'collection',
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
