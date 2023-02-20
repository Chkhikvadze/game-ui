import { useEffect } from 'react'
import { useFormik } from 'formik'

import { usePropertyIdService, useUpdatePropertyByIdService } from 'services/usePropertyService'

import { useModal } from 'hooks'
import useSnackbarAlert from 'hooks/useSnackbar'

import { useTranslation } from 'react-i18next'

export const useEditProperty = (propertyId?: any) => {
  const { t } = useTranslation()
  const { openModal, closeModal } = useModal()

  // const {setSnackbar} = useSnackbarAlert()
  const { data: property, refetch: propertyRefetch } = usePropertyIdService({ id: propertyId })

  const [updatePropertyById] = useUpdatePropertyByIdService()
  const { setSnackbar } = useSnackbarAlert()
  // console.log('propertyId', property)
  const { name, description, property_type, project_id, collection_id } = property

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
      project_id,
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
  }
}
