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
  const { data: property, refetch: propertyRefetch } = usePropertyIdService({ id: propertyId })

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
    const promises: any[] = []

    Object.keys(files).forEach(async function (key) {
      const fileObj = {
        fileName: files[key].name,
        type: files[key].type,
        fileSize: files[key].size,
        locationField: 'collection',
        game_id: property.game_id,
        collection_id: property.collection_id,
      }
      promises.push(uploadFile(fileObj, files[key]))
    })
    const result = await Promise.all(promises)

    const mappedResult = result.map((url: string) => {
      return { is_main: false, url: url, format: '' }
    })
    await updatePropertyMedia(property.id, mappedResult)

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
