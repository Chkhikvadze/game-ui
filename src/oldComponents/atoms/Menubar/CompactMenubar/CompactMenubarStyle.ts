import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Typography from 'oldComponents/atoms/Typography'

export const StyledRoot = styled.div<{show: boolean}>`
  background: #00283c;
  height: 100%;
  margin-top: 84px;

  @media (min-width: 1200px) {
    ${(p) => p.show && 'position: fixed'};
  }

  @media (max-width: 1200px) {
    margin-right: 100px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`
export const StyledContainer = styled.div`
  position: fixed;
  background: #00283c;
  min-height: 100%;
  width: 72px;
  padding-top: 30px;
  z-index: 2;

  /* border: 4px solid blue; */
`

export const StyledUl = styled.ul<{show: boolean}>`
  margin: 0;
  text-align: center;
  opacity: ${(p) => (p.show ? '0': '1')};
  transition: 0.5s ease;
`

export const StyledInnerUl = styled.ul`
  margin: 0;
  position: absolute;
  left: 72px;
  top: 0;
  visibility: hidden;
  opacity: 0;
  transition: all 0.2s ease;
`

export const StyledIconLi = styled.li<{active?: boolean}>`
  background-color: ${(p) => (p.active ? '#004b70': '#00283c')};
  position: relative;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #004b70;
    ${StyledInnerUl} {
      visibility: visible;
      opacity: 1;
    }
  }
`

export const StyledTypography = styled(Typography)`
  background-color: #004b70;
  text-align: left;
`

export const StyledLink = styled(Link)`
  padding: 0px 15px;
  height: 57px;
  display: flex;
  align-items: center;
  color: #e5e5e5;
  white-space: nowrap;

  &:hover {
    color: #fff;
  }
`
