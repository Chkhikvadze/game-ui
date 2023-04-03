import { useApolloClient } from '@apollo/client'
import { ToastContext } from 'contexts'
import useFormAutoSave from 'hooks/useFormAutoSave'
import { useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { useParams, useSearchParams } from 'react-router-dom'
import {
  Contract,
  useCreateContractService,
  useUpdateContractService,
} from 'services/useContractService'
import CONTRACT_BY_ID_GQL from '../../../gql/contract/contractById.gql'

interface ContractFormValues {
  name: string
  chain_id: number
  collection_id?: string
  config: {
    collection_size: number
    player_mint_fee: number
    max_mint_per_transaction: number
    max_mint_per_player: number
    is_mint_by_player: boolean
    is_buy_by_player: boolean
    is_royalties: boolean
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
      is_mint_by_admin: Boolean(config.is_mint_by_admin),
      is_buy_by_player: Boolean(config.is_buy_by_player),
      is_royalties: Boolean(config.is_royalties),
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
    is_mint_by_admin: true,
    is_buy_by_player: true,
    is_royalties: true,
  },
  constructor_args: DEFAULT_CONSTRUCTOR_ARGS,
  collection_id: undefined,
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

  const contractId = contract?.id

  const handleCreateOrUpdateContract = useCallback(async () => {
    const { name, chain_id, config, collection_id, constructor_args } = formHook.getValues()
    const { max_mint_per_transaction, max_mint_per_player, player_mint_fee, collection_size } =
      config

    const input = {
      name,
      template: 'CryptoOfArms',
      contract_type: 'ERC1155',
      chain_id: Number(chain_id),
      config: {
        ...config,
        collection_size: Number(collection_size),
        player_mint_fee: Number(player_mint_fee),
        max_mint_per_transaction: Number(max_mint_per_transaction),
        max_mint_per_player: Number(max_mint_per_player),
      },
      collection_id: collection_id || undefined,
      constructor_args,
    }

    if (contractId) {
      await updateContractService(contractId, input)
      setToast({
        type: 'positive',
        message: `${name} contract was successfully updated`,
        open: true,
      })
    } else {
      if (!name) return
      const { contract } = await createContractService({ ...input, project_id: projectId })
      // formHook.reset(getInitialValues(contract))

      // client.writeQuery({
      //   query: CONTRACT_BY_ID_GQL,
      //   variables: { id: contract.id },
      //   data: contract,
      // })

      // client.cache.updateQuery({ query }, data => {
      //   console.log(data)
      //   return data
      // })

      setToast({
        type: 'positive',
        message: `${name} contract was successfully created`,
        open: true,
      })

      setSearchParams({ contractId: contract.id })
    }
  }, [formHook, contractId, projectId, setToast, setSearchParams])

  const handleCreateContract = async () => {
    const values = formHook.getValues()
    if (!values.name) return

    const input = {
      ...values,
      template: 'CryptoOfArms',
      contract_type: 'ERC1155',
    }

    const { contract } = await createContractService({ ...input, project_id: projectId })
    // formHook.reset(getInitialValues(contract))

    setToast({
      type: 'positive',
      message: `${name} contract was successfully created`,
      open: true,
    })

    setSearchParams({ contractId: contract.id })
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
    handleCreateContract,
  }
}

export default useContractForm
