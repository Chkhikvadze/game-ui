import { useEffect, useState } from 'react'
import { useFormik } from 'formik'

import {
  usePropertyIdService,
  useUpdatePropertyByIdService,
  useUpdatePropertyMedia,
} from 'services/usePropertyService'

import { useModal } from 'hooks'
import useSnackbarAlert from 'hooks/useSnackbar'

import { useTranslation } from 'react-i18next'
import useUploadFile from 'hooks/useUploadFile'

export const useEditProperty = (propertyId?: string) => {
  const { t } = useTranslation()
  const { openModal, closeModal } = useModal()

  const [uploading, setUploading] = useState(false)

  const { uploadFile, uploadProgress } = useUploadFile()

  const [updatePropertyMedia] = useUpdatePropertyMedia()
  // const {setSnackbar} = useSnackbarAlert()
  const { data: property, refetch: propertyRefetch } = usePropertyIdService({
    id: propertyId || '',
  })

  const [updatePropertyById] = useUpdatePropertyByIdService()
  const { setSnackbar } = useSnackbarAlert()
  // console.log('propertyId', property)
  const { name, description, property_type, game_id, collection_id } = property

  const defaultValues = {
    property_name: name,
    property_type: property_type,
    property_description: description,
  }

  const openEditPropertyModal = (id: any) => {
    // console.log(id)
    openModal({
      name: 'edit-property-modal',
      data: {
        propertyId: id,
        closeModal: () => closeModal('edit-property-modal'),
      },
    })
  }

  const handleSubmit = async (values: any) => {
    const updatedValues = {
      name: values.property_name,
      property_type: values.property_type,
      description: values.property_description,
    }

    await updatePropertyById(propertyId, {
      game_id,
      collection_id,
      ...updatedValues,
    })

    closeModal('edit-property-modal')
    // if (res.success) {
    await setSnackbar({
      message: t('property-successfully-updated'),
      variant: 'success',
    })

    //
    // if ( !res.success) {
    //   setSnackbar({
    // 	message:'something went wrong',
    // 	variant:'warning',
    //   })
    // }
  }

  const handleUpdateMedia = async (event: React.FormEvent<HTMLInputElement>, property: any) => {
    setUploading(true)

    const { files }: any = event.target

    const fileObj = {
      fileName: files[0].name,
      type: files[0].type,
      fileSize: files[0].size,
      locationField: 'collection',
      game_id: property.game_id,
      collection_id: property.collection_id,
    }

    const res = await uploadFile(fileObj, files[0])

    await updatePropertyById(property.id, {
      game_id: property.game_id,
      collection_id: property.collection_id,
      media: res,
    })

    setUploading(false)
  }

  const formik = useFormik({
    initialValues: defaultValues,
    enableReinitialize: true,
    onSubmit: async values => handleSubmit(values),
  })

  useEffect(() => {
    propertyRefetch()
  }, []) //eslint-disable-line

  return {
    formik,
    openEditPropertyModal,
    handleUpdateMedia,
    uploading,
  }
}
