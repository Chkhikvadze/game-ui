import { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContext } from 'contexts'

import useUploadFile from 'hooks/useUploadFile'
import { gameValidationSchema } from 'utils/validationsSchema'
import { useTranslation } from 'react-i18next'
import { useModal } from 'hooks'
import {
  IGame,
  useDeleteGameByIdService,
  useGameByIdService,
  useSetDefaultGameMediaService,
  useUpdateGameByIdService,
  useUpdateGameImages,
} from 'services'

export const useEditGame = () => {
  const { t } = useTranslation()

  const [uploadImageLoading, setUploadImageLoading] = useState(false)

  const { setToast } = useContext(ToastContext)

  const navigate = useNavigate()
  const { openModal, closeModal } = useModal()

  const [fileUploadType, setFileUploadType] = useState('')
  const params = useParams()
  const gameId: string = params.gameId as string
  const { uploadFile, uploadProgress, loading: generateLinkLoading } = useUploadFile()

  const { data: gameById, refetch: gameRefetch } = useGameByIdService({ id: gameId })

  const {
    id,
    name,
    category,
    description,
    medias,
    main_media,
    banner_image,
    logo_image,
    background_image,
    url,
    web_link,
    twitter,
    instagram,
    discord,
    contact_email,
    contact_phone,
    is_url,
  } = gameById || {}

  const [updateGameById] = useUpdateGameByIdService()
  const { deleteGameById } = useDeleteGameByIdService()
  const [updateGameImages] = useUpdateGameImages()
  const { setDefaultGameMedia, loading: setDefaultImageLoading } = useSetDefaultGameMediaService()

  const defaultValues = {
    game_name: name,
    game_category: category,
    game_description: description,
    game_images: medias,
    banner_image: banner_image,
    logo_image: logo_image,
    background_image: background_image,
    game_url: url,
    game_web_link: web_link,
    game_twitter_link: twitter,
    game_instagram_link: instagram,
    game_discord_link: discord,
    game_contact_phone: contact_phone,
    game_contact_email: contact_email,
    game_is_url: is_url,
    game_is_social: false,
    game_is_contact: false,
    main_media,
  }

  const handleSubmit = async (values: any) => {
    const updatedValues = {
      name: values.game_name,
      description: values.game_description,
      category: values.game_category,
      images: values.images,
      banner_image: values.banner_image,
      logo_image: values.logo_image,
      background_image: values.background_image,
      url: values.game_url,
      web_link: values.game_web_link,
      twitter: values.game_twitter_link,
      instagram: values.game_instagram_link,
      discord: values.game_discord_link,
      contact_phone: values.game_contact_phone,
      contact_email: values.game_contact_email,
    }

    await updateGameById(gameId, {
      ...updatedValues,
    })

    setToast({
      message: t('game-successfully-updated'),
      type: 'positive',
      open: true,
    })
  }

  const updateToggle = (toggle: boolean, fieldName: string) => {
    const updatedValue = {
      [fieldName]: toggle,
    }
    updateGameById(gameId, updatedValue)
  }

  const handleUploadImages = async (e: React.SyntheticEvent<EventTarget>) => {
    const { files }: any = e.target
    const promises: any[] = []

    Object.keys(files).forEach(async function (key) {
      const fileObj = {
        fileName: files[key].name,
        type: files[key].type,
        fileSize: files[key].size,
        locationField: 'collection',
        game_id: gameId,
      }
      promises.push(uploadFile(fileObj, files[key]))
    })
    const result = await Promise.all(promises)

    const mappedResult = result.map((url: string) => {
      return { is_main: false, url: url, format: '' }
    })
    await updateGameImages(gameId, mappedResult)
    await gameRefetch()
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

  useEffect(() => {
    if (uploadProgress === 99.99) {
      setFileUploadType('')
    }
  }, [uploadProgress])

  const handleDeleteGame = async () => {
    if (!gameById) return
    openModal({
      name: 'delete-confirmation-modal',
      data: {
        closeModal: () => closeModal('delete-confirmation-modal'),
        deleteItem: async () => {
          const res = await deleteGameById(gameById?.id)
          if (res.success) {
            navigate(`/game`)
            setToast({
              message: t('game-successfully-deleted'),
              type: 'positive',
              open: true,
            })
            closeModal('delete-confirmation-modal')
          } else {
            setToast({
              message: t('game-delete-failed'),
              type: 'negative',
              open: true,
            })
          }
        },
        label: t('are-you-sure-you-want-to-delete-this-game?'),
        title: t('delete-game'),
      },
    })
  }

  const onSetDefaultGameMedia = async (media_id: string) => {
    const res = await setDefaultGameMedia(gameId, media_id)
    await gameRefetch()
    if (res.success) {
      setToast({
        message: 'Media suceessfully updated',
        type: 'positive',
        open: true,
      })
    }
  }

  const formik = useFormik({
    initialValues: defaultValues,
    enableReinitialize: true,
    onSubmit: async values => handleSubmit(values),
    validationSchema: gameValidationSchema,
  })

  useEffect(() => {
    gameRefetch()
  }, []) //eslint-disable-line

  useEffect(() => {
    if (uploadProgress > 0) {
      setUploadImageLoading(true)
    }
    if (uploadProgress > 99.99) {
      setUploadImageLoading(false)
      setToast({
        message: 'Image uploaded successfully',
        type: 'positive',
        open: true,
      })
    }
  }, [uploadProgress]) //eslint-disable-line

  return {
    formik,
    onDeleteImg,
    handleChangeFile,
    generateLinkLoading,
    fileUploadType,
    gameById,
    updateToggle,
    handleDeleteGame,
    handleUploadImages,
    onSetDefaultGameMedia,
    setDefaultImageLoading,
    uploadImageLoading,
  }
}
