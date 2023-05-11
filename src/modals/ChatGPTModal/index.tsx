import styled from 'styled-components'
import { useModal } from 'hooks'
import { ChatContextProvider } from './context/ChatContext'
import ChatView from './components/ChatView'
import withRenderModal from 'hocs/withRenderModal'
import { StyledModalWrapper, StyledModalBody, StyledCloseBtn, StyledHeader } from '../modalStyle'
import CloseIconSvg from 'assets/svgComponents/CloseIconSvg'
import FullScreenModal from 'components/FullScreenModal'
import ChatHistory from './components/ChatHistory'
import ChatQueue from './components/ChatQueue'

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
              <ChatHistory />
              <ChatView />
              <ChatQueue />
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
  /* flex-direction: column; */
  /* gap: 40px; */
  /* align-items: center; */
  width: 100%;
`
