import { ToastContext } from 'contexts'
import useFormAutoSave from 'hooks/useFormAutoSave'
import { useCallback, useContext, useMemo, useRef } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { useParams, useSearchParams } from 'react-router-dom'
import {
  Contract,
  useCreateContractService,
  useUpdateContractService,
} from 'services/useContractService'

interface ContractFormValues {
  name: string
  chain_id: number
  collection_id?: string
  config: {
    collection_size: number
    player_mint_fee: number
    max_mint_per_transaction: number
    max_mint_per_player: number

    is_mint_by_admin: boolean
    is_buy_by_player: boolean
    is_royalties: boolean
    // is_opensea?: boolean
    // is_sale_status?: boolean
    is_airdrop?: boolean
    is_award?: boolean
    is_contract_uri?: boolean
    is_url_based_on_collection?: boolean
    is_url_based_on_token_id?: boolean
    is_withdraw?: boolean
  }
  constructor_args: any[]
}

export type ContractFormHook = UseFormReturn<ContractFormValues>

const DEFAULT_CONSTRUCTOR_ARGS = [[], [], 500, '', '']

const DEFAULT_CONFIG = {
  collection_size: 0,
  player_mint_fee: 0,
  max_mint_per_transaction: 0,
  max_mint_per_player: 0,

  // is_sale_status: true,
  is_airdrop: true,
  is_award: true,
  is_buy: true,
  is_mint_by_admin: true,
  is_buy_by_player: true,
  is_contract_uri: true,
  is_royalties: true,
  is_url_based_on_collection: true,
  is_url_based_on_token_id: true,
  is_withdraw: true,
}

function getDefaultValues(contract?: Contract): ContractFormValues {
  const {
    name = '',
    chain_id = 80001,
    config = DEFAULT_CONFIG,
    constructor_args = DEFAULT_CONSTRUCTOR_ARGS,
    collection_id,
  } = contract || {}

  return {
    name,
    chain_id,
    config,
    constructor_args,
    collection_id: collection_id || undefined,
  }
}

type UseContractFormProps = {
  contract?: Contract
}

const useContractForm = ({ contract }: UseContractFormProps) => {
  const [, setSearchParams] = useSearchParams()
  const { gameId } = useParams()
  const { toast, setToast } = useContext(ToastContext)
  const creating = useRef(false)

  const defaultValues = useMemo(() => getDefaultValues(contract), [contract])

  const form = useForm<ContractFormValues>({
    defaultValues,
  })

  const [createContractService] = useCreateContractService()
  const [updateContractService] = useUpdateContractService()

  const contractId = contract?.id

  const handleCreateOrUpdateContract = useCallback(async () => {
    const values = form.getValues()
    const { name } = values

    if (!name) return

    const input = {
      ...values,
      template: 'CryptoOfArms',
      contract_type: 'ERC1155',
    }

    if (contractId) {
      await updateContractService(contractId, input)

      setToast({
        type: 'positive',
        message: `${name} contract was successfully updated`,
        open: true,
      })
    } else {
      if (creating.current) return
      creating.current = true
      const { contract } = await createContractService({ ...input, game_id: gameId })
      creating.current = false

      setToast({
        type: 'positive',
        message: `${name} contract was successfully created`,
        open: true,
      })

      setSearchParams({ contractId: contract.id })
    }
  }, [form, contractId, gameId, setToast, setSearchParams])

  useFormAutoSave({
    form,
    onSave: handleCreateOrUpdateContract,
  })

  return {
    formHook: form,
    toast,
    setToast,
  }
}

export default useContractForm
