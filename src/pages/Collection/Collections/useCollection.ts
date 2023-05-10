import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'

import { useFormik } from 'formik'
import { ToastContext } from 'contexts'

import { useModal } from 'hooks'
import useUploadFile from 'hooks/useUploadFile'
import useSnackbarAlert from 'hooks/useSnackbar'

import {
  useCollectionCategoriesService,
  useCollectionsService,
  useCreateCollectionService,
  useDeleteCollectionByIdService,
} from 'services/useCollectionService'

const initialValues = {
  collection_name: '',
  collection_category: '',
  collection_description: '',
  game_id: '',
  banner_image: '',
  logo_image: '',
  cover_image: '',
  featured_image: '',
  collection_url: '',
  collection_web_link: '',
  collection_categories: [],
}

export const useCollection = (collection_data?: any) => {
  const { setToast } = useContext(ToastContext)

  const { t } = useTranslation()

  const navigate = useNavigate()

  const [fileUploadType, setFileUploadType] = useState('')

  const id: string = collection_data?.game_id

  const [createCollection] = useCreateCollectionService()
  const { openModal, closeModal } = useModal()
  const { data, refetch: refetchCollection } = useCollectionsService({
    game_id: id,
    page: 1,
    limit: 100,
    search_text: '',
  })

  const { data: collectionCategories } = useCollectionCategoriesService(id)

  const [deleteCollectionById] = useDeleteCollectionByIdService()

  const { uploadFile, uploadProgress, loading: generateLinkLoading } = useUploadFile()

  const { setSnackbar } = useSnackbarAlert()

  const handleSubmit = async (values: any) => {
    const collectionInput = {
      name: values.collection_name,
      category: values.collection_category,
      description: values.collection_description,
      game_id: id,
      banner_image: values.banner_image,
      logo_image: values.logo_image,
      cover_image: values.cover_image,
      featured_image: values.featured_image,
      url: values.collection_url,
      web_link: values.collection_web_link,
      categories: values.collection_categories,
    }

    const res = await createCollection(collectionInput, () => {})

    if (!res) {
      setToast({
        message: t('failed-to-create-new-collection'),
        type: 'negative',
        open: true,
      })
      setTimeout(function () {
        closeModal('create-collection-modal')
      }, 4000)
    }

    if (res) {
      setToast({
        message: t('new-collection-created'),
        type: 'positive',
        open: true,
      })

      await refetchCollection()
      closeModal('spotlight-modal')
      setTimeout(function () {
        closeModal('create-collection-modal')
        navigate(`/collection/${res.collection.id}/general`)
      }, 4000)
    }
  }

  const handleDeleteCollection = async (game: any) => {
    openModal({
      name: 'delete-confirmation-modal',
      data: {
        closeModal: () => closeModal('delete-confirmation-modal'),
        deleteItem: async () => {
          const res = await deleteCollectionById(game.id)
          if (res.success) {
            await refetchCollection()
            setSnackbar({
              message: t('collection-successfully-deleted'),
              variant: 'success',
            })
            closeModal('delete-confirmation-modal')
          }
          if (!res.success) {
            setSnackbar({
              message: t('collection-delete-failed'),
              variant: 'error',
            })
          }
        },
        label: t('are-you-sure-you-want-to-delete-this-collection?'),
        title: t('delete-collection'),
      },
    })
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async values => handleSubmit(values),
  })

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

  useEffect(() => {
    refetchCollection()
  }, []) //eslint-disable-line

  const formHook = useForm({
    defaultValues: initialValues,
  })

  return {
    formik,
    data,
    handleDeleteCollection,
    fileUploadType,
    handleChangeFile,
    uploadProgress,
    generateLinkLoading,
    onDeleteImg,
    formHook,
    handleSubmit,
    collectionCategories,
  }
}
