import React from 'react'
import TabHeader from 'pages/Collection/Collections/TabHeader'
import { IContract } from 'services'
import { CHAIN_ID_TO_CONTRACT } from './Contract.utils'
import { StyledContainerWrapper } from 'styles/globalStyle.css'
import ContractMiniCard from 'pages/Collection/EditCollection/CollectionContract/ContractMiniCard'

type ContractCardsProps = {
  contracts?: IContract[]
  heading: string
  paragraph: string
  onClick: (contractId: string) => void
  refetch: () => void
}

const ContractCards = ({ contracts, heading, paragraph, onClick, refetch }: ContractCardsProps) => {
  if (!contracts?.length) return null

  return (
    <>
      <TabHeader heading={heading} paragraph={paragraph} />
      <StyledContainerWrapper className='wrapper_card'>
        {contracts?.map(({ id, name, chain_id, collection_id, blockchain }) => {
          const { subtitle, image } = CHAIN_ID_TO_CONTRACT[chain_id] || {}
          return (
            <div key={id}>
              {/* <ContractCard
                key={id}
                image={image}
                title={name}
                subtitle={subtitle}
                outline={'normal'}
                onClick={() => onClick(id)}
              /> */}
              <ContractMiniCard
                name={name}
                chain={blockchain}
                refetch={refetch}
                collectionId={collection_id}
                onClick={() => onClick(id)}
                contractId={id}
              />
            </div>
          )
        })}
      </StyledContainerWrapper>
    </>
  )
}

export default ContractCards
