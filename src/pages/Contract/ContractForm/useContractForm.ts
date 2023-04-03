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
  collection_id?: string
  config: {
    collection_size: number
    player_mint_fee: number
    max_mint_per_transaction: number
    max_mint_per_player: number
    is_mint_by_admin: boolean
    is_buy_by_player: boolean
    is_royalties: boolean
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
  is_mint_by_admin: true,
  is_buy_by_player: true,
  is_royalties: true,
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
  const { projectId } = useParams()
  const { toast, setToast } = useContext(ToastContext)

  const defaultValues = useMemo(() => getDefaultValues(contract), [contract])

  const form = useForm<ContractFormValues>({
    defaultValues,
  })

  const [createContractService] = useCreateContractService()
  const [updateContractService] = useUpdateContractService()

  const contractId = contract?.id

  const handleCreateOrUpdateContract = useCallback(async () => {
    const values = form.getValues()

    const input = {
      ...values,
      template: 'CryptoOfArms',
      contract_type: 'ERC1155',
    }

    const { name } = values

    if (contractId) {
      await updateContractService(contractId, input)

      setToast({
        type: 'positive',
        message: `${name} contract was successfully updated`,
        open: true,
      })
    } else {
      const { contract } = await createContractService({ ...input, project_id: projectId })

      setToast({
        type: 'positive',
        message: `${name} contract was successfully created`,
        open: true,
      })

      setSearchParams({ contractId: contract.id })
    }
  }, [form, contractId, projectId, setToast, setSearchParams])

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