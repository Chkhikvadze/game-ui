import styled from 'styled-components'
import ArrowLeftSvg from './assets/ArrowLeftSvg'
import ArrowRightSvg from './assets/ArrowRightSvg'
import { useNavigate } from 'react-router-dom'

const ArrowNavigation = () => {
  const navigate = useNavigate()

  return (
    <StyledColumnContainer>
      <StyledNavigationBtn onClick={() => navigate(-1)}>
        <ArrowLeftSvg />
      </StyledNavigationBtn>
      <StyledNavigationBtn onClick={() => navigate(+1)}>
        <ArrowRightSvg />
      </StyledNavigationBtn>
    </StyledColumnContainer>
  )
}

export default ArrowNavigation

const StyledColumnContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

const StyledNavigationBtn = styled.div`
  cursor: pointer;
`
