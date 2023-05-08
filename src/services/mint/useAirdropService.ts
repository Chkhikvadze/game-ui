import { useMutation } from '@apollo/client'
import AIRDROP_GQL from '../../gql/mint/airdrop.gql'
import { MintInput, MintTransactionData } from './mint.types'

interface Data {
  airdrop: MintTransactionData
}

interface Variables {
  input: MintInput
}

export const useAirdropService = () => {
  const [mutation] = useMutation<Data, Variables>(AIRDROP_GQL)

  const airdropService = async (input: MintInput) => {
    const { data, errors } = await mutation({
      variables: { input },
    })

    const airdrop = data?.airdrop

    if (errors?.length || !airdrop) {
      throw new Error(errors ? errors[0].message : 'Something went wrong')
    }

    return airdrop
  }

  return [airdropService]
}
