import { useEffect, useState, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { useModal } from 'hooks'
import { ToastContext } from 'contexts'

import { useFormik } from 'formik'
import cryptoRandomString from 'crypto-random-string'

import useUploadFile from 'hooks/useUploadFile'

import profile from '../../../assets/avatars/profile.png'

import {
  useCreatePlayerService,
  useDeletePlayerByIdService,
  usePlayersService,
} from 'services/usePlayerService'
// import useSnackbarAlert from 'hooks/useSnackbar'

// import objectKeyFormatter from 'helpers/objectKeyFormatter'

const initialValues = {
  unique_id: '',
  avatar: '',
  name: '',
  game_id: '',
  is_create_wallet: true,
  custom_props: '',
}

// interface customProp {
//   prop_name: string
//   prop_type: 'Array' | 'String' | 'Object' | 'Number'
//   prop_value: any
// }

const usePlayers = (players_data?: any) => {
  const { t } = useTranslation()

  const [fileUploadType, setFileUploadType] = useState('')
  const [awaitCreatePlayer, setAwaitCreatePlayer] = useState(false)

  const { openModal, closeModal } = useModal()

  const { setToast } = useContext(ToastContext)

  const [createPlayerService] = useCreatePlayerService()
  const { data, refetch: refetchPlayers } = usePlayersService({
    page: 1,
    limit: 100,
    search_text: '',
    game_id: players_data?.game_id,
  })
  const [deletePlayerById] = useDeletePlayerByIdService()

  const { uploadFile, uploadProgress, loading: generateLinkLoading } = useUploadFile()

  const openCreatePlayerModal = () => {
    openModal({
      name: 'create-player-modal',
    })
  }

  const handleSubmit = async (values: any) => {
    // const customProps: { [key: string]: customProp } = {}
    // values.custom_props?.forEach((prop: customProp) => {
    //   const obj = {
    //     prop_name: prop.prop_name,
    //     prop_type: prop.prop_type,
    //     prop_value: prop.prop_value,
    //   }
    //   customProps[objectKeyFormatter(prop.prop_name)] = obj
    // })

    // Check if avatar is empty
    const shouldSetDefaultAvatar = !values.avatar

    // If avatar is empty, set it to the default image
    if (shouldSetDefaultAvatar) {
      values.avatar = profile
    }

    setAwaitCreatePlayer(true)

    const playerInput = {
      avatar: values.avatar,
      unique_id: values.unique_id,
      name: values.name,
      username: values.username,
      email: values.email,
      game_id: players_data?.game_id,
      is_create_wallet: values.is_create_wallet,
      custom_props: values.custom_props,
    }

    const res = await createPlayerService(playerInput, () => {})

    if (!res) {
      setToast({
        message: t('failed-to-add-player'),
        type: 'negative',
        open: true,
      })

      closeModal('create-player-modal')
      return
    }

    if (res) {
      setToast({
        message: t('new-player-was-created'),
        type: 'positive',
        open: true,
      })
      closeModal('create-player-modal')
      refetchPlayers()
      return
    }
    setAwaitCreatePlayer(false)
  }

  const handleDeletePlayer = async (game: any) => {
    openModal({
      name: 'delete-confirmation-modal',
      data: {
        closeModal: () => closeModal('delete-confirmation-modal'),
        deleteItem: async () => {
          const res = await deletePlayerById(game.id)
          if (res.success) {
            await refetchPlayers()

            setToast({
              message: t('player-successfully-deleted'),
              type: 'positive',
              open: true,
            })
            closeModal('delete-confirmation-modal')
          }
          if (!res.success) {
            setToast({
              message: t('player-delete-failed'),
              type: 'negative',
              open: true,
            })
          }
        },
        label: t('are-you-sure-you-want-to-delete-this-player?'),
        title: t('delete-player'),
      },
    })
  }

  const handleChangeFile = async (e: React.SyntheticEvent<EventTarget>, fieldName: string) => {
    const { files }: any = e.target

    const fileObj = {
      fileName: files[0].name,
      type: files[0].type,
      fileSize: files[0].size,
      locationField: 'collection',
      game_id: players_data?.game_id,
    }

    setFileUploadType(fieldName)

    const res = await uploadFile(fileObj, files[0])

    await formik.setFieldValue(fieldName, res)
  }

  const onDeleteImg = (fieldName: string) => {
    formik.setFieldValue(fieldName, '')
    setFileUploadType('')
  }

  const generateRandomCryptoString = () => {
    const randomString = cryptoRandomString({ length: 11 })
    formik.setFieldValue('unique_id', randomString)
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async values => handleSubmit(values),
    // validationSchema:gameValidationSchema
  })

  useEffect(() => {
    generateRandomCryptoString()
  }, []) // eselint-disable-line

  return {
    data,
    formik,
    openCreatePlayerModal,
    handleChangeFile,
    onDeleteImg,
    fileUploadType,
    uploadProgress,
    generateLinkLoading,
    handleDeletePlayer,
    generateRandomCryptoString,
    awaitCreatePlayer,
    closeModal,
  }
}

export default usePlayers
