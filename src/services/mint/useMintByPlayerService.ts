import { useMutation } from '@apollo/client'
import MINT_BY_PLAYER_GQL from '../../gql/mint/mintByPlayer.gql'
import { MintInput, MintTransactionData } from './mint.types'

interface Data {
  mintByPlayer: MintTransactionData
}

interface Variables {
  input: MintInput
}

export const useMintByPlayerService = () => {
  const [mutation] = useMutation<Data, Variables>(MINT_BY_PLAYER_GQL)

  const mintByPlayer = async (input: MintInput) => {
    const { data, errors } = await mutation({
      variables: { input },
    })

    const mintByPlayer = data?.mintByPlayer

    if (errors?.length || !mintByPlayer) {
      throw new Error(errors ? errors[0].message : 'Something went wrong')
    }

    return mintByPlayer
  }

  return [mintByPlayer]
}
