import { useMutation } from '@apollo/client'
import MINT_GQL from '../../gql/mint/mint.gql'
import { MintInput, MintTransactionData } from './mint.types'

interface Data {
  mint: MintTransactionData
}

interface Variables {
  input: MintInput
}

export const useMintService = () => {
  const [mutation] = useMutation<Data, Variables>(MINT_GQL)

  const mintService = async (input: MintInput) => {
    const { data, errors } = await mutation({
      variables: { input },
    })

    const mint = data?.mint

    if (errors?.length || !mint) {
      throw new Error(errors ? errors[0].message : 'Something went wrong')
    }

    return mint
  }

  return [mintService]
}
