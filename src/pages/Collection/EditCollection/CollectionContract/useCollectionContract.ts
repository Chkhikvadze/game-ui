import { useParams } from 'react-router-dom'
import {
  useContractByCollectionId,
  useContractsService,
  useUpdateContractService,
} from 'services/useContractService'
import { useCollectionByIdService } from 'services/useCollectionService'

import { useContracts } from 'pages/Contract/Contracts/useContracts'

const useCollectionContract = () => {
  const { collectionId } = useParams()

  const { data: collection } = useCollectionByIdService({
    id: collectionId,
  })

  const { data: existingContract, refetch: refetchContract } = useContractByCollectionId({
    id: collectionId,
  })

  const { game_id } = collection

  const { data: contracts } = useContractsService({
    page: 1,
    limit: 100,
    game_id: game_id,
  })

  const { openCreateContractModal } = useContracts()

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
