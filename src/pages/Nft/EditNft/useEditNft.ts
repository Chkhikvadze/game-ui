import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'

import useUploadFile from 'hooks/useUploadFile'
import { usePropertiesService } from 'services/usePropertyService'

import { useNftByIdService, useNftsService, useUpdateNftByIdGql } from 'services/useNftService'
import useSnackbarAlert from 'hooks/useSnackbar'


export const useEditNft = () => {
  const [fileUploadType, setFileUploadType] = useState('')

  const params = useParams()
  const nftId = params.nftId
  // const {setSnackbar} = useSnackbarAlert()
  const { data: nftData, refetch: nftRefetch } = useNftByIdService({ id: nftId })
  const [updateNftById] = useUpdateNftByIdGql()
  const { setSnackbar } = useSnackbarAlert()
  const { uploadFile, uploadProgress } = useUploadFile()
  const { project_id, collection_id, name, description, supply, properties, parent_id, asset_url } =
    nftData

  const { data: nftsData, loading: nftLoader } = useNftsService({
    project_id,
    collection_id,
    page: 1,
    limit: 100,
    search_text: '',
  })
  const { data: propertiesData, loading: propertyLoading } = usePropertiesService({
    project_id,
    collection_id,
    page: 1,
    limit: 100,
    search_text: '',
  })

  const propertiesOptions = propertyLoading
    ? []
    : propertiesData?.items?.map((item: any) => ({ value: item.id, label: item.name }))

  const nftOption = nftLoader
    ? []
    : nftsData?.items?.map((item: any) => ({ value: item.id, label: item.name }))

  const defaultValues = {
    nft_name: name,
    nft_asset_url: asset_url,
    nft_description: description,
    nft_supply: supply,
    nft_properties: properties,
    parent_nft: parent_id,
  }

  const handleSubmit = async (values: any) => {
    const updatedValues = {
      name: values.nft_name,
      description: values.nft_description,
      supply: values.nft_supply,
      properties: values.nft_properties,
      parent_id: values.parent_nft,
      asset_url: values.nft_asset_url,
    }

    await updateNftById(nftId, {
      project_id,
      collection_id,
      ...updatedValues,
    })

    // if (res.success) {
    await setSnackbar({
      message: 'Nft successfully updated',
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
    nftRefetch()
  }, []) //eslint-disable-line

  useEffect(() => {
    if (uploadProgress === 99.99) {
      setFileUploadType('')
    }
  }, [uploadProgress])

  return {
    formik,
    fileUploadType,
    propertiesOptions,
    nftOption,
    onDeleteImg,
    handleChangeFile,
  }
}
