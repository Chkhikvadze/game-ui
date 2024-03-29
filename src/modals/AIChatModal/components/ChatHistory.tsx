import { useEffect, useState } from 'react'
import { useChatState } from 'modals/AIChatModal/hooks/useChat'
import { IChat } from 'modals/AIChatModal/types'
import styled from 'styled-components'

import plusIconsSvg from '../assets/plus_icon.svg'
import ChatIconSvg from '../assets/ChatIconSvg'
import { INITIAL_CHAT } from '../constants'

const ChatHistory = () => {
  const storedActiveIndex = localStorage.getItem('activeIndex')

  const { chats, showChat, addChat } = useChatState()
  const [activeIndex, setActiveIndex] = useState(
    storedActiveIndex ? parseInt(storedActiveIndex) : 0,
  )

  const onHandleClick = (chat: IChat, index: number) => {
    showChat(chat)
    setActiveIndex(index)
    localStorage.setItem('activeIndex', index.toString())
  }

  const handleAddNew = () => {
    addChat(INITIAL_CHAT)
    setActiveIndex(chats.length)
    localStorage.setItem('activeIndex', chats.length.toString())
  }

  useEffect(() => {
    showChat(chats[activeIndex])
  }, [])

  return (
    <StyledGroup>
      <StyledHeader>Chat History</StyledHeader>
      <StyledNewGameBtn onClick={handleAddNew}>
        <img src={plusIconsSvg} alt='create game' />
        Add New Game
      </StyledNewGameBtn>
      <StyledMenu>
        {chats.map((chat: IChat, index: number) => (
          <StyledMenuItem
            isActive={index === activeIndex}
            key={chat.id}
            onClick={() => onHandleClick(chat, index)}
          >
            <StyledMenuItemInner>
              <ChatIconSvg />
              <span>{chat.name}</span>
            </StyledMenuItemInner>
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </StyledGroup>
  )
}

export default ChatHistory

const StyledGroup = styled.div``

const StyledMenu = styled.ul`
  margin: 0;
  padding: 0;
  margin-top: 4px;
  list-style: none;
`

const StyledMenuItem = styled.li<{ isActive?: boolean }>`
  unset: all;
  padding: 16px 14px;
  border-radius: 6px;
  position: relative;
  opacity: 0.4;
  :hover {
    background: rgba(255, 255, 255, 0.1);
    opacity: 1;
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      padding: 1px; /* control the border thickness */
      background: linear-gradient(180deg, #73fafd 0%, #50b1d7 100%);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
      border: none;
      padding: 0;
      border-radius: 8px;
      padding-left: 2px;
    }
  }

  ${({ isActive }) =>
    isActive &&
    `
background: rgba(255, 255, 255, 0.1);
opacity: 1;
&::after {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1px; /* control the border thickness */
  background: linear-gradient(180deg, #73fafd 0%, #50b1d7 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  border: none;
  padding: 0;
  border-radius: 8px;
  padding-left: 2px;
}
`}
`

const StyledMenuItemInner = styled.div`
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
const StyledHeader = styled.h1`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
  padding-left: 8px;
`

const StyledNewGameBtn = styled.button`
  margin-top: 24px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  gap: 16px;
  width: 100%;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
`
