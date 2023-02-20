import { useEffect, useState } from 'react'
import { useFormik } from 'formik'

import useUploadFile from 'hooks/useUploadFile'
import useSnackbarAlert from 'hooks/useSnackbar'

import { usePropertiesService } from 'services/usePropertyService'
import {
  useAssetByIdService,
  useAssetsService,
  useUpdateAssetByIdGql,
  useBatchUpdateAssetsService,
} from 'services/useAssetService'

import { assetValidationSchema } from 'utils/validationsSchema'
import { useModal } from 'hooks'

import { useTranslation } from 'react-i18next'

export const useEditAsset = (assetId?: any) => {
  const { t } = useTranslation()
  const [fileUploadType, setFileUploadType] = useState('')
  const { openModal, closeModal } = useModal()

  // const {setSnackbar} = useSnackbarAlert()
  const { data: assetData, refetch: assetRefetch } = useAssetByIdService({ id: assetId })
  const [updateAssetById] = useUpdateAssetByIdGql()
  const [batchUpdateAssets] = useBatchUpdateAssetsService()
  const { setSnackbar } = useSnackbarAlert()
  const { uploadFile, uploadProgress } = useUploadFile()
  const {
    project_id,
    collection_id,
    name,
    description,
    supply,
    properties,
    parent_id,
    asset_url,
    price,
  } = assetData

  const { data: assetsData, loading: assetLoader } = useAssetsService({
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

  const assetOption = assetLoader
    ? []
    : assetsData?.items?.map((item: any) => ({ value: item.id, label: item.name }))

  const defaultValues = {
    asset_name: name,
    asset_asset_url: asset_url,
    asset_description: description,
    asset_supply: supply,
    asset_price: price,
    asset_properties: properties,
    parent_asset: parent_id,
  }

  const openEditAssetModal = (id: any) => {
    openModal({
      name: 'edit-asset-modal',
      data: {
        assetId: id,
        closeModal: () => closeModal('edit-asset-modal'),
      },
    })
  }

  const handleSubmit = async (values: any) => {
    const updatedValues = {
      name: values.asset_name,
      description: values.asset_description,
      supply: values.asset_supply,
      properties: values.asset_properties,
      parent_id: values.parent_asset,
      asset_url: values.asset_asset_url,
      price: values.asset_price,
    }

    await updateAssetById(assetId, {
      project_id,
      collection_id,
      ...updatedValues,
    })
    closeModal('edit-asset-modal')
    // if (res.success) {
    await setSnackbar({
      message: t('asset-successfully-updated'),
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
    validationSchema: assetValidationSchema,
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
  }

  const onDeleteImg = (fieldName: string) => {
    formik.setFieldValue(fieldName, '')
    setFileUploadType('')
  }

  useEffect(() => {
    assetRefetch()
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
    assetOption,
    onDeleteImg,
    handleChangeFile,
    openEditAssetModal,
    batchUpdateAssets,
  }
}
