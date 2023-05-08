import styled from 'styled-components'

import Close from '@l3-lib/ui-core/dist/icons/Close'

type PropertyItemProps = {
  image: string
  name: string
  onClick: () => void
}

const PropertyItem = ({ image, name, onClick }: PropertyItemProps) => {
  return (
    <StyledPropertyItem>
      <StyledImageWrapper>
        {image?.length > 0 && <StyledImage src={image} alt='' />}
      </StyledImageWrapper>
      {name}

      <StyledButton onClick={onClick} className={'button'}>
        <Close />
      </StyledButton>
    </StyledPropertyItem>
  )
}

export default PropertyItem

const StyledPropertyItem = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  color: white;

  gap: 10px;

  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;

  padding: 6px 8px;

  :hover {
    background-color: rgba(255, 255, 255, 0.1);
    .button {
      opacity: 1;
    }
  }
`

const StyledImageWrapper = styled.div`
  width: 28px;
  height: 28px;

  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
`
const StyledImage = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 2px;
`
const StyledButton = styled.div`
  cursor: pointer;

  margin-left: auto;

  opacity: 0;
`
