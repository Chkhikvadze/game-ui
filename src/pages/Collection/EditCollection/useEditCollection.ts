import { useEffect, useState, useContext } from 'react'
import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useCollectionByIdService,
  useDeleteCollectionByIdService,
  useSetDefaultCollectionMediaService,
  useUpdateCollectionByIdService,
  useUpdateCollectionMediasService,
} from 'services/useCollectionService'
// import useSnackbarAlert from 'hooks/useSnackbar'
import useUploadFile from 'hooks/useUploadFile'

import { useTranslation } from 'react-i18next'

import { useModal } from 'hooks'

export const useEditCollection = () => {
  const { t } = useTranslation()

  const { setToast } = useContext(ToastContext)

  const navigate = useNavigate()
  // const { toast, setToast } = useToast()

  const [fileUploadType, setFileUploadType] = useState('')
  const params = useParams()
  const collectionId: string = params.collectionId as string

  const { openModal, closeModal } = useModal()
  const { data: collection, refetch: collectionRefetch } = useCollectionByIdService({
    id: collectionId,
  })
  const [uploadImageLoading, setUploadImageLoading] = useState(false)

  const [updateCollectionById] = useUpdateCollectionByIdService()
  const [deleteCollectionById] = useDeleteCollectionByIdService()
  const { updateCollectionMedias, loading: updateCollectionMediaLoading } =
    useUpdateCollectionMediasService()
  const { uploadFile, uploadProgress, loading: generateLinkLoading } = useUploadFile()
  const { setDefaultGameMedia, loading: setDefaultMediaLoading } =
    useSetDefaultCollectionMediaService()

  const {
    name,
    category,
    description,
    banner_image,
    cover_image,
    featured_image,
    url,
    web_link,
    logo_image,
    medias,
    game_id,
    main_media,
  } = collection

  const defaultValues = {
    collection_name: name,
    collection_description: description,
    collection_category: category,
    banner_image: banner_image,
    cover_image: cover_image,
    featured_image: featured_image,
    collection_url: url,
    collection_web_link: web_link,
    logo_image: logo_image,
    collection_images: medias,
    main_media,
  }

  const handleSubmit = async (values: any) => {
    const updatedValues = {
      name: values.collection_name,
      description: values.collection_description,
      category: values.collection_category,
      banner_image: values.banner_image,
      cover_image: values.cover_image,
      featured_image: values.featured_image,
      url: values.collection_url,
      web_link: values.collection_web_link,
      logo_image: values.logo_image,
    }

    await updateCollectionById(collectionId, {
      ...updatedValues,
    })

    setToast({
      message: t('collection-successfully-updated'),
      type: 'positive',
      open: true,
    })
  }

  const handleDeleteCollection = async () => {
    openModal({
      name: 'delete-confirmation-modal',
      data: {
        closeModal: () => closeModal('delete-confirmation-modal'),
        deleteItem: async () => {
          const res = await deleteCollectionById(collection.id)
          if (res.success) {
            navigate(`/game/${collection.game_id}/collections`)
            setToast({
              message: t('collection-successfully-deleted'),
              type: 'positive',
              open: true,
            })

            closeModal('delete-confirmation-modal')
          } else {
            setToast({
              message: t('collection-delete-failed'),
              type: 'negative',
              open: true,
            })
          }
        },
        label: t('are-you-sure-you-want-to-delete-this-collection?'),
        title: t('delete-collection'),
      },
    })
  }

  const updateCollectionCategory = async (categories: any) => {
    console.log('categories', categories)
    const updatedValues = {
      categories: categories.map((category: { value: any }) => category.value),
    }

    await updateCollectionById(collectionId, { ...updatedValues })
    const res = await updateCollectionById(collectionId, updatedValues)
    collectionRefetch()
    if (!res) {
      setToast({
        message: t('The collection category was successfully updated'),
        type: 'positive',
        open: true,
      })
    } else {
      setToast({
        message: t('The collection category was updated by mistake'),
        type: 'negative',
        open: true,
      })
    }
    collectionRefetch()
  }

  console.log('coolectionInEdit:', collection)

  const formik = useFormik({
    initialValues: defaultValues,
    enableReinitialize: true,
    onSubmit: async values => handleSubmit(values),
  })

  const handleUploadImages = async (e: React.SyntheticEvent<EventTarget>) => {
    const { files }: any = e.target
    const promises: any[] = []

    Object.keys(files).forEach(async function (key) {
      const fileObj = {
        fileName: files[key].name,
        type: files[key].type,
        fileSize: files[key].size,
        locationField: 'collection',
        game_id: game_id,
        collection_id: collectionId,
      }
      promises.push(uploadFile(fileObj, files[key]))
    })
    const result = await Promise.all(promises)

    const mappedResult = result.map((url: string) => {
      return { is_main: false, url: url, format: '' }
    })
    await updateCollectionMedias(collectionId, mappedResult)
    await collectionRefetch()
  }

  const onSetDefaultCollectionMedia = async (media_id: string) => {
    const res = await setDefaultGameMedia(collectionId, media_id)
    await collectionRefetch()
    if (res.success) {
      setToast({
        message: 'Media suceessfully updated',
        type: 'positive',
        open: true,
      })
    }
  }

  const onDeleteImg = (fieldName: string) => {
    formik.setFieldValue(fieldName, '')
    setFileUploadType('')
  }

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

  useEffect(() => {
    collectionRefetch()
  }, []) //eslint-disable-line

  return {
    formik,
    fileUploadType,
    handleUploadImages,
    uploadProgress,
    generateLinkLoading,
    onDeleteImg,
    handleDeleteCollection,
    collection,
    onSetDefaultCollectionMedia,
    updateCollectionMediaLoading,
    setDefaultMediaLoading,
    uploadImageLoading,
    updateCollectionCategory,
  }
}
