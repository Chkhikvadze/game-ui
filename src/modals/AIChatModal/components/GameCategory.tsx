import React, { useState, useEffect } from 'react'
import { useChatState } from 'modals/AIChatModal/hooks/useChat'
import { IChat } from 'modals/AIChatModal/types'
import { GAME_CATEGORY_OPTIONS } from 'utils/constants'
import styled from 'styled-components'
import Games from '@l3-lib/ui-core/dist/icons/Games'
import { enterIcon } from 'assets/icons'
import MarkIconSvg from '../assets/mark_icon.svg'
import { use } from 'i18next'

const GameCategory = () => {
  const { setGameCategory, currentChat } = useChatState()
  const [show, set_show] = useState(currentChat.gameCategory || '')

  useEffect(() => {
    set_show(currentChat.gameCategory || '')
  }, [currentChat.gameCategory])

  return (
    <>
      <Menu>
        {GAME_CATEGORY_OPTIONS.map((category: any) => {
          const isSelected = category.label === currentChat.gameCategory

          const onHandelClick = (category_value: string) => {
            if (isSelected) {
              setGameCategory(null)
              set_show('')
              return
            }
            setGameCategory(category_value)
            set_show(category_value)
          }

          return (
            <MenuItem
              aria-selected={isSelected}
              key={category.value}
              onClick={() => onHandelClick(category.value)}
              showItems={show === category.value || show === '' ? true : false}
            >
              <ItemName>
                <Games />
                {category.label}
              </ItemName>
              {isSelected ? (
                <img src={MarkIconSvg} alt='selected' />
              ) : (
                <StyleEnterGroup>
                  <span>Enter</span>
                  <img src={enterIcon} alt='click enter' />
                </StyleEnterGroup>
              )}
            </MenuItem>
          )
        })}
      </Menu>
      {/* <br />
      <h3>Choose Category:</h3>
      {currentChat.gameCategory && <h3> {currentChat.gameCategory}</h3>}
      <h3
        onClick={() => {
          setGameCategory(null)
        }}
      >
        Remove Selected
      </h3> */}
    </>
  )
}

export default GameCategory

const Menu = styled.ul`
  all: unset;
  list-style: none;
`

const StyleEnterGroup = styled.div`
  visibility: hidden;
  display: flex;
  align-items: center;
  gap: 16px;
  span {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #ffffff;
  }
`

const MenuItem = styled.li<{ showItems?: any }>`
  cursor: pointer;
  position: relative;

  :hover {
    background: rgba(255, 255, 255, 0.1);

    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 6px;

    ${StyleEnterGroup} {
      visibility: visible;
    }
  }
  &[aria-selected='true'] {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    ${StyleEnterGroup} {
      visibility: visible;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 6px;
      padding: 1px; /* control the border thickness */
      background: linear-gradient(180deg, #73fafd 0%, #50b1d7 100%);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
      border: none;
    }
  }
  margin-top: 2px;
  // border: 1px solid rgba(255, 255, 255, 0.4);
  // border-radius: 6px;
  position: relative;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  padding: 10px 16px;
  color: #ffffff;
  display: ${p => (p.showItems ? 'flex' : 'none')};
  justify-content: space-between;
  align-items: center;
`

const ItemName = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  svg {
    width: 27px;
    height: 20px;
  }
`
