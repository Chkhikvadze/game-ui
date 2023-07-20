import { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { AuthContext } from 'contexts'

import { useModal } from 'hooks'

import { ChatContextProvider } from './context/ChatContext'
import ChatView from './components/ChatView'
import withRenderModal from 'hocs/withRenderModal'

import Modal from '@l3-lib/ui-core/dist/Modal'
import Typography from '@l3-lib/ui-core/dist/Typography'

import { ApiVersionEnum } from './types'
import { useChatState } from './hooks/useChat'

import {
  StyledHeader,
  StyledNavigationColumn,
  StyledLogoWrapper,
} from 'components/Layout/LayoutStyle'

import logo from 'assets/images/l3_logo.png'
import ChatSwitcher from 'components/ChatSwitcher'
import HeaderShare from 'components/HeaderShare'
import Breadcrumbs from 'components/BreadCrumbs/BreadCrumbs'
import ArrowNavigation from 'pages/Navigation/ArrowNavigation'
import AvatarDropDown from 'components/AvatarDropDown'
import ChatV2 from './components/ChatV2'

type AIChatModalProps = {
  data: {
    apiVersion: ApiVersionEnum
    text: string
    show: boolean
  }
}

const AIChatModal = ({ data }: AIChatModalProps) => {
  const navigate = useNavigate()

  const { user } = useContext(AuthContext)
  const { first_name } = user

  const { currentChat } = useChatState()
  const { closeModal } = useModal()

  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  const handleNavigation = () => {
    navigate(-1)
    closeModal('ai-chat-modal')
  }

  return (
    <ChatContextProvider initialApiVersion={data.apiVersion}>
      <StyledModal fullscreen show isClean isTransparent>
        <StyledCustomWrapper className='modal_wrapper' show={show}>
          <StyledHeader>
            <StyledNavigationColumn>
              <ArrowNavigation onClick={handleNavigation} />
              <Breadcrumbs onClick={handleNavigation} />
            </StyledNavigationColumn>
            <StyledLogoWrapper to='/' onClick={() => closeModal('ai-chat-modal')}>
              <img src={logo} alt='Logo' />
            </StyledLogoWrapper>
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
            {data.text === 'v2' ? <ChatV2 /> : <ChatView />}

            <ChatSwitcher chatIsOpen />
            {/* <ChatSteps steps={currentChat?.steps} /> */}
          </StyledInnerBodyWrapper>
          {/* </StyledModalBody> */}

          {/* <ChatView text={data.text} /> */}
          {/* <StyledButtonWrapper>
            <CloseIconSvg onClick={() => closeModal('ai-chat-modal')} />
          </StyledButtonWrapper> */}
          <StyledAvatarContainer>
            <AvatarDropDown />

            <Typography
              value={first_name}
              type={Typography.types.LABEL}
              size={Typography.sizes.sm}
              customColor={'rgba(255, 255, 255, 0.2)'}
            />
          </StyledAvatarContainer>
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
const StyledAvatarContainer = styled.footer`
  display: flex;
  gap: 10px;
  min-height: 72px;
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 0 32px;
  align-items: center;
`
