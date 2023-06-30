import styled, { css } from 'styled-components'
import { ChatContextProvider } from './context/ChatContext'
import ChatView from './components/ChatView'
import withRenderModal from 'hocs/withRenderModal'
import ChatHistory from './components/ChatHistory'
import ChatSteps from './components/ChatSteps'

import StarsVector from 'assets/svgComponents/StartsVector'
import LeftArrowIconSvg from 'assets/svgComponents/LeftArrowIconSvg'

import Modal from '@l3-lib/ui-core/dist/Modal'
import BgWrapper from 'modals/components/BgWrapper'
import { ApiVersionEnum } from './types'
import { useChatState } from './hooks/useChat'
import CloseIconSvg from 'assets/svgComponents/CloseIconSvg'
import { useModal } from 'hooks'
import { useEffect, useState } from 'react'

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
  // console.log('from modal text', data.text)

  return (
    <ChatContextProvider initialApiVersion={data.apiVersion}>
      <Modal fullscreen show isClean isTransparent>
        <StyledCustomWrapper className='modal_wrapper' show={show}>
          {/* <StyledModalBody resetPosition> */}
          <StyledInnerBodyWrapper>
            <StyledLeftSide>
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
            </StyledLeftSide>
            <ChatView text={data.text} />
            {/* <ChatSteps steps={currentChat?.steps} /> */}
          </StyledInnerBodyWrapper>
          {/* </StyledModalBody> */}

          {/* <ChatView text={data.text} /> */}
          <StyledButtonWrapper>
            <CloseIconSvg onClick={() => closeModal('ai-chat-modal')} />
          </StyledButtonWrapper>
        </StyledCustomWrapper>
      </Modal>
    </ChatContextProvider>
  )
}

export default withRenderModal('ai-chat-modal')(AIChatModal)

const StyledRoot = styled.div<{ hidden: boolean }>`
  opacity: 0;
`

const StyledCustomWrapper = styled.div<{ show: boolean }>`
  width: 100vw;
  height: 100vh;

  background: linear-gradient(265.15deg, #4ca6f8 -32.37%, #2152f3 100%);
  /* background: transparent; */

  padding: 30px;

  opacity: 0;
  transition: opacity 2s, height 0.3s ease;
  ${props =>
    props.show &&
    css`
      opacity: 1;
      height: 100vh;
    `}
`

const StyledInnerBodyWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 112px;
`

const StyledLeftSide = styled.div``

const StyledSvgContainer = styled.div`
  background: #2e2740;
  border-radius: 4px;
  width: 20px;
  height: 20px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  align-items: center;
  svg {
    path {
      fill: rgba(136, 85, 255, 1);
    }
  }
`
const StyledLeftSideHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  h2 {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: #ffffff;
  }
  .left-arrow {
    margin-right: 2px;
    path {
      fill-opacity: 1;
    }
  }
`

const StyledChatHistoryWrapper = styled.div`
  margin-top: 30px;
`
const StyledButtonWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 50px;
  cursor: pointer;
`
