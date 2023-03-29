import { ToastContext } from 'contexts'
import { useContext } from 'react'
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
    max_mint_per_transaction: number
    max_mint_per_player: number
  }
}

export type ContractFormHook = UseFormReturn<ContractFormValues>

// If contract already exists we need to fill form data with existing values
const getInitialValues = (contract: Contract) => {
  const { name, chain_id, config = {}, collection_id } = contract
  return {
    name,
    chain_id,
    config: {
      max_mint_per_transaction: Number(config.max_mint_per_transaction),
      max_mint_per_player: Number(config.max_mint_per_player),
    },
    collection_id,
  }
}

const INITIAL_VALUES = {
  name: '',
  chain_id: 80001,
  config: {
    max_mint_per_transaction: 0,
    max_mint_per_player: 0,
  },
  collection_id: null,
}

type UseContractFormProps = {
  contract?: Contract
}

const useContractForm = ({ contract }: UseContractFormProps) => {
  const isEditing = !!contract
  const [, setSearchParams] = useSearchParams()
  const { projectId } = useParams()

  const formHook = useForm<ContractFormValues>({
    defaultValues: contract ? getInitialValues(contract) : INITIAL_VALUES,
  })

  const { setToast } = useContext(ToastContext)

  const [createContractService] = useCreateContractService()
  const [updateContractService] = useUpdateContractService()

  const handleCreateOrUpdateContract = async () => {
    const { name, chain_id, config, collection_id } = formHook.getValues()
    const { max_mint_per_transaction, max_mint_per_player } = config

    const input = {
      name,
      template: 'CryptoOfArms',
      contract_type: 'ERC1155',
      chain_id: Number(chain_id),
      config: {
        max_mint_per_transaction: Number(max_mint_per_transaction),
        max_mint_per_player: Number(max_mint_per_player),
      },
      collection_id: collection_id || undefined,
    }

    if (isEditing) {
      await updateContractService(contract.id, input)
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
  }

  return {
    formHook,
    handleCreateOrUpdateContract,
  }
}

export default useContractForm
