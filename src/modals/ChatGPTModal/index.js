import { useEffect, useState } from 'react'
import { ChatContextProvider } from 'modals/ChatGPTModal/context/chatContext'
import { useModal } from 'hooks'
import ChatView from 'modals/ChatGPTModal/components/ChatView'
import withRenderModal from 'hocs/withRenderModal'
import { StyledModalWrapper, StyledModalBody, StyledCloseBtn, StyledHeader } from '../modalStyle'
import CloseIconSvg from 'assets/svgComponents/CloseIconSvg'
import styled from 'styled-components'
import FullScreenModal from 'components/FullScreenModal'

const ChatGPTModal = () => {
  const { closeModal } = useModal()

  return (
    <ChatContextProvider>
      <FullScreenModal dark_layer>
        <StyledModalWrapper className='modal_wrapper'>
          <StyledHeader>
            <StyledCloseBtn onClick={() => closeModal('chatgpt-modal')}>
              <CloseIconSvg color='rgba(255, 255, 255, 0.8);' />
            </StyledCloseBtn>
          </StyledHeader>
          <StyledModalBody resetPosition>
            <StyledInnerBodyWrapper>
              <ChatView />
            </StyledInnerBodyWrapper>
          </StyledModalBody>
        </StyledModalWrapper>
      </FullScreenModal>
    </ChatContextProvider>
  )
}

export default withRenderModal('chatgpt-modal')(ChatGPTModal)

const StyledInnerBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
`
