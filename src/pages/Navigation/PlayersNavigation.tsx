import styled from 'styled-components'
import HomeIconSvg from './assets/HomeIconSvg'
import InventoryIconSvg from './assets/InventoryIconSvg'
import ResourcesIconSvg from './assets/ResourcesIconSvg'
import PlayersIconSvg from './assets/PlayersIconSvg'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { includes } from 'lodash'

import Teams from '@l3-lib/ui-core/dist/icons/Teams'
import Payments from '@l3-lib/ui-core/dist/icons/Payments'
import About from '@l3-lib/ui-core/dist/icons/About'

const PlayersNavigation = () => {
  const navigate = useNavigate()

  const { pathname } = useLocation()

  const [active, setActive] = useState<string[]>([])

  const onHandleClick = (navigation_name: string) => {
    // setActive(navigation_name)
    navigate(navigation_name)
  }

  useEffect(() => {
    const pathArr = pathname ? pathname.split('/') : []

    setActive(pathArr)
  }, [pathname])

  return (
    <StyledUl>
      <StyledLi isActive={includes(active, 'assets')} onClick={() => onHandleClick('assets')}>
        <Teams />
        <span>Asset Own</span>
      </StyledLi>
      <StyledLi
        isActive={includes(active, 'transactions')}
        onClick={() => onHandleClick('transactions')}
      >
        <Payments />
        <span>Transactions</span>
      </StyledLi>
      <StyledLi isActive={includes(active, 'about')} onClick={() => onHandleClick('about')}>
        <About />
        <span>About</span>
      </StyledLi>
      {/* <StyledLi isActive={includes(active, 'players')} onClick={() => onHandleClick('players')}>
        <Doc />
        <span>Docs</span>
      </StyledLi> */}
    </StyledUl>
  )
}

export default PlayersNavigation

const StyledUl = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 16px;
`

const StyledLi = styled.li<{ isActive?: boolean }>`
  width: 90px;
  height: 64px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  span {
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    color: var(--content-content-tertiary, rgba(255, 255, 255, 0.6));
  }
  ${({ isActive }) =>
    isActive &&
    `
    border-radius: 6px;
    background: var(--basic-foreground-black-1, rgba(0, 0, 0, 0.10));
    span{
      color: var(--content-content-primary, #FFF);
    }
    svg{
      path{
        fill-opacity: 1
      }
    }
`}
`
