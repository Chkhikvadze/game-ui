import { useMutation, useQuery } from '@apollo/client'
import { loader } from 'graphql.macro'

import walletByPlayerGql from '../gql/wallet/walletByPlayer.gql'

import createPlayerWalletGql from '../gql/wallet/createPlayerWallet.gql'

const createWalletGql = loader('../gql/wallet/createWallet.gql')
const walletsGql = loader('../gql/wallet/wallets.gql')
const deleteWalletByIdGql = loader('../gql/wallet/deleteWallet.gql')

type createWalletType = {
  wallet_type: String
  // source: String
  label: String
  address: String
  // protocol: String
  // network: String
}

type walletsService = {
  page: number
  limit: number
  search_text: string
}

export const useCreateWalletService = () => {
  const [mutation] = useMutation(createWalletGql)
  const createWalletService = async (input: createWalletType, callback: any) => {
    const {
      data: { createWallet },
    } = await mutation({
      variables: { input },
    })
    if (callback) {
      callback()
    }

    return createWallet
  }

  return [createWalletService]
}

export const useCreatePLayerWalletService = () => {
  const [mutation] = useMutation(createPlayerWalletGql)
  const createPlayerWalletService = async (player_id: any, callback: any) => {
    const {
      data: { createPLayerWallet },
    } = await mutation({
      variables: { player_id },
    })
    if (callback) {
      callback()
    }

    return createPLayerWallet
  }

  return [createPlayerWalletService]
}

export const useWalletsService = ({ page, limit, search_text }: walletsService) => {
  const {
    data: { walletsByCurrentUser } = [],
    error,
    loading,
    refetch,
  } = useQuery(walletsGql, {
    variables: {
      filter: {
        search_text,
        page,
        limit,
        sort: 'label',
        order: 'ASC',
      },
    },
  })

  return {
    data: walletsByCurrentUser || [],
    error,
    loading,
    refetch,
  }
}

export const useWalletByPlayerService = ({ player_id }: { player_id: any }) => {
  const {
    data: { walletByPlayer } = [],
    error,
    loading,
    refetch,
  } = useQuery(walletByPlayerGql, {
    variables: { player_id },
  })

  return {
    data: walletByPlayer || {},
    error,
    loading,
    refetch,
  }
}

export const useDeleteWalletByIdService = () => {
  const [mutation, { loading }] = useMutation(deleteWalletByIdGql)

  const deleteWalletById = async (id: string): Promise<{ message: string; success: boolean }> => {
    const {
      data: { deleteWallet },
    } = await mutation({ variables: { id } })
    return deleteWallet
  }
  return { deleteWalletById, loading }
}
