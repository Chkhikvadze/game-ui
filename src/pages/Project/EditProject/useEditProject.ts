import { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import {
  useDeleteProjectByIdService,
  useProjectByIdService,
  useSetDefaultProjectMediaService,
  useUpdateProjectByIdService,
  useUpdateProjectImages,
} from 'services/useGameService'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContext } from 'contexts'

import useUploadFile from 'hooks/useUploadFile'
import { projectValidationSchema } from 'utils/validationsSchema'
import { useTranslation } from 'react-i18next'
import { useModal } from 'hooks'

export const useEditProject = () => {
  const { t } = useTranslation()

  const [uploadImageLoading, setUploadImageLoading] = useState(false)

  const { setToast } = useContext(ToastContext)

  const navigate = useNavigate()
  const { openModal, closeModal } = useModal()

  const [fileUploadType, setFileUploadType] = useState('')
  const params = useParams()
  const projectId: string = params.projectId as string
  const { uploadFile, uploadProgress, loading: generateLinkLoading } = useUploadFile()

  const { data: projectById, refetch: projectRefetch } = useProjectByIdService({ id: projectId })

  const {
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
    is_social,
    is_contact,
  } = projectById

  const [updateProjectById] = useUpdateProjectByIdService()
  const { deleteProjectById } = useDeleteProjectByIdService()
  const [updateProjectImages] = useUpdateProjectImages()
  const { setDefaultProjectMedia, loading: setDefaultImageLoading } =
    useSetDefaultProjectMediaService()

  const defaultValues = {
    project_name: name,
    project_category: category,
    project_description: description,
    project_images: medias,
    banner_image: banner_image,
    logo_image: logo_image,
    background_image: background_image,
    project_url: url,
    project_web_link: web_link,
    project_twitter_link: twitter,
    project_instagram_link: instagram,
    project_discord_link: discord,
    project_contact_phone: contact_phone,
    project_contact_email: contact_email,
    project_is_url: is_url,
    project_is_social: is_social,
    project_is_contact: is_contact,
    main_media,
  }

  const handleSubmit = async (values: any) => {
    const updatedValues = {
      name: values.project_name,
      description: values.project_description,
      category: values.project_category,
      images: values.images,
      banner_image: values.banner_image,
      logo_image: values.logo_image,
      background_image: values.background_image,
      url: values.project_url,
      web_link: values.project_web_link,
      twitter: values.project_twitter_link,
      instagram: values.project_instagram_link,
      discord: values.project_discord_link,
      contact_phone: values.project_contact_phone,
      contact_email: values.project_contact_email,
    }

    await updateProjectById(projectId, {
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
    updateProjectById(projectId, updatedValue)
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
        game_id: projectId,
      }
      promises.push(uploadFile(fileObj, files[key]))
    })
    const result = await Promise.all(promises)

    const mappedResult = result.map((url: string) => {
      return { is_main: false, url: url, format: '' }
    })
    await updateProjectImages(projectId, mappedResult)
    await projectRefetch()
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

  const handleDeleteProject = async () => {
    openModal({
      name: 'delete-confirmation-modal',
      data: {
        closeModal: () => closeModal('delete-confirmation-modal'),
        deleteItem: async () => {
          const res = await deleteProjectById(projectById.id)
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

  const onSetDefaultProjectMedia = async (media_id: string) => {
    const res = await setDefaultProjectMedia(projectId, media_id)
    await projectRefetch()
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
    validationSchema: projectValidationSchema,
  })

  useEffect(() => {
    projectRefetch()
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
    projectById,
    updateToggle,
    handleDeleteProject,
    handleUploadImages,
    onSetDefaultProjectMedia,
    setDefaultImageLoading,
    uploadImageLoading,
  }
}
