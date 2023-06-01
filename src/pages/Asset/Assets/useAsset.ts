import { useContext, useEffect, useState } from 'react'
import { ToastContext } from 'contexts'

import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'

import useSnackbarAlert from 'hooks/useSnackbar'
import { useModal } from 'hooks'
import useUploadFile from 'hooks/useUploadFile'
import { useTranslation } from 'react-i18next'
import { useCollectionByIdService } from 'services/useCollectionService'
import {
  useCreateAssetService,
  // useCreateAssetInCacheThenServerService,
  useDeleteAssetByIdService,
  useAssetsService,
  useBatchDeleteAssetService,
} from 'services/useAssetService'
import { usePropertiesService } from 'services/usePropertyService'
import card from '../../../assets/avatars/card.png'

// import { assetValidationSchema } from 'utils/validationsSchema'
import objectKeyFormatter from 'helpers/objectKeyFormatter'
import _ from 'lodash'
import {
  useAchievementsService,
  useAttributesService,
  useRewardsService,
} from 'services/useAssetResourcesService'

interface customProp {
  prop_name: string
  prop_type: 'Array' | 'String' | 'Object' | 'Number'
  prop_value: any
}

const initialValues = {
  asset_name: '',
  asset_description: '',
  asset_supply: null,
  asset_price: null,
  asset_properties: [],
  asset_attributes: [],
  asset_achievements: [],
  asset_rewards: [],
  parent_asset: '',
  asset_asset_url: '',
  custom_props: [],
  formats: null,
  medias: [],
}

