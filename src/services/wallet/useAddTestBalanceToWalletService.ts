import { useMutation } from '@apollo/client'
import ADD_TEST_BALANCE_TO_WALLET_GQL from '../../gql/wallet/addTestBalanceToWallet.gql'

interface Data {
  addTestBalanceToWallet: { id: string }
}

interface Variables {
  id: string
}

export const useAddTestBalanceToWalletService = () => {
  const [mutation] = useMutation<Data, Variables>(ADD_TEST_BALANCE_TO_WALLET_GQL)

  const addTestBalanceToWalletService = async (id: string) => {
    const { data, errors } = await mutation({
      variables: { id },
    })

    const addTestBalanceToWallet = data?.addTestBalanceToWallet

    if (errors?.length || !addTestBalanceToWallet) {
      throw new Error(errors ? errors[0].message : 'Something went wrong')
    }

    return addTestBalanceToWallet
  }

  return [addTestBalanceToWalletService]
}
