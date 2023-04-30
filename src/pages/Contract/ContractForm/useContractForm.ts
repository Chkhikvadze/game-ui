import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
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

export interface ContractFormConfig {
  collection_size?: number
  max_mint_per_transaction?: number
  max_mint_per_player?: number
  player_mint_fee: number

  is_opensea?: boolean
  is_sale_status?: boolean
  is_airdrop?: boolean
  is_award?: boolean
  is_mint_by_admin: boolean
  is_buy_by_player: boolean
  is_royalties: boolean
  is_withdraw?: boolean
  is_price_per_nft?: boolean
  is_burnable?: boolean
  is_player_metadata?: boolean
}

interface ContractFormValues {
  name: string
  chain_id: number
  collection_id?: string
  config: ContractFormConfig
  constructor_config: ContractConstructorConfig
}

export type ContractFormHook = UseFormReturn<ContractFormValues>

export interface ContractConstructorConfig {
  owner_address: string
  role_addresses: string[]
  royalty_addresses: string[]
  royalty_percentages: number[]
  royalty_fee: number
  initial_contract_uri: string
}

const DEFAULT_CONSTRUCTOR_CONFIG: ContractConstructorConfig = {
  owner_address: '',
  role_addresses: [],
  royalty_addresses: [],
  royalty_percentages: [],
  royalty_fee: 500,
  initial_contract_uri: '',
}

const DEFAULT_CONFIG: ContractFormConfig = {
  // collection_size: 1,
  player_mint_fee: 1,
  // max_mint_per_transaction: 0,
  // max_mint_per_player: 0,

  // is_opensea: true,
  // is_sale_status: true,
  is_airdrop: true,
  is_award: true,
  is_mint_by_admin: true,
  is_buy_by_player: true,
  is_royalties: true,
  is_withdraw: true,
  is_price_per_nft: true,
  is_burnable: true,
  is_player_metadata: true,
}

function getDefaultValues(contract?: Contract): ContractFormValues {
  const {
    name = '',
    chain_id = 80001,
    config = DEFAULT_CONFIG,
    constructor_config = DEFAULT_CONSTRUCTOR_CONFIG,
    collection_id,
  } = contract || {}

  return {
    name,
    chain_id,
    config,
    constructor_config,
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

  const configValidation = yup.object().shape({
    config: yup.object().shape({
      collection_size: yup.number().integer().min(1, 'more than 0'),
      max_mint_per_player: yup.number().integer().min(1, 'more than 0'),
      max_mint_per_transaction: yup.number().integer().min(1, 'more than 0'),
      player_mint_fee: yup.number().moreThan(0, 'Must be more than 0'),
    }),
    // constructor_args: yup.array(),
  })

  const form = useForm<ContractFormValues>({
    defaultValues,
    resolver: yupResolver(configValidation),
    mode: 'onChange',
    shouldUnregister: false,
    reValidateMode: 'onChange',
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
      if (!form.formState.errors.config) {
        await updateContractService(contractId, input)
        setToast({
          type: 'positive',
          message: `${name} contract was successfully updated`,
          open: true,
        })
      }
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
