import { useNavigate, useParams } from 'react-router-dom'
import {
  useContractByCollectionId,
  useContractsService,
  useUpdateContractService,
} from 'services/useContractService'
import { useCollectionByIdService } from 'services/useCollectionService'
import ContractMiniCard from './ContractMiniCard'
import styled from 'styled-components'
import { useContracts } from 'pages/Contract/Contracts/useContracts'
import CreateContractModal from 'modals/CreateContractModal'
import ContractViewDetails from 'pages/Contract/ContractView/ContractViewDetails'

const CollectionContract = () => {
  const { collectionId } = useParams()
  const navigate = useNavigate()

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

  const filteredContracts = contracts?.items?.filter(
    (contract: any) => contract.collection_id === null,
  )

  return (
    <>
      {existingContract ? (
        <ContractViewDetails contract={existingContract} />
      ) : (
        <StyledCardsContainer>
          {filteredContracts?.map((contract: any) => {
            return (
              <ContractMiniCard
                key={contract.id}
                name={contract.name}
                collectionId={contract.collection_id}
                onButtonClick={async () => {
                  await updateContractService(contract.id, {
                    chain_id: contract.chain_id,
                    constructor_args: contract.constructor_args,
                    contract_type: contract.contract_type,
                    name: contract.name,
                    template: contract.template,
                    config: contract.config,
                    collection_id: collectionId,
                  })
                  refetchContract()
                }}
              />
            )
          })}

          {(contracts?.total === 0 || filteredContracts?.length === 0) && (
            <ContractMiniCard
              isEmpty
              onButtonClick={() => {
                navigate(`/game/${game_id}/contracts`)
                openCreateContractModal()
              }}
            />
          )}
          <CreateContractModal />
        </StyledCardsContainer>
      )}
    </>
  )
}

export default CollectionContract

const StyledCardsContainer = styled.div`
  display: flex;
  gap: 20px;
`
