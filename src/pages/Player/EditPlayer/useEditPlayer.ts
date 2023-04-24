import { useEffect, useState, useContext } from 'react'
import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { usePlayerByIdService, useUpdatePlayerByIdService } from 'services/usePlayerService'
import { useWalletByPlayerService, useCreatePlayerWalletService } from 'services/useWalletService'
import { useTransactions, useTransactionsByPlayer } from 'services/useTransactionService'
import { useParams, useNavigate } from 'react-router-dom'
import useSnackbarAlert from 'hooks/useSnackbar'
import useUploadFile from 'hooks/useUploadFile'

import { useTranslation } from 'react-i18next'
import { usePlayerAssetsService } from 'services/usePlayerAssetService'
import { useModal } from 'hooks'

const useEditPlayer = () => {
  const { t } = useTranslation()

  const { setToast } = useContext(ToastContext)

  const [fileUploadType, setFileUploadType] = useState('')

  const { closeModal } = useModal()

  const params = useParams()
  const playerId = params.playerId
  const { setSnackbar } = useSnackbarAlert()
  const { uploadFile, uploadProgress, loading: generateLinkLoading } = useUploadFile()

  const { data: playerById, refetch: playerRefetch } = usePlayerByIdService({ id: playerId })

  const { data: walletByPlayer, refetch: walletRefetch } = useWalletByPlayerService({
    // id: playerId,
    player_id: playerId,
  })

  const { data: transactionsByPlayer, refetch: refetchTransaction } = useTransactions({
    player_id: playerId,
    page: 1,
    limit: 100,
  })

  // console.log('transactionsByPlayer', transactionsByPlayer)
  // const { address: walletAddress, network, protocol } = walletByPlayer
  // console.log('transactionsByPlayer', transactionsByPlayer)
  const [createPlayerWalletService] = useCreatePlayerWalletService()

  const { unique_id, name, avatar, username, email, custom_props, game_id } = playerById

  const { data: playerAssets } = usePlayerAssetsService({
    page: 1,
    limit: 100,
    game_id: game_id,
    player_id: playerId,
  })

  // console.log('playerAssets', playerAssets)

  const [updatePlayerById] = useUpdatePlayerByIdService()

  const defaultValues = {
    unique_id,
    name,
    avatar,
    username,
    email,
    custom_props,
  }

  const handleSubmit = async (values: any) => {
    await updatePlayerById(playerId, {
      ...values,
    })

    closeModal('edit-player-modal')

    setToast({
      message: t('player successfully-updated'),
      type: 'positive',
      open: true,
    })

    // navigate(-1)
  }

  const addPLayerWallet = async () => {
    // console.log(playerId)
    const res = await createPlayerWalletService(playerId, () => {})
    if (!res) {
      setToast({
        message: t('failed-to-add-new-wallet'),
        type: 'negative',
        open: true,
      })
      return
    }

    if (res) {
      setToast({
        message: t('new-wallet-was-created'),
        type: 'positive',
        open: true,
      })
      walletRefetch()
      // refetchWallets()
      return
    }
  }

  const handleChangeFile = async (e: React.SyntheticEvent<EventTarget>, fieldName: string) => {
    const { files }: any = e.target

    const fileObj = {
      fileName: files[0].name,
      type: files[0].type,
      fileSize: files[0].size,
      locationField: 'player',
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

  useEffect(() => {
    if (uploadProgress === 99.99) {
      setFileUploadType('')
    }
  }, [uploadProgress])

  const formik = useFormik({
    initialValues: defaultValues,
    enableReinitialize: true,
    onSubmit: async values => handleSubmit(values),
    // validationSchema:gameValidationSchema,
  })

  useEffect(() => {
    playerRefetch()
    walletRefetch()
    refetchTransaction()
  }, []) //eslint-disable-line

  return {
    formik,
    onDeleteImg,
    handleChangeFile,
    generateLinkLoading,
    fileUploadType,
    walletByPlayer,
    addPLayerWallet,
    transactionsByPlayer,
    playerById,
    playerAssets,
    closeModal,
  }
}

export default useEditPlayer
