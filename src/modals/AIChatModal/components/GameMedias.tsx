import styled from 'styled-components'
import ImageCard from './ImageCard'
import { WrapperSecondary } from './WrapperSecondary'

const GameMedias = ({ message }: any) => {
  console.log(message, 'message')

  return (
    <WrapperSecondary>
      <StyledImageWrapper>
        {message?.medias?.map((item: any) => (
          <ImageCard key={item} src={item} />
        ))}
      </StyledImageWrapper>
    </WrapperSecondary>
  )
}

export default GameMedias

const StyledImageWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  grid-auto-rows: 144px;
`
