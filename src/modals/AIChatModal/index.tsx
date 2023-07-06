import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { useModal } from 'hooks'

import { ChatContextProvider } from './context/ChatContext'
import ChatView from './components/ChatView'
import withRenderModal from 'hocs/withRenderModal'
import ChatHistory from './components/ChatHistory'
import ChatSteps from './components/ChatSteps'

import StarsVector from 'assets/svgComponents/StartsVector'

import Modal from '@l3-lib/ui-core/dist/Modal'

import { ApiVersionEnum } from './types'
import { useChatState } from './hooks/useChat'

import { StyledHeader, StyledNavigationColumn } from 'routes/LayoutStyle'

import logo from 'assets/images/l3_logo.svg'
import ChatSwitcher from 'components/ChatSwitcher'
import HeaderShare from 'components/HeaderShare'
import Breadcrumbs from 'components/BreadCrumbs/BreadCrumbs'
import ArrowNavigation from 'pages/Navigation/ArrowNavigation'

type AIChatModalProps = {
  data: {
    game_id: string
    apiVersion: ApiVersionEnum
    text: string
    show: boolean
  }
}

const AIChatModal = ({ data }: AIChatModalProps) => {
  const { currentChat } = useChatState()
  const { closeModal } = useModal()

  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  return (
    <ChatContextProvider initialApiVersion={data.apiVersion}>
      <StyledModal fullscreen show isClean isTransparent>
        <StyledCustomWrapper className='modal_wrapper' show={show}>
          <StyledHeader>
            <StyledNavigationColumn>
              <ArrowNavigation closeModal={() => closeModal('ai-chat-modal')} />
              <Breadcrumbs onClick={() => closeModal('ai-chat-modal')} />
            </StyledNavigationColumn>
            <Link to='/' onClick={() => closeModal('ai-chat-modal')}>
              <img src={logo} alt='Logo' />
            </Link>
            <StyledHeaderRight>
              <HeaderShare />
            </StyledHeaderRight>
            {/* <div>
              <CloseIconSvg onClick={() => closeModal('ai-chat-modal')} />
            </div> */}
          </StyledHeader>
          {/* <StyledModalBody resetPosition> */}
          <StyledInnerBodyWrapper>
            {/* <StyledLeftSide> */}
            {/* <StyledLeftSideHeader onClick={() => console.log('previous step')}>
                <LeftArrowIconSvg className='left-arrow' />
                <StyledSvgContainer>
                  <StarsVector />
                </StyledSvgContainer>
                <h2>Generate Game</h2>
              </StyledLeftSideHeader>
              <StyledChatHistoryWrapper>
                <ChatHistory />
              </StyledChatHistoryWrapper> */}
            {/* </StyledLeftSide> */}
            <ChatView text={data.text} />
            <ChatSwitcher chatIsOpen />
            {/* <ChatSteps steps={currentChat?.steps} /> */}
          </StyledInnerBodyWrapper>
          {/* </StyledModalBody> */}

          {/* <ChatView text={data.text} /> */}
          {/* <StyledButtonWrapper>
            <CloseIconSvg onClick={() => closeModal('ai-chat-modal')} />
          </StyledButtonWrapper> */}
        </StyledCustomWrapper>
      </StyledModal>
    </ChatContextProvider>
  )
}

export default withRenderModal('ai-chat-modal')(AIChatModal)

const StyledModal = styled(Modal)`
   /* height: 80vh !important;

  .components-Modal-Modal-module__container--cn6NH {
    z-index: 1 !important;
  }
  .components-Modal-Modal-module__overlay--OO00T {
    backdrop-filter: none !important;
  } */ */
`

const StyledCustomWrapper = styled.div<{ show: boolean }>`
  width: 100vw;
  height: 100vh;
  /* position: relative; */
  background: linear-gradient(265.15deg, #4ca6f8 -32.37%, #2152f3 100%);
  /* background: transparent; */

  /* padding: 30px; */
  overflow-y: auto;
  opacity: 0;
  transition: opacity 2s;
  ${props =>
    props.show &&
    css`
      opacity: 1;
    `}
`

const StyledInnerBodyWrapper = styled.div`
  /* display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 112px; */
  display: flex;
  justify-content: center;
  /* overflow: hidden; */
  /* height: 100%; */
`

const StyledLeftSide = styled.div``

const StyledHeaderRight = styled.div`
  margin-left: auto;
`
