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
                collectionId={contract.collection_id}
                onClick={async () => {
                  await updateContractService(contract.id, {
                    chain_id: contract.chain_id,
                    constructor_args: contract.constructor_args,
                    contract_type: contract.contract_type,
                    name: contract.name,
                    template: contract.template,
                    config: contract.config,
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
  gap: 20px;
`
