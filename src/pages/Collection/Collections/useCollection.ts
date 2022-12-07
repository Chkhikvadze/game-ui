import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useModal } from 'hooks'
import { useParams } from 'react-router-dom'

import useUploadFile from 'hooks/useUploadFile'

import useSnackbarAlert from 'hooks/useSnackbar'

import {
  useCollectionsService,
  useCreateCollectionService,
  useDeleteCollectionByIdService,
} from 'services/useCollectionService'

const initialValues = {
  collection_name: '',
  collection_category: '',
  collection_description: '',
  project_id: '',
  banner_image: '',
  logo_image: '',
  cover_image: '',
  featured_image: '',
  collection_url: '',
  collection_web_link: '',
}

export const useCollection = () => {
  const [fileUploadType, setFileUploadType] = useState('')

  const params = useParams()
  const id: string = params?.projectId!

  const [createCollection] = useCreateCollectionService()
  const { openModal, closeModal } = useModal()
  const { data, refetch: refetchCollection } = useCollectionsService({
    project_id: id,
    page: 1,
    limit: 100,
    search_text: '',
  })

  const [deleteCollectionById] = useDeleteCollectionByIdService()

  const { uploadFile, uploadProgress, loading: generateLinkLoading } = useUploadFile()

  const { setSnackbar } = useSnackbarAlert()

  const openCreateCollectionModal = () => {
    openModal({
      name: 'create-collection-modal',
    })
  }

  const handleSubmit = async (values: any) => {
    const projectInput = {
      name: values.collection_name,
      category: values.collection_category,
      description: values.collection_description,
      project_id: id,
      banner_image: values.banner_image,
      logo_image: values.logo_image,
      cover_image: values.cover_image,
      featured_image: values.featured_image,
      url: values.collection_url,
      web_link: values.collection_web_link,
    }

    const res = await createCollection(projectInput, () => {})

    if (!res) {
      setSnackbar({ message: 'Failed to create new collection', variant: 'error' })
      closeModal('create-project-modal')
      return
    }

    if (res) {
      setSnackbar({
        message: 'New Collection created',
        variant: 'success',
      })
      closeModal('create-collection-modal')
      await refetchCollection()
      return
    }
  }

  const handleDeleteCollection = async (project: any) => {
    openModal({
      name: 'delete-confirmation-modal',
      data: {
        closeModal: () => closeModal('delete-confirmation-modal'),
        deleteItem: async () => {
          const res = await deleteCollectionById(project.id)
          if (res.success) {
            await refetchCollection()
            setSnackbar({
              message: 'Collection successfully deleted',
              variant: 'success',
            })
            closeModal('delete-confirmation-modal')
          }
          if (!res.success) {
            setSnackbar({
              message: 'Collection delete failed',
              variant: 'error',
            })
          }
        },
        label: 'Are you sure you want to delete this collection?',
        title: 'Delete collection',
      },
    })
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => handleSubmit(values),
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

  return {
    formik,
    openCreateCollectionModal,
    data,
    handleDeleteCollection,
    fileUploadType,
    handleChangeFile,
    uploadProgress,
    generateLinkLoading,
    onDeleteImg,
  }
}
