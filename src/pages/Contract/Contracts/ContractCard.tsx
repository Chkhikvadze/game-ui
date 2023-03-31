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
  selected?: boolean
  onClick?: () => void
}

const ContractCard = ({
  image,
  title,
  subtitle,
  isCreate = false,
  outline,
  selected = false,
  onClick,
}: ContractCardProps) => {
  return (
    <StyledCardWrapper isCreate={isCreate}>
      <ProjectCard
        onImageClick={onClick}
        hideButton
        outline={outline ? outline : selected ? 'normal' : ''}
        itemInfo={{
          title: title,
          image: image,
        }}
        cardFooter={<CollectionFooter title={title} subTitle={subtitle} />}
        topLeftIcon={
          <StyledChainWrapper>
            <img src={Eth} alt='' />
            <StyledTextWrapper className='showMe'>
              <Typography
                value='Testnet'
                type={Typography.types.LABEL}
                size={Typography.sizes.xss}
                customColor={'#FFF'}
              />
            </StyledTextWrapper>
          </StyledChainWrapper>
        }
      />
    </StyledCardWrapper>
  )
}

export default ContractCard

const StyledCardWrapper = styled.div<{ isCreate: boolean }>`
  padding: 10px;

  cursor: ${p => p.isCreate && 'pointer'};
`
const StyledChainWrapper = styled.div`
  height: 30px;

  overflow: hidden;
  display: flex;
  gap: 12px;
  margin-bottom: 5px;
  padding: 10px;
  border-radius: 100px;
  align-items: center;

  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(1px);

  max-width: 30px;
  transition: max-width 0.3s;
  &:hover {
    max-width: 100px;

    .showMe {
      opacity: 1;
    }
  }
`
const StyledTextWrapper = styled.div`
  opacity: 0;
  transition: opacity 0.3s;
`
