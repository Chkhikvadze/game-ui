import React from 'react'
import styled from 'styled-components'

type BurgerMenuTypes = {
  onItemClick?: Function | any
}
const BurgerMenu = ({ onItemClick }: BurgerMenuTypes) => (
  <StyledLineContainer onClick={onItemClick}>
    <StyledLine />
    <StyledLine />
    <StyledLine />
  </StyledLineContainer>
)

const StyledLineContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-row-gap: 5px;
  cursor: pointer;
  padding: 5px;
`

const StyledLine = styled.div`
  background: #ffffff;
  height: 2.1px;
  border-radius: 8px;
  width: 22px;
`

export default BurgerMenu
