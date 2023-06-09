import styled from 'styled-components'
import { ChatContextProvider } from './context/ChatContext'
import ChatView from './components/ChatView'
import withRenderModal from 'hocs/withRenderModal'
import ChatHistory from './components/ChatHistory'
import ChatSteps from './components/ChatSteps'

import StarsVector from 'assets/svgComponents/StartsVector'
import LeftArrowIconSvg from 'assets/svgComponents/LeftArrowIconSvg'
import { API_VERSION_ENUM } from './types'
import Modal from '@l3-lib/ui-core/dist/Modal'
import BgWrapper from 'modals/components/BgWrapper'

type AIChatModalProps = {
  data: {
    game_id: string
    apiVersion: API_VERSION_ENUM
  }
}

const AIChatModal = ({ data }: AIChatModalProps) => {
  return (
    <ChatContextProvider initialApiVersion={data.apiVersion}>
      <Modal fullscreen show isClean>
        <BgWrapper dark>
          <StyledCustomWrapper className='modal_wrapper'>
            {/* <StyledModalBody resetPosition> */}
            <StyledInnerBodyWrapper>
              <StyledLeftSide>
                <StyledLeftSideHeader onClick={() => console.log('previous step')}>
                  <LeftArrowIconSvg className='left-arrow' />
                  <StyledSvgContainer>
                    <StarsVector />
                  </StyledSvgContainer>
                  <h2>Generate Game</h2>
                </StyledLeftSideHeader>
                <StyledChatHistoryWrapper>
                  <ChatHistory />
                </StyledChatHistoryWrapper>
              </StyledLeftSide>
              <ChatView />
              <ChatSteps />
            </StyledInnerBodyWrapper>
            {/* </StyledModalBody> */}
          </StyledCustomWrapper>
        </BgWrapper>
      </Modal>
    </ChatContextProvider>
  )
}

export default withRenderModal('ai-chat-modal')(AIChatModal)

const StyledCustomWrapper = styled.div`
  width: 100vw;
  height: 100vh;

  padding: 30px;
`

const StyledInnerBodyWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
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
