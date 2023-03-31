import { useApolloClient } from '@apollo/client'
import { ToastContext } from 'contexts'
import useFormAutoSave from 'hooks/useFormAutoSave'
import { useCallback, useContext, useMemo } from 'react'
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
  collection_id?: string | null
  config: {
    collection_size: number
    player_mint_fee: number
    max_mint_per_transaction: number
    max_mint_per_player: number
  }
  constructor_args: any[]
}

export type ContractFormHook = UseFormReturn<ContractFormValues>

const DEFAULT_CONSTRUCTOR_ARGS = [[], [], 500, '', '']

// If contract already exists we need to fill form data with existing values
const getInitialValues = (contract: Contract) => {
  const { name, chain_id, config = {}, constructor_args, collection_id } = contract
  return {
    name,
    chain_id,
    config: {
      collection_size: Number(config.collection_size),
      player_mint_fee: Number(config.player_mint_fee),
      max_mint_per_transaction: Number(config.max_mint_per_transaction),
      max_mint_per_player: Number(config.max_mint_per_player),
    },
    constructor_args: constructor_args || DEFAULT_CONSTRUCTOR_ARGS,
    collection_id,
  }
}

const INITIAL_VALUES = {
  name: '',
  chain_id: 80001,
  config: {
    collection_size: 0,
    player_mint_fee: 0,
    max_mint_per_transaction: 0,
    max_mint_per_player: 0,
  },
  constructor_args: DEFAULT_CONSTRUCTOR_ARGS,
  collection_id: null,
}

type UseContractFormProps = {
  contract?: Contract
}

const useContractForm = ({ contract }: UseContractFormProps) => {
  const client = useApolloClient()

  const isEditing = !!contract
  const [, setSearchParams] = useSearchParams()
  const { projectId } = useParams()

  const defaultValues = useMemo(
    () => (contract ? getInitialValues(contract) : INITIAL_VALUES),
    [contract],
  )

  const formHook = useForm<ContractFormValues>({
    defaultValues,
  })

  const { toast, setToast } = useContext(ToastContext)

  const [createContractService] = useCreateContractService()
  const [updateContractService] = useUpdateContractService()

  const handleCreateOrUpdateContract = async () => {
    const { name, chain_id, config, collection_id, constructor_args } = formHook.getValues()
    const { max_mint_per_transaction, max_mint_per_player, player_mint_fee, collection_size } =
      config

    const input = {
      name,
      template: 'CryptoOfArms',
      contract_type: 'ERC1155',
      chain_id: Number(chain_id),
      config: {
        collection_size: Number(collection_size),
        player_mint_fee: Number(player_mint_fee),
        max_mint_per_transaction: Number(max_mint_per_transaction),
        max_mint_per_player: Number(max_mint_per_player),
      },
      collection_id: collection_id || undefined,
      constructor_args,
    }

    if (isEditing) {
      await updateContractService(contract.id, input)
      setToast({
        type: 'positive',
        message: `${name} contract was successfully updated`,
        open: true,
      })
    } else {
      if (!name) return
      const { contract } = await createContractService({ ...input, project_id: projectId })
      formHook.reset(getInitialValues(contract))
      setToast({
        type: 'positive',
        message: `${name} contract was successfully created`,
        open: true,
      })
      setSearchParams({ contractId: contract.id })
      await client.refetchQueries({
        include: ['contracts'],
      })
    }
  }

  useFormAutoSave({
    formHook,
    onSave: handleCreateOrUpdateContract,
    executeImmediately: !isEditing,
  })

  return {
    formHook,
    toast,
    setToast,
  }
}

export default useContractForm
