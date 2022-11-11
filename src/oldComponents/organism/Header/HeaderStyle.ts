import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Button from 'oldComponents/atoms/Button'

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 26px 32px 21px;
  background-color: #00283c;
  .header__drop__down {
    align-self: center;
  }
  position: fixed;
  width: 100%;
  height: 87px;
  box-sizing: border-box;
  z-index: 10;
  top: 0;
`

const StyledGroupContainer = styled.div<{gap?: any}>`
  margin-left: -8px;
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  grid-column-gap: ${(p) => (p.gap ? p.gap: '25px')};
`

const StyledLink = styled(Link)`
  cursor: pointer;
`

const StyledLogo = styled.img`
  width: 160px;
  display: block;
`

const StyledRightSide = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledNotification = styled.div`
  margin: 2px 26px 0;
`

const StyledIcon = styled.img`
  filter: brightness(0) invert(1);
`

// Lang
const StyledLangRoot = styled.div`
  display: flex;
  justify-content: end;
`

const StyledLangButton = styled(Button)<{isLang?: boolean}>`
  margin-right: 10px;
  background: none;
  color: #dee2e6;
  border: 1px solid #dee2e6;
  font-size: 12px;
  border-radius: 4px;
  transition: all 0.1s ease-in-out;

  ${(p) =>
  p.isLang &&
  `
    border-color: #dee2e6;
    color: #dee2e6;
    background-color: #4C4F55;
  `};

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    border-color: #e5e5e5;
    color: #e5e5e5;
  }
`

export {
  StyledHeader,
  StyledGroupContainer,
  StyledLink,
  StyledLogo,
  StyledIcon,
  StyledLangRoot,
  StyledLangButton,
  StyledRightSide,
  StyledNotification,
}
