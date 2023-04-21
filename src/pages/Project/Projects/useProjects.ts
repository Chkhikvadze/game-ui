import { useEffect, useState, useContext } from 'react'
import { ToastContext } from 'contexts'

import {
  useCreateGameService,
  useDeleteProjectByIdService,
  useProjectsService,
} from 'services/useGameService'
import useSnackbarAlert from 'hooks/useSnackbar'
import { useFormik } from 'formik'
import { useModal } from 'hooks'
import useUploadFile from 'hooks/useUploadFile'
import { projectValidationSchema } from 'utils/validationsSchema'

import { useTranslation } from 'react-i18next'

import { useNavigate } from 'react-router-dom'

import { useForm } from 'react-hook-form'

const initialValues = {
  project_name: '',
  project_category: '',
  project_description: '',
  banner_image: '',
  logo_image: '',
  background_image: '',
  project_url: '',
  project_web_link: '',
  project_twitter_link: '',
  project_instagram_link: '',
  project_discord_link: '',
}

export const useProjects = () => {
  const { setToast } = useContext(ToastContext)
  const { t } = useTranslation()

  const navigate = useNavigate()

  const [fileUploadType, setFileUploadType] = useState('')

  const { openModal, closeModal } = useModal()
  const { setSnackbar } = useSnackbarAlert()

  const [createGameService] = useCreateGameService()
  const { data, refetch: refetchProjects } = useProjectsService({
    page: 1,
    limit: 100,
    search_text: '',
  })
  const { deleteProjectById } = useDeleteProjectByIdService()
  const { uploadFile, uploadProgress, loading: generateLinkLoading } = useUploadFile()

  const openCreateProjectModal = () => {
    openModal({
      name: 'create-game-modal',
    })
  }

  const handleSubmit = async (values: any) => {
    const projectInput = {
      name: values.project_name,
      category: values.project_category,
      logo_image: values.logo_image,
      // description: values.project_description,
      // banner_image: values.banner_image,
      // background_image: values.background_image,
      // url: values.project_url,
      // web_link: values.project_web_link,
      // twitter: values.project_twitter_link,
      // instagram: values.project_instagram_link,
      // discord: values.project_discord_link,
    }

    const res = await createGameService(projectInput, () => {})

    if (!res) {
      setToast({
        message: t('failed-to-add-new-api-key'),
        type: 'negative',
        open: true,
      })
      setTimeout(function () {
        closeModal('create-game-modal')
      }, 4000)
    }

    if (res) {
      setToast({
        message: t('new-game-was-created'),
        type: 'positive',
        open: true,
      })

      await refetchProjects()
      setTimeout(function () {
        closeModal('create-game-modal')

        navigate(`${res.game.id}/general`)
      }, 4000)
    }
  }

  const handleDeleteProject = async (game: any) => {
    openModal({
      name: 'delete-confirmation-modal',
      data: {
        closeModal: () => closeModal('delete-confirmation-modal'),
        deleteItem: async () => {
          const res = await deleteProjectById(game.id)
          if (res.success) {
            await refetchProjects()
            setSnackbar({
              message: t('game-successfully-deleted'),
              variant: 'success',
            })
            closeModal('delete-confirmation-modal')
          }
          if (!res.success) {
            setSnackbar({
              message: t('game-delete-failed'),
              variant: 'error',
            })
          }
        },
        label: t('are-you-sure-you-want-to-delete-this-game?'),
        title: t('delete-game'),
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
    onSubmit: async values => handleSubmit(values),
    validationSchema: projectValidationSchema,
    // enableReinitialize: true,
  })

  const formHook = useForm({
    defaultValues: initialValues,
  })

  useEffect(() => {
    refetchProjects()
  }, []) //eslint-disable-line

  useEffect(() => {
    if (uploadProgress === 99.99) {
      setFileUploadType('')
    }
  }, [uploadProgress])

  return {
    formik,
    openCreateProjectModal,
    data,
    handleDeleteProject,
    fileUploadType,
    handleChangeFile,
    uploadProgress,
    generateLinkLoading,
    onDeleteImg,
    formHook,
    handleSubmit,
  }
}
