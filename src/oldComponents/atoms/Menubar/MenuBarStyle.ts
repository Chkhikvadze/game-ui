import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Typography from '../Typography'

const mainColorDiff = '#fff'

export const StyledRoot = styled.div<{ show: boolean }>`
  margin-top: 82px;
  height: 100%;
  background: #00283c;
  box-shadow: inset 1px 0 0 rgba(0, 0, 0, 0.2);
  z-index: 3;
  width: 240px;
  position: ${p => (!p.show ? 'fixed' : 'relative')};
  margin-left: ${p => (p.show ? '0px' : '-240px')};
  ${p => p.show && 'margin-right: 30px'};
  transition: margin-left 0.1s ease;

  @media (max-width: 1200px) {
    position: fixed;
  }
`

export const StyledWrapper = styled.div<{ show: boolean }>`
  opacity: ${p => (p.show ? '1' : '0')};
  transition: opacity 0.5s;
  padding-top: 7px;
`

export const StyledContainer = styled.div`
  position: fixed;
  background: #00283c;
  min-height: 100%;
  width: 240px;
  padding: 20px 0;
`

export const StyledMainUl = styled.ul`
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: max-content;
  margin-bottom: 46px;

  ::-webkit-scrollbar {
    display: none;
  }

  li {
    cursor: pointer;
  }
`

export const StyledLink = styled(Link)<{ disabled?: boolean }>`
  color: #cfcfcf;
  display: inline-block;
  text-align: left;

  &:hover {
    color: ${mainColorDiff};
  }

  ${({ disabled }) =>
    disabled &&
    `
    pointer-events: none;
    opacity: 0.2;
  `}
`

export const StyledInnerUl = styled(StyledMainUl)<{ toggle?: boolean }>`
  display: flex;
  box-sizing: border-box;
  margin-left: 34px;
  /* margin-top: -10px; */
  margin-bottom: ${p => (p.toggle ? '12px' : '0px')};

  max-height: ${p => (p.toggle ? '180px' : '0')};
  ${p => !p.toggle && 'overflow: hidden'};
  transition: 0.2s ease;
  padding-bottom: ${p => (p.toggle ? '10px' : '0')};

  li {
    /* padding-left: 32px; */
  }
`

export const StyledVerticalLine = styled.div`
  border-left: 1px solid #495057;
  /* display: inline; */
  height: 100%;
`

export const StyledNavWrapper = styled.div<{ toggle?: boolean }>`
  /* position: relative; */
  margin-bottom: -8px;
  margin-top: 15px;
  margin-left: -1px;
  transition: 0.5s ease;
  max-height: ${p => (p.toggle ? '180px' : '0')};
  ${p => p.toggle && 'overflow: hidden'};
`

export const StyledLine = styled.span`
  display: inline-block;
  border-bottom: 1px solid #495057;
  width: 8px;
  margin-right: 13px;
  margin-bottom: 5px;
`

export const StyledTypography = styled(Typography)<{ active?: boolean }>`
  background-color: ${p => (p.active ? '#004b70' : '#00283c')};
  padding-left: 39px;
  height: 48px;
  display: flex;
  align-items: center;
  position: relative;
  user-select: none;
  margin-top: 5px;
  /* margin-bottom: 10px; */
  cursor: pointer;

  &:hover {
    color: ${mainColorDiff};
  }
`

export const StyledIcon = styled.div`
  right: 10px;
  top: 2px;
  position: relative;
  display: inline-block;
`

export const StyledArrowIcon = styled.img<{ toggleMenu?: boolean }>`
  filter: brightness(0) invert(70%);
  width: 14px;
  position: absolute;
  right: 30px;
  top: 18px;
  ${p => p.toggleMenu && 'transform: rotate(180deg)'};
  transition: transform 0.1s ease;
`
