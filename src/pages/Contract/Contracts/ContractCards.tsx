import TabHeader from 'pages/Collection/Collections/TabHeader'
import { Contract } from 'services/useContractService'
import { CHAIN_ID_TO_CONTRACT } from './Contract.utils'
import ContractCard from './ContractCard'
import { StyledContainerWrapper } from 'styles/globalStyle.css'
import ContractMiniCard from 'pages/Collection/EditCollection/CollectionContract/ContractMiniCard'

type ContractCardsProps = {
  contracts?: Contract[]
  heading: string
  paragraph: string
  onClick: (contractId: string) => void
}

const ContractCards = ({ contracts, heading, paragraph, onClick }: ContractCardsProps) => {
  if (!contracts?.length) return null

  return (
    <>
      <TabHeader heading={heading} paragraph={paragraph} />
      <StyledContainerWrapper className='wrapper_card'>
        {contracts?.map(({ id, name, chain_id, collection_id }) => {
          const { subtitle, image } = CHAIN_ID_TO_CONTRACT[chain_id] || {}

          return (
            <>
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
                collectionId={collection_id}
                onClick={() => onClick(id)}
              />
            </>
          )
        })}
      </StyledContainerWrapper>
    </>
  )
}

export default ContractCards
