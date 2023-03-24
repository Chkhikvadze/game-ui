import { useState } from 'react'

import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'

import ProjectCard from 'pages/Project/Projects/Card/ProjectCard'
import CollectionFooter from 'pages/Project/Projects/Card/CardFooter/CollectionFooter'

import Eth from 'assets/icons/eth.svg'

type ContractCardProps = {
  image: string
  title: string
  subtitle: string
  isCreate?: boolean
  outline?: 'normal' | 'warning'
}

const ContractCard = ({ image, title, subtitle, isCreate = false, outline }: ContractCardProps) => {
  const [cardStatus, setCardStatus] = useState(false)
  return (
    <StyledCardWrapper
      onClick={() => {
        if (isCreate) {
          setCardStatus(!cardStatus)
        }
      }}
      isCreate={isCreate}
    >
      <ProjectCard
        hideButton
        outline={outline || cardStatus ? 'normal' : ''}
        itemInfo={{
          title: title,
          image: image,
        }}
        cardFooter={<CollectionFooter title={title} subTitle={subtitle} />}
        topLeftIcon={
          <StyledChainWrapper>
            <img src={Eth} alt='' />
            <Typography
              value='Testnet'
              type={Typography.types.LABEL}
              size={Typography.sizes.xss}
              customColor={'#FFF'}
            />
          </StyledChainWrapper>
        }
      />
    </StyledCardWrapper>
  )
}

export default ContractCard

const StyledCardWrapper = styled.div<{ isCreate: boolean }>`
  padding: 4px;

  cursor: ${p => p.isCreate && 'pointer'};
`
const StyledChainWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 10px;

  align-items: center;
`
