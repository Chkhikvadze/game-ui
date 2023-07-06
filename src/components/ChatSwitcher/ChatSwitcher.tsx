import styled, { css } from 'styled-components'

import Mention from '@l3-lib/ui-core/dist/icons/Mention'
import Collection from '@l3-lib/ui-core/dist/icons/Collection'
import Tooltip from '@l3-lib/ui-core/dist/Tooltip'
import MenuItem from '@l3-lib/ui-core/dist/MenuItem'

import { useModal } from 'hooks'

type ChatSwitcherProps = {
  chatIsOpen?: boolean
}

const ChatSwitcher = ({ chatIsOpen = false }: ChatSwitcherProps) => {
  const { openModal, closeModal } = useModal()

  const handleChatButton = () => {
    if (!chatIsOpen) {
      openModal({ name: 'ai-chat-modal', data: { text: 'formValue' } })
    }
  }

  const handleClose = () => {
    if (chatIsOpen) {
      closeModal('ai-chat-modal')
    }
  }

  return (
    <StyledChatSwitcher>
      <Tooltip content={() => <span>Copilot</span>} position={Tooltip.positions.TOP}>
        <StyledIcon picked={chatIsOpen} onClick={handleChatButton}>
          <Mention size='46' />
        </StyledIcon>
      </Tooltip>

      <Tooltip content={() => <span>Dashboard</span>} position={Tooltip.positions.BOTTOM}>
        <StyledIcon picked={!chatIsOpen} onClick={handleClose}>
          <Collection />
        </StyledIcon>
      </Tooltip>
    </StyledChatSwitcher>
  )
}

export default ChatSwitcher

const StyledChatSwitcher = styled.div`
  position: absolute;
  top: 50%;
  left: 32px;
  z-index: 2147483647;

  transform: translateY(-50%);

  display: inline-flex;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 100px;
  background: rgba(255, 255, 255, 0.1);
  /* Style */
  box-shadow: 0px 8px 6px 0px rgba(0, 0, 0, 0.05), 0px 1px 1px 0px rgba(255, 255, 255, 0.25) inset,
    0px -1px 1px 0px rgba(255, 255, 255, 0.1) inset;
  backdrop-filter: blur(50px);
`
const StyledIcon = styled.div<{ picked: boolean }>`
  color: transparent;

  border-radius: 100px;

  width: 48px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    cursor: pointer;
  }

  ${p =>
    p.picked &&
    css`
      background: rgba(255, 255, 255, 0.3);
      &:hover {
        background: rgba(255, 255, 255, 0.3);
        cursor: auto;
      }
    `};
`
