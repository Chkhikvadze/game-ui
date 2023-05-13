import React, { useEffect, useState } from 'react'
import { useChatState } from 'modals/AIChatModal/hooks/useChat'
import { IChatMessage } from 'modals/AIChatModal/types'
import styled from 'styled-components'
import MarkIconSvg from '../assets/mark_icon.svg'
import { enterIcon } from 'assets/icons'

type GameplayProps = {
  message: IChatMessage
}

const Gameplay = ({ message }: GameplayProps) => {
  const { gameplays } = message
  const { setGameplay, currentChat } = useChatState()
  const [active, setActive] = useState(0)

  const onHandelClick = (isSelected: boolean, gameplay: any) => {
    if (isSelected) {
      setGameplay(null)
      setActive(0)
      return
    }
    setGameplay(gameplay)
    setActive(gameplay.id)
  }

  return (
    <Menu>
      {gameplays?.map((gameplay: any) => {
        const isSelected = gameplay.id === active

        return (
          <MenuItem
            key={gameplay.id}
            onClick={() => {
              onHandelClick(isSelected, gameplay)
            }}
            aria-selected={isSelected}
            showItems={active === gameplay.id || active === 0 ? true : false}
          >
            <StyledImageWrapper>
              {gameplay.image ? <img src={gameplay.image} alt={gameplay.name} /> : 'No image'}
            </StyledImageWrapper>
            <StyledInfoGroup>
              <h2>Title: {gameplay.id}</h2>
              <p>{gameplay.description}</p>
            </StyledInfoGroup>
            {isSelected ? (
              <StyleEnterGroup>
                <img src={MarkIconSvg} alt='selected' />
              </StyleEnterGroup>
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

    // <br />
    // <h3>Chosen Game Idea:</h3>
    // {currentChat?.gameplay && <h3> {currentChat?.gameplay?.description}</h3>}
    // <h3
    //   onClick={() => {
    //     setGameplay(null)
    //   }}
    // >
    //   Remove Selected
    // </h3>
  )
}

export default Gameplay

const Menu = styled.ul`
  all: unset;
  list-style: none;
`

const StyleEnterGroup = styled.div`
  visibility: hidden;
  display: flex;
  align-items: start;
  gap: 16px;
  justify-content: end;
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

    // border: 1px solid rgba(255, 255, 255, 0.4);
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
  padding: 12px 8px;
  padding-right: 16px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 6px;
  margin-bottom: 16px;
  display: ${p => (p.showItems ? 'grid' : 'none')};
  grid-template-columns: auto 1fr 90px;
  gap: 14px;
  min-height: 144px;
`

const StyledImageWrapper = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  object-fit: contain;
  width: 96px;
  height: 96px;
  position: relative;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`

const StyledInfoGroup = styled.div`
  h2 {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #ffffff;
  }
  p {
    font-style: normal;
    font-weight: 450;
    font-size: 12px;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.6);
  }
`
