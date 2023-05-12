import React, { useState } from 'react'
import { useChatState } from 'modals/AIChatModal/hooks/useChat'
import { IChatStep, IChat } from 'modals/AIChatModal/types'
import CloseIconSvg from 'assets/svgComponents/CloseIconSvg'
import { useModal } from 'hooks'
import styled from 'styled-components'

const ChatSteps = () => {
  const { currentChat } = useChatState()
  const { closeModal } = useModal()

  return (
    <StyledGroup>
      <StyledHeaderGroup>
        <h1>Steps</h1>
        <CloseIconSvg onClick={() => closeModal('ai-chat-modal')} />
      </StyledHeaderGroup>
      <StyledMenu>
        {Object.entries(currentChat?.steps || {}).map(([stepName, stepStatus]) => (
          <StyledMenuItem key={stepName} onClick={() => console.log()}>
            <span>
              {stepName} - {stepStatus}
            </span>
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </StyledGroup>
  )
}

export default ChatSteps

const StyledGroup = styled.div``
const StyledHeaderGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #ffffff;
  }
  svg {
    cursor: pointer;
  }
`

const StyledMenu = styled.ul`
  margin: 0;
  padding: 0;
  margin-top: 26px;
`
const StyledMenuItem = styled.li`
  span {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: #ffffff;
  }
`