export const useAsset = (data?: any) => {
  const collection_id = data?.collection_id
  console.log('🚀 ~ collection_id:', collection_id)

  const { t } = useTranslation()
  const [fileUploadType, setFileUploadType] = useState('')
  const params = useParams()
  const collectionId: string = params?.collectionId! || collection_id
  console.log('🚀 ~ collectionId:', collectionId)

  const { setToast } = useContext(ToastContext)

  const [deleteAssetById] = useDeleteAssetByIdService()
  const [batchDeleteAsset] = useBatchDeleteAssetService()

  const { data: collection, refetch: refetchCollection } = useCollectionByIdService({
    id: collectionId,
  })
  const { game_id } = collection
  const [createAssetService] = useCreateAssetService()
  const { openModal, closeModal } = useModal()
  const { uploadFile, uploadProgress, loading: generateLinkLoading } = useUploadFile()

  const [uploadLoader, setUploadLoader] = useState(false)

  const { data: assetsData, refetch: assetsRefetch } = useAssetsService({
    game_id,
    collection_id: collectionId,
    page: 1,
    limit: 100,
    search_text: '',
  })

  const { data: propertiesData } = usePropertiesService({
    game_id,
    collection_id: collectionId,
    page: 1,
    limit: 100,
    search_text: '',
  })

  const { data: attributesData } = useAttributesService({
    game_id,
    page: 1,
    limit: 100,
    search_text: '',
  })

  const { data: achievementsData } = useAchievementsService({
    game_id,
    page: 1,
    limit: 100,
    search_text: '',
  })

  const { data: rewardsData } = useRewardsService({
    game_id,
    page: 1,
    limit: 100,
    search_text: '',
  })

  const attributesOptions = attributesData?.items?.map((item: any) => ({
    value: item.id,
    label: item.name,
    min: item.min,
    media: item.media,
  }))

  const achievementsOptions = achievementsData?.items?.map((item: any) => ({
    value: item.id,
    label: item.name,
    media: item.media,
  }))

  const rewardsOptions = rewardsData?.items?.map((item: any) => ({
    value: item.id,
    label: item.name,
    media: item.media,
  }))

  const propertiesOptions = propertiesData?.items?.map((item: any) => ({
    value: item.id,
    label: item.name,
  }))

  const assetOption = assetsData?.items?.map((item: any) => ({
    value: item.id,
    label: item.name,
  }))

  const openCreateAssetModal = () => {
    openModal({
      name: 'create-asset-modal',
    })
  }

  const openCreateCustomPropertyModal = () => {
    openModal({
      name: 'create-custom-property-modal',
    })
  }

  const openEditAssetModal = (asset: any) => {
    openModal({
      name: 'edit-asset-modal',
      data: {
        asset: asset,
        closeModal: () => closeModal('edit-asset-modal'),
      },
    })
  }

  const tokenIds = [0]

  assetsData?.items?.map((item: any) => {
    tokenIds.push(item.token_id)
  })

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
    // console.log('values', values)

    // Check if the user already has an image set
    const hasImage = values.medias && values.medias.length > 0

    // If the user doesn't have an image set, set the default image
    if (!hasImage) {
      values.medias = [
        {
          is_main: true,
          url: card,
          format: '',
        },
      ]
    }

    const assetInput = {
      game_id,
      collection_id: collectionId,
      asset_url: values?.asset_asset_url,
      name: values.asset_name,
      description: values.asset_description,
      supply: _.toNumber(values.asset_supply) || null,
      price: _.toNumber(values.asset_price),
      properties: values.asset_properties,
      attributes: values.asset_attributes,
      achievements: values.asset_achievements,
      rewards: values.asset_rewards,
      parent_id: values.parent_asset,
      custom_props: customProps,
      order: assetsData?.items?.length,
      medias: values.medias,
      token_id: Math.max(...tokenIds) + 1,
    }

    const res = await createAssetService(assetInput, () => {})

    if (!res) {
      setToast({
        message: t('failed-to-create-new-asset'),
        type: 'negative',
        open: true,
      })

      closeModal('create-asset-modal')
      return
    }

    if (res) {
      setToast({
        message: t('new-asset-created'),
        type: 'positive',
        open: true,
      })

      refetchCollection()
      await assetsRefetch()
      closeModal('create-asset-modal')
      closeModal('create-custom-property-modal')
      openEditAssetModal(res.asset)
      return
    }
  }

  const addBlankRow = async () => {
    const assetInput = {
      game_id,
      collection_id: collectionId,
      asset_url: '',
      name: '',
      description: '',
      supply: null,
      price: null,
      properties: [],
      attributes: [],
      achievements: [],
      rewards: [],
      parent_id: null,
      custom_props: {},
      order: assetsData?.items?.length,
      token_id: Math.max(...tokenIds) + 1,
    }

    await createAssetService(assetInput, () => {})
    await assetsRefetch()
  }

  const handleDeleteCollection = async (asset: any) => {
    openModal({
      name: 'delete-confirmation-modal',
      data: {
        closeModal: () => closeModal('delete-confirmation-modal'),
        deleteItem: async () => {
          const res = await deleteAssetById(asset.id)
          if (res.success) {
            assetsRefetch()
            closeModal('delete-confirmation-modal')

            setToast({
              message: t('asset-successfully-deleted'),
              type: 'positive',
              open: true,
            })
          }
          if (!res.success) {
            closeModal('delete-confirmation-modal')

            setToast({
              message: t('asset-delete-failed'),
              type: 'negative',
              open: true,
            })
          }
        },
        label: t('are-you-sure-you-want-to-delete-this-asset?'),
        title: t('delete-asset'),
      },
    })
  }

  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: assetValidationSchema,
    onSubmit: async values => handleSubmit(values),
  })

  const handleChangeFile = async (e: React.SyntheticEvent<EventTarget>, fieldName: string) => {
    const { files }: any = e.target

    const fileObj = {
      fileName: files[0].name,
      type: files[0].type,
      fileSize: files[0].size,
      locationField: 'collection',
      game_id,
    }

    setFileUploadType(fieldName)

    const res = await uploadFile(fileObj, files[0])

    await formik.setFieldValue(fieldName, res)
  }

  const onDeleteImg = (fieldName: string) => {
    formik.setFieldValue(fieldName, '')
    setFileUploadType('')
  }

  const handleUploadImages = async (
    event: React.FormEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    setUploadLoader(true)
    const { files }: any = event.target
    const promises: any[] = []

    Object.keys(files).forEach(async function (key) {
      const fileObj = {
        fileName: files[key].name,
        type: files[key].type,
        fileSize: files[key].size,
        locationField: 'collection',
        game_id,
      }
      promises.push(uploadFile(fileObj, files[key]))
    })
    const result = await Promise.all(promises)

    const mappedResult = result.map((url: string) => {
      return { is_main: false, url: url, format: '' }
    })

    await formik.setFieldValue(fieldName, mappedResult)

    setUploadLoader(false)
  }

  useEffect(() => {
    assetsRefetch()
  }, []) //eslint-disable-line

  useEffect(() => {
    if (uploadProgress === 99.99) {
      setFileUploadType('')
    }
  }, [uploadProgress])

  const sliced = assetsData?.items?.slice()
  // const reversed = sliced?.sort()

  return {
    formik,
    openCreateAssetModal,
    openCreateCustomPropertyModal,
    data: sliced,
    handleDeleteCollection,
    fileUploadType,
    handleChangeFile,
    uploadProgress,
    generateLinkLoading,
    onDeleteImg,
    propertiesOptions,
    attributesOptions,
    achievementsOptions,
    rewardsOptions,
    assetOption,
    customProps: collection?.custom_asset_props,
    // propertiesData,
    addBlankRow,
    deleteAssetById,
    assetsRefetch,
    batchDeleteAsset,
    game_id,
    collectionId,
    handleUploadImages,
    loadingMediaUpload: uploadLoader,
    closeModal,
    collection,
  }
}
