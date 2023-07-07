import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'

import useSnackbarAlert from 'hooks/useSnackbar'
import { useModal } from 'hooks'

import { useCollectionByIdService } from 'services/useCollectionService'
import {
  useDeletePropertyByIdService,
  usePropertiesService,
  useCreatePropertyInCacheThenServerService,
} from 'services/usePropertyService'

import { useTranslation } from 'react-i18next'
import useUploadFile from 'hooks/useUploadFile'

const initialValues = {
  property_name: '',
  property_type: '',
  property_description: '',
  media: '',
}

export const useProperties = () => {
  const [uploadLoader, setUploadLoader] = useState(false)
  const { uploadFile, uploadProgress, loading: generateLinkLoading } = useUploadFile()

  const { t } = useTranslation()
  const params = useParams()
  const game_id: string = params?.gameId!

  const [deletePropertById] = useDeletePropertyByIdService()
  const { setSnackbar } = useSnackbarAlert()

  // const [createPropertyService] = useCreatePropertyService();
  const filter = {
    game_id: game_id || '',
    page: 1,
    limit: 100,
    search_text: '',
    sort: 'name',
    order: 'ASC',
  }
  const [createPropertyService] = useCreatePropertyInCacheThenServerService({
    filter,
  })

  const { openModal, closeModal } = useModal()

  const { data, refetch: propertiesRefetch } = usePropertiesService(filter)

  const openCreateCollectionModal = () => {
    openModal({
      name: 'create-property-modal',
    })
  }

  const handleSubmit = async (values: any) => {
    const propertyInput = {
      game_id,
      name: values.property_name,
      description: values.property_description,
      property_type: values.property_type,
      value: null,
      media: values.property_media,
      order: data?.items?.length,
    }

    const res = await createPropertyService(propertyInput)

    // propertiesRefetch();

    //todo Sandro you have to refetch collection it when Item added on server

    closeModal('create-property-modal')

    if (!res) {
      setSnackbar({
        message: t('failed-to-create-new-property'),
        variant: 'error',
      })
      closeModal('create-property-modal')
      return
    }

    if (res) {
      setSnackbar({
        message: t('new-property-created'),
        variant: 'success',
      })
      await propertiesRefetch()
      return
    }
  }

  const addBlankRow = () => {
    const propertyInput = {
      game_id,
      name: '',
      description: '',
      property_type: 'String',
      value: null,
      media: '',
      // media: {},
      order: data.items?.length,
    }

    createPropertyService(propertyInput)
  }

  const handleDeleteCollection = async (property: any) => {
    openModal({
      name: 'delete-confirmation-modal',
      data: {
        closeModal: () => closeModal('delete-confirmation-modal'),
        deleteItem: () => {
          deletePropertById(property.id)
            .then(() => {
              propertiesRefetch()
              closeModal('delete-confirmation-modal')
              setSnackbar({
                message: t('property-successfully-deleted'),
                variant: 'success',
              })
            })
            .catch(() => {
              closeModal('delete-confirmation-modal')
              setSnackbar({
                message: t('property-delete-failed'),
                variant: 'error',
              })
            })
        },
        label: t('are-you-sure-you-want-to-delete-this-property?'),
        title: t('delete-property'),
      },
    })
  }

  const handleUploadImages = async (
    event: React.FormEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    setUploadLoader(true)
    const { files }: any = event.target
    const promises: any[] = []

    const fileObj = {
      fileName: files[0].name,
      type: files[0].type,
      fileSize: files[0].size,
      locationField: 'collection',
      game_id,
    }

    const res = await uploadFile(fileObj, files[0])

    await formik.setFieldValue(fieldName, res)

    setUploadLoader(false)
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async values => {
      handleSubmit(values)
    },
  })

  useEffect(() => {
    propertiesRefetch()
  }, []) //eslint-disable-line

  const sliced = data?.items?.slice()
  const reversed = sliced?.reverse()

  return {
    formik,
    openCreateCollectionModal,
    data: reversed,
    game_id,
    handleDeleteCollection,
    createPropertyService,
    addBlankRow,
    deletePropertById,
    propertiesRefetch,
    handleUploadImages,
    loadingMediaUpload: uploadLoader,
  }
}
