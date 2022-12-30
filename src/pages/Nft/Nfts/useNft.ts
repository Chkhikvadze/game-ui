import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'

import useSnackbarAlert from 'hooks/useSnackbar'
import { useModal } from 'hooks'
import useUploadFile from 'hooks/useUploadFile'

import { useCollectionByIdService } from 'services/useCollectionService'
import {
  useCreateNftService,
  // useCreateNftInCacheThenServerService,
  useDeleteNftByIdService,
  useNftsService,
} from 'services/useNftService'
import { usePropertiesService } from 'services/usePropertyService'

import { nftValidationSchema } from 'utils/validationsSchema'
import objectKeyFormatter from 'helpers/objectKeyFormatter'

interface customProp {
  prop_name: string
  prop_type: 'Array' | 'String' | 'Object' | 'Number'
  prop_value: any
}

const initialValues = {
  nft_name: '',
  nft_description: '',
  nft_supply: '',
  nft_price: '',
  nft_properties: '',
  parent_nft: '',
  nft_asset_url: '',
  custom_props: [],
  formats: null,
}

export const useNft = () => {
  const [fileUploadType, setFileUploadType] = useState('')
  const params = useParams()
  const collectionId: string = params?.collectionId!
  const [deleteNftById] = useDeleteNftByIdService()
  const { setSnackbar } = useSnackbarAlert()
  const { data: collection } = useCollectionByIdService({ id: collectionId })
  const { project_id } = collection
  const [createNftService] = useCreateNftService()
  const { openModal, closeModal } = useModal()
  const { uploadFile, uploadProgress, loading: generateLinkLoading } = useUploadFile()

  const { data: nftsData, refetch: nftsRefetch } = useNftsService({
    project_id,
    collection_id: collectionId,
    page: 1,
    limit: 100,
    search_text: '',
  })

  const { data: propertiesData } = usePropertiesService({
    project_id,
    collection_id: collectionId,
    page: 1,
    limit: 100,
    search_text: '',
  })

  const propertiesOptions = propertiesData?.items?.map((item: any) => ({
    value: item.id,
    label: item.name,
  }))
  const nftOption = nftsData?.items?.map((item: any) => ({
    value: item.id,
    label: item.name,
  }))

  const openCreateCollectionModal = () => {
    openModal({
      name: 'create-nft-modal',
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

    const nftInput = {
      project_id,
      collection_id: collectionId,
      asset_url: values?.nft_asset_url,
      name: values.nft_name,
      description: values.nft_description,
      supply: values.nft_supply,
      price: values.nft_price,
      properties: values.nft_properties,
      parent_id: values.parent_nft,
      custom_props: customProps,
      order: nftsData.items.length,
    }

    const res = await createNftService(nftInput, () => {})

    if (!res) {
      setSnackbar({ message: 'Failed to create new nft', variant: 'error' })
      closeModal('create-nft-modal')
      return
    }

    if (res) {
      setSnackbar({
        message: 'New nft created',
        variant: 'success',
      })
      closeModal('create-nft-modal')
      await nftsRefetch()
      return
    }
  }

  const addBlankRow = async () => {
    const nftInput = {
      project_id,
      collection_id: collectionId,
      asset_url: '',
      name: '',
      description: '',
      supply: null,
      price: null,
      properties: null,
      parent_id: null,
      order: nftsData.items.length,
    }

    await createNftService(nftInput, () => {})
    nftsRefetch()
  }

  const handleDeleteCollection = async (nft: any) => {
    openModal({
      name: 'delete-confirmation-modal',
      data: {
        closeModal: () => closeModal('delete-confirmation-modal'),
        deleteItem: async () => {
          const res = await deleteNftById(nft.id)
          if (res.success) {
            nftsRefetch()
            closeModal('delete-confirmation-modal')
            setSnackbar({
              message: 'nft successfully deleted',
              variant: 'success',
            })
          }
          if (!res.success) {
            closeModal('delete-confirmation-modal')
            setSnackbar({
              message: 'nft delete failed',
              variant: 'error',
            })
          }
        },
        label: 'Are you sure you want to delete this nft?',
        title: 'Delete nft',
      },
    })
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: nftValidationSchema,
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
    nftsRefetch()
  }, []) //eslint-disable-line

  useEffect(() => {
    if (uploadProgress === 99.99) {
      setFileUploadType('')
    }
  }, [uploadProgress])

  const sliced = nftsData?.items?.slice()
  const reversed = sliced?.reverse()

  return {
    formik,
    openCreateCollectionModal,
    data: reversed,
    handleDeleteCollection,
    fileUploadType,
    handleChangeFile,
    uploadProgress,
    generateLinkLoading,
    onDeleteImg,
    propertiesOptions,
    nftOption,
    customProps: collection?.custom_property_props,
    // propertiesData,
    addBlankRow,
    deleteNftById,
    nftsRefetch,
  }
}
