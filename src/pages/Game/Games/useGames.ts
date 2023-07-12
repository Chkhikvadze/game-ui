import { useEffect, useState, useContext } from 'react'
import { ToastContext } from 'contexts'

import useSnackbarAlert from 'hooks/useSnackbar'
import { useFormik } from 'formik'
import { useModal } from 'hooks'
import useUploadFile from 'hooks/useUploadFile'
import { gameValidationSchema } from 'utils/validationsSchema'

import { useTranslation } from 'react-i18next'

import { useNavigate } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import { useCreateGameService, useDeleteGameByIdService, useGamesService } from 'services'

const initialValues = {
  game_name: '',
  game_category: '',
  game_description: '',
  banner_image: '',
  logo_image: '',
  background_image: '',
  game_url: '',
  game_web_link: '',
  game_twitter_link: '',
  game_instagram_link: '',
  game_discord_link: '',
}

export const useGames = () => {
  const { setToast } = useContext(ToastContext)
  const { t } = useTranslation()

  const navigate = useNavigate()

  const [fileUploadType, setFileUploadType] = useState('')

  const { openModal, closeModal } = useModal()
  const { setSnackbar } = useSnackbarAlert()

  const [createGameService] = useCreateGameService()
  const { data, refetch: refetchGames } = useGamesService({
    page: 1,
    limit: 100,
    search_text: '',
  })
  const { deleteGameById } = useDeleteGameByIdService()
  const { uploadFile, uploadProgress, loading: generateLinkLoading } = useUploadFile()

  const openCreateGameModal = () => {
    openModal({
      name: 'create-game-modal',
    })
  }

  const handleSubmit = async (values: any) => {
    const gameInput = {
      name: values.game_name,
      category: values.game_category,
      logo_image: values.logo_image,
      // description: values.game_description,
      // banner_image: values.banner_image,
      // background_image: values.background_image,
      // url: values.game_url,
      // web_link: values.game_web_link,
      // twitter: values.game_twitter_link,
      // instagram: values.game_instagram_link,
      // discord: values.game_discord_link,
    }

    const res = await createGameService(gameInput, () => {})

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

      await refetchGames()
      setTimeout(function () {
        navigate(`/`)
        closeModal('spotlight-modal')
        closeModal('create-game-modal')
      }, 4000)
    }
  }

  const handleDeleteGame = async (game: any) => {
    openModal({
      name: 'delete-confirmation-modal',
      data: {
        closeModal: () => closeModal('delete-confirmation-modal'),
        deleteItem: async () => {
          const res = await deleteGameById(game.id)
          if (res.success) {
            await refetchGames()
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
    validationSchema: gameValidationSchema,
    // enableReinitialize: true,
  })

  const formHook = useForm({
    defaultValues: initialValues,
  })

  useEffect(() => {
    refetchGames()
  }, []) //eslint-disable-line

  useEffect(() => {
    if (uploadProgress === 99.99) {
      setFileUploadType('')
    }
  }, [uploadProgress])

  return {
    formik,
    openCreateGameModal,
    data,
    handleDeleteGame,
    fileUploadType,
    handleChangeFile,
    uploadProgress,
    generateLinkLoading,
    onDeleteImg,
    formHook,
    handleSubmit,
  }
}
