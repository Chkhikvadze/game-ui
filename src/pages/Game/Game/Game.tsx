import Collections from 'pages/Collection/Collections/Collections'
import Contracts from 'pages/Contract/Contracts/Contracts'
import { StyledGroupContainer } from 'routes/LayoutStyle'
import styled from 'styled-components'
import { SectionDivider } from 'styles/globalStyle.css'

const Game = () => {
  return (
    <>
      <Collections />
      <StyledSectionDivider />
      <Contracts />
    </>
  )
}

export default Game

const StyledSectionDivider = styled(SectionDivider)`
  margin: 50px 0;
`
