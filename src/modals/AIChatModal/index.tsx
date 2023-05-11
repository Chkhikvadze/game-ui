import styled from 'styled-components'
import { useModal } from 'hooks'
import { ChatContextProvider } from './context/ChatContext'
import ChatView from './components/ChatView'
import withRenderModal from 'hocs/withRenderModal'
import { StyledModalWrapper, StyledModalBody, StyledCloseBtn, StyledHeader } from '../modalStyle'
import CloseIconSvg from 'assets/svgComponents/CloseIconSvg'
import FullScreenModal from 'components/FullScreenModal'
import ChatHistory from './components/ChatHistory'
import ChatSteps from './components/ChatSteps'

const AIChatModal = () => {
  const { closeModal } = useModal()

  return (
    <ChatContextProvider>
      <FullScreenModal dark_layer>
        <StyledModalWrapper className='modal_wrapper'>
          <StyledHeader>
            <StyledCloseBtn onClick={() => closeModal('ai-chat-modal')}>
              <CloseIconSvg color='rgba(255, 255, 255, 0.8);' />
            </StyledCloseBtn>
          </StyledHeader>
          <StyledModalBody resetPosition>
            <StyledInnerBodyWrapper>
              <ChatHistory />
              <ChatView />
              <ChatSteps />
            </StyledInnerBodyWrapper>
          </StyledModalBody>
        </StyledModalWrapper>
      </FullScreenModal>
    </ChatContextProvider>
  )
}

export default withRenderModal('ai-chat-modal')(AIChatModal)

const StyledInnerBodyWrapper = styled.div`
  display: flex;
  /* flex-direction: column; */
  /* gap: 40px; */
  /* align-items: center; */
  width: 100%;
`
