import { useMutation } from '@apollo/client'
import AWARD_GQL from '../../gql/mint/award.gql'
import { MintInput, MintTransactionData } from './mint.types'

interface Data {
  award: MintTransactionData
}

interface Variables {
  input: MintInput
}

export const useAwardService = () => {
  const [mutation] = useMutation<Data, Variables>(AWARD_GQL)

  const awardService = async (input: MintInput) => {
    const { data, errors } = await mutation({
      variables: { input },
    })

    const award = data?.award

    if (errors?.length || !award) {
      throw new Error(errors ? errors[0].message : 'Something went wrong')
    }

    return award
  }

  return [awardService]
}
