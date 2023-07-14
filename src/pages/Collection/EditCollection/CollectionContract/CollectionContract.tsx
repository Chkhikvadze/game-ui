import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { ToastContext } from 'contexts'

import ContractMiniCard from './ContractMiniCard'
import styled from 'styled-components'

import CreateContractModal from 'modals/CreateContractModal'
import ContractViewDetails from 'pages/Contract/ContractView/ContractViewDetails'
import useCollectionContract from './useCollectionContract'

const CollectionContract = () => {
  const navigate = useNavigate()

  const {
    contracts,
    existingContract,
    noLinkedContracts,
    updateContractService,
    collectionId,
    game_id,
    refetchContract,
    openCreateContractModal,
    refetch,
  } = useCollectionContract()

  const { setToast } = useContext(ToastContext)

  return (
    <>
      {existingContract ? (
        <ContractViewDetails contract={existingContract} />
      ) : (
        <StyledCardsContainer>
          {noLinkedContracts?.map((contract: any) => {
            return (
              <ContractMiniCard
                key={contract.id}
                name={contract.name}
                chain={contract.blockchain}
                refetch={refetch}
                collectionId={contract.collection_id}
                onClick={async () => {
                  await updateContractService(contract.id, {
                    chain_id: contract.chain_id,
                    config: contract.config,
                    constructor_config: contract.constructor_config,
                    name: contract.name,
                    collection_id: collectionId,
                  })

                  setToast({
                    message: 'Contract Linked',
                    type: 'positive',
                    open: true,
                  })

                  refetchContract()
                }}
              />
            )
          })}

          {(contracts?.total === 0 || noLinkedContracts?.length === 0) && (
            <ContractMiniCard
              isEmpty
              refetch={refetch}
              onClick={() => {
                navigate(`/game/${game_id}/contracts`)
                openCreateContractModal()
              }}
            />
          )}
        </StyledCardsContainer>
      )}
    </>
  )
}

export default CollectionContract

const StyledCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`
