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
  useUpdateAssetMedia,
  useUpdateMediaCacheThenServer,
} from 'services/useAssetService'

import { assetValidationSchema } from 'utils/validationsSchema'
import { useModal } from 'hooks'

import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

export const useEditAsset = (assetId?: any) => {
  const { t } = useTranslation()
  const [fileUploadType, setFileUploadType] = useState('')
  const [uploading, setUploading] = useState(false)

  const { openModal, closeModal } = useModal()

  const { data: assetData, refetch: assetRefetch } = useAssetByIdService({ id: assetId || '' })
  const [updateAssetById] = useUpdateAssetByIdGql()
  const [batchUpdateAssets] = useBatchUpdateAssetsService()
  const { setSnackbar } = useSnackbarAlert()
  const { uploadFile, uploadProgress } = useUploadFile()
  const {
    game_id,
    collection_id,
    name,
    description,
    supply,
    properties,
    parent_id,
    asset_url,
    price,
  } = assetData

  const [updateAssetMedia] = useUpdateAssetMedia()

  const updateMediaService = useUpdateMediaCacheThenServer()

  const { data: assetsData, loading: assetLoader } = useAssetsService({
    game_id: game_id || '',
    collection_id: collection_id || '',
    page: 1,
    limit: 100,
    search_text: '',
  })

  const { data: propertiesData, loading: propertyLoading } = usePropertiesService({
    game_id: game_id || '',
    collection_id: collection_id || '',
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
      game_id,
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

  const handleUpdateMedia = async (event: React.FormEvent<HTMLInputElement>, asset: any) => {
    setUploading(true)

    const { files }: any = event.target
    const promises: any[] = []

    Object.keys(files).forEach(async function (key) {
      const fileObj = {
        fileName: files[key].name,
        type: files[key].type,
        fileSize: files[key].size,
        locationField: 'collection',
        game_id: asset.game_id,
        collection_id: asset.collection_id,
      }
      promises.push(uploadFile(fileObj, files[key]))
    })
    const result = await Promise.all(promises)

    const mappedResult = result.map((url: string) => {
      return { is_main: false, url: url, format: '' }
    })
    // await updateAssetMedia(asset.id, mappedResult)
    // assetRefetch({ id: asset.id })

    await updateMediaService({ newValue: mappedResult, asset: asset })

    setUploading(false)
  }

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
    handleUpdateMedia,
    uploading,
    closeModal,
  }
}
