import { useModal } from 'hooks'
import { useParams } from 'react-router-dom'
import {
  useContractByCollectionIdService,
  useContractsService,
  useUpdateContractService,
} from 'services'
import { useCollectionByIdService } from 'services/useCollectionService'

const useCollectionContract = () => {
  const { collectionId } = useParams()

  const { openModal } = useModal()

  const { data: collection } = useCollectionByIdService({
    id: collectionId,
  })

  const { data: existingContract, refetch: refetchContract } = useContractByCollectionIdService({
    id: collectionId,
  })

  const { game_id } = collection

  const { data: contracts } = useContractsService({
    page: 1,
    limit: 100,
    game_id: game_id,
  })

  const openCreateContractModal = () => openModal({ name: 'create-contract-modal' })

  const [updateContractService] = useUpdateContractService()

  const noLinkedContracts = contracts?.items?.filter(
    (contract: any) => contract.collection_id === null,
  )

  return {
    contracts,
    existingContract,
    noLinkedContracts,
    updateContractService,
    collectionId,
    game_id,
    refetchContract,
    openCreateContractModal,
  }
}

export default useCollectionContract
