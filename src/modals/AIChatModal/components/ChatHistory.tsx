import { useState } from 'react'
import { useChatState } from 'modals/AIChatModal/hooks/useChat'
import { IChat, INITIAL_CHAT } from 'modals/AIChatModal/types'
import styled from 'styled-components'

import ChatIconSvg from '../assets/ChatIconSvg'

const ChatHistory = () => {
  const { chats, setCurrentChat, addChat } = useChatState()
  const [activeIndex, setActiveIndex] = useState(0)

  const onHandleClick = (chat: IChat, index: number) => {
    setCurrentChat(chat)
    setActiveIndex(index)
  }

  return (
    <StyledGroup>
      <StyledNewGameBtn onClick={() => addChat(INITIAL_CHAT)}>+ Add New Game</StyledNewGameBtn>
      <StyledHeader>Chat History</StyledHeader>
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
  margin-top: 24px;
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
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
  padding-left: 8px;
  border: 1px solid darkgray;
  padding: 12px 14px;
  margin-bottom: 10px;
`
