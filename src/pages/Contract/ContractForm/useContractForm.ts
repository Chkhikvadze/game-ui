import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ToastContext } from 'contexts'
import useFormAutoSave from 'hooks/useFormAutoSave'
import { useCallback, useContext, useMemo, useRef } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import {
  IContract,
  IContractConfig,
  IContractConstructorConfig,
  useCreateContractService,
  useUpdateContractService,
} from 'services'

export type ContractFormHook = UseFormReturn<ContractFormValues>

interface ContractFormValues {
  name: string
  chain_id: number
  collection_id?: string
  config: IContractConfig
  constructor_config: IContractConstructorConfig
}

const DEFAULT_CONSTRUCTOR_CONFIG: IContractConstructorConfig = {
  owner_address: '',
  role_addresses: [],
  royalty_addresses: [],
  royalty_percentages: [],
  royalty_fee: 500,
  initial_contract_uri: '',
  is_royalty_split: false,
}

const DEFAULT_CONFIG: IContractConfig = {
  // collection_size: 1,
  player_mint_fee: 1,
  // max_mint_per_transaction: 0,
  // max_mint_per_player: 0,

  is_opensea: true,
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

function getDefaultValues(contract?: IContract): ContractFormValues {
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
  contract?: IContract
  contract_data?: any
}

const useContractForm = ({ contract, contract_data }: UseContractFormProps) => {
  const { gameId } = contract_data
  const [, setSearchParams] = useSearchParams()
  const { toast, setToast } = useContext(ToastContext)
  const creating = useRef(false)

  const defaultValues = useMemo(() => getDefaultValues(contract), [contract])
  const configValidation = yup.object().shape({
    config: yup.object().shape({
      collection_size: yup.number().integer().min(1, 'more than 0'),
      // max_mint_per_player: yup.number().integer().min(1, 'more than 0'),
      // max_mint_per_transaction: yup.number().integer().min(1, 'more than 0'),
      player_mint_fee: yup.number().moreThan(0, 'Must be more than 0'),
    }),
    constructor_config: yup.object().shape({
      owner_address: yup
        .string()
        .trim()
        .required('Owner address is required')
        .matches(/^0x[a-fA-F0-9]{40}$/, 'Invalid owner address'),
      royalty_addresses: yup.array().of(
        yup
          .string()
          .trim()
          .matches(/^0x[a-fA-F0-9]{40}$/, 'Invalid address'),
      ),
    }),
  })

  const form = useForm<ContractFormValues>({
    defaultValues,
    resolver: yupResolver(configValidation),
    mode: 'onChange',
    shouldUnregister: false,
    reValidateMode: 'onChange',
  })

  const { createContractService } = useCreateContractService()
  const [updateContractService] = useUpdateContractService()

  const contractId = contract?.id

  const handleCreateOrUpdateContract = useCallback(async () => {
    const values = form.getValues()
    const { name } = values
    if (!name || !gameId) return

    if (contractId) {
      handleUpdateContract()
    } else {
      handleCreateContract()
    }
  }, [form, contractId, gameId, setToast, setSearchParams])

  const handleCreateContract = async () => {
    if (creating.current || !gameId) return
    creating.current = true

    const values = form.getValues()

    try {
      const contract = await createContractService({
        ...values,
        game_id: gameId,
        contract_type: 'ERC1155',
      })

      setToast({
        type: 'positive',
        message: `${values.name} contract was successfully created`,
        open: true,
      })

      setSearchParams({ contractId: contract.id })
    } catch (error) {
      if (error instanceof Error) {
        setToast({
          type: 'negative',
          message: error.message,
          open: true,
        })
      }
    }

    creating.current = false
  }

  const handleUpdateContract = async () => {
    if (form.formState.errors.config || form.formState.errors.constructor_config || !contractId)
      return

    const values = form.getValues()

    try {
      await updateContractService(contractId, values)

      setToast({
        type: 'positive',
        message: `${values.name} contract was successfully updated`,
        open: true,
      })
    } catch (error) {
      setToast({
        type: 'negative',
        message: `Could not update contract`,
        open: true,
      })
    }
  }

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
