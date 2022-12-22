import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { loader } from 'graphql.macro'

import useSnackbarAlert from 'hooks/useSnackbar'
import { useModal } from 'hooks'

import objectKeyFormatter from 'helpers/objectKeyFormatter'

import { useCollectionByIdService } from 'services/useCollectionService'
import {
  useCreatePropertyService,
  useDeletePropertyByIdService,
  usePropertiesService,
  useCreatePropertyInCacheThenServerService,
} from 'services/usePropertyService'

const propertiesGql = loader('../../../gql/property/properties.gql')

interface customProp {
  prop_name: string
  prop_type: 'Array' | 'String' | 'Object' | 'Number'
  prop_value: any
}

const initialValues = {
  property_name: '',
  property_type: '',
  property_description: '',
  custom_props: [],
}

export const useProperties = () => {
  const params = useParams()
  const collectionId: string = params?.collectionId!

  const [deletePropertById] = useDeletePropertyByIdService()
  const { setSnackbar } = useSnackbarAlert()
  const { data: collection, refetch: refetchCollection } = useCollectionByIdService({
    id: collectionId,
  })
  const { project_id } = collection

  // const [createPropertyService] = useCreatePropertyService();
  const filter = {
    project_id,
    collection_id: collectionId,
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

  const { data, refetch: nftsRefetch } = usePropertiesService(filter)

  const openCreateCollectionModal = () => {
    openModal({
      name: 'create-property-modal',
    })
  }

  const handleSubmit = async (values: any) => {
    const customProps: { [key: string]: customProp } = {}
    values.custom_props.forEach((prop: customProp) => {
      const obj = {
        prop_name: prop.prop_name,
        prop_type: prop.prop_type,
        prop_value: prop.prop_value,
      }
      customProps[objectKeyFormatter(prop.prop_name)] = obj
    })

    const propertyInput = {
      collection_id: collectionId,
      project_id,
      name: values.property_name,
      description: values.property_description,
      property_type: values.property_type,
      custom_props: customProps,
      value: null,
      asset_url: null,
      display_value: null,
    }

    const res = await createPropertyService(propertyInput)

    // nftsRefetch();

    //todo Sandro you have to refetch collection it when Item added on server
    refetchCollection()
    closeModal('create-property-modal')

    if (!res) {
      setSnackbar({
        message: 'Failed to create new propery',
        variant: 'error',
      })
      closeModal('create-property-modal')
      return
    }

    if (res) {
      setSnackbar({
        message: 'New property created',
        variant: 'success',
      })
      await nftsRefetch()
      return
    }
  }

  const addBlankRow = () => {
    const propertyInput = {
      collection_id: collectionId,
      project_id,
      name: '',
      description: '',
      property_type: 'String',
      custom_props: {},
      value: null,
      display_value: null,
      asset_url: null,
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
              nftsRefetch()
              closeModal('delete-confirmation-modal')
              setSnackbar({
                message: 'Property successfully deleted',
                variant: 'success',
              })
            })
            .catch(() => {
              closeModal('delete-confirmation-modal')
              setSnackbar({
                message: 'Property delete failed',
                variant: 'error',
              })
            })
        },
        label: 'Are you sure you want to delete this property?',
        title: 'Delete property',
      },
    })
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => handleSubmit(values),
  })

  useEffect(() => {
    nftsRefetch()
  }, []) //eslint-disable-line

  const sliced = data?.items?.slice()
  const reversed = sliced?.reverse()

  console.log('COL', collection)

  return {
    formik,
    openCreateCollectionModal,
    data: reversed,
    project_id,
    collectionId,
    handleDeleteCollection,
    customProps: collection.custom_property_props,
    createPropertyService,
    addBlankRow,
  }
}
