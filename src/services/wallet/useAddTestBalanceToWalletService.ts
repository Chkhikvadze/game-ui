import { useMutation } from '@apollo/client'
import ADD_TEST_BALANCE_TO_WALLET_GQL from '../../gql/wallet/addTestBalanceToWallet.gql'

interface Data {
  addTestBalanceToWallet: { transaction_hash: string }
}

interface Variables {
  id: string
  chainId: number
}

export const useAddTestBalanceToWalletService = () => {
  const [mutation, { loading }] = useMutation<Data, Variables>(ADD_TEST_BALANCE_TO_WALLET_GQL)

  const addTestBalanceToWalletService = async (variables: Variables) => {
    const { data, errors } = await mutation({
      variables,
    })

    const addTestBalanceToWallet = data?.addTestBalanceToWallet

    if (errors?.length || !addTestBalanceToWallet) {
      throw new Error(errors ? errors[0].message : 'Something went wrong')
    }

    return addTestBalanceToWallet
  }

  return {
    addTestBalanceToWalletService,
    loading,
  }
}
