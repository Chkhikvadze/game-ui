import React, { useState } from 'react'
import { useChatState } from 'modals/AIChatModal/hooks/useChat'
import { STEP_STATUS_ENUM } from 'modals/AIChatModal/types'
import CloseIconSvg from 'assets/svgComponents/CloseIconSvg'
import { useModal } from 'hooks'
import styled from 'styled-components'
import MarkedIconSvg from '../assets/MarkedIcon'

const ChatSteps = () => {
  const { currentChat } = useChatState()
  const { closeModal } = useModal()

  const onHandleClick = (index: number, status: string) => {
    //todo maybe we need to switch it later
  }

  return (
    <StyledGroup>
      <StyledHeaderGroup>
        <h1>Steps</h1>
        <CloseIconSvg onClick={() => closeModal('ai-chat-modal')} />
      </StyledHeaderGroup>
      <StyledMenu>
        {Object.entries(currentChat?.steps || {}).map(([stepName, stepStatus], index) => {
          // todo this is simulation of a active status
          const status = stepStatus
          return (
            <StyledMenuItem
              key={stepName}
              onClick={() => onHandleClick(index, status)}
              isActive={stepStatus === STEP_STATUS_ENUM.InProgress}
              stepStatus={status}
            >
              <StyledSvgContainer className='svg_container'>
                <MarkedIconSvg />
              </StyledSvgContainer>
              <span>
                {/* {stepName} - {stepStatus} */}
                {stepName}
              </span>
            </StyledMenuItem>
          )
        })}
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
  list-style: none;
`
const StyledMenuItem = styled.li<{ isActive?: boolean; stepStatus?: string }>`
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 16px;
  span {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: #ffffff;
  }

  ${({ isActive }) =>
    isActive &&
    `
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 4px 6px;
  `}
  ${({ stepStatus }) =>
    stepStatus === 'Completed' &&
    `
    span{color: rgba(255, 255, 255, 0.6);}
    .svg_container{
      background-color: #61C72C;
      opacity: 0.4;
    }
  `}
`

const StyledSvgContainer = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`
