import { useEffect, useState, useContext } from 'react'
import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useCollectionByIdService,
  useDeleteCollectionByIdService,
  useUpdateCollectionByIdService,
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
  const collectionId = params.collectionId
  const { openModal, closeModal } = useModal()
  const { data: collection, refetch: collectionRefetch } = useCollectionByIdService({
    id: collectionId,
  })
  const [updateCollectionById] = useUpdateCollectionByIdService()
  const [deleteCollectionById] = useDeleteCollectionByIdService()
  const { uploadFile, uploadProgress, loading: generateLinkLoading } = useUploadFile()

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
            navigate(`/game/${collection.project_id}/collections`)
            setToast({
              message: t('collection-successfully-deleted'),
              type: 'positive',
              open: true,
            })

            closeModal('delete-confirmation-modal')
          }
          if (!res.success) {
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

  const formik = useFormik({
    initialValues: defaultValues,
    enableReinitialize: true,
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

    // const updatedValues = {
    //   [fieldName]: res,
    // }

    // await updateCollectionById(collectionId, {
    //   ...updatedValues,
    // })
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
    collectionRefetch()
  }, []) //eslint-disable-line

  return {
    formik,
    fileUploadType,
    handleChangeFile,
    uploadProgress,
    generateLinkLoading,
    onDeleteImg,
    handleDeleteCollection,
  }
}
