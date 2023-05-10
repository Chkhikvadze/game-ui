import { useEffect, useState } from 'react'
import { ChatContextProvider } from './context/chatContext'
import { useModal } from 'hooks'
import SideBar from './components/SideBar'
import ChatView from './components/ChatView'
import Modal from './components/Modal'
import Setting from './components/Setting'
import withRenderModal from 'hocs/withRenderModal'
import { StyledModalWrapper, StyledModalBody, StyledCloseBtn, StyledHeader } from '../modalStyle'
import CloseIconSvg from 'assets/svgComponents/CloseIconSvg'
import styled from 'styled-components'
import FullScreenModal from 'components/FullScreenModal'
import './index.css'

const ChatGPTModal = () => {
  const { closeModal } = useModal()

  useEffect(() => {
    const apiKey = window.localStorage.getItem('api-key')
    if (!apiKey) {
      // setModalOpen(true)
    }
  }, [])
  return (
    // <ChatContextProvider>
    //   <Modal title='Setting' modalOpen={modalOpen} setModalOpen={setModalOpen}>
    //     <Setting modalOpen={modalOpen} setModalOpen={setModalOpen} />
    //   </Modal>
    //   <div className='flex transition duration-500 ease-in-out'>
    //     <SideBar />
    //     <ChatView />
    //   </div>
    // </ChatContextProvider>
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
              <SideBar />
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
