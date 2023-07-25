import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useState } from 'react'
import styled, { css } from 'styled-components'
import { LayoutContext } from 'contexts'

import Mention from '@l3-lib/ui-core/dist/icons/Mention'
import Collection from '@l3-lib/ui-core/dist/icons/Collection'
import Tooltip from '@l3-lib/ui-core/dist/Tooltip'
import useCheckRoute from 'hooks/useCheckRoute'

const ChatSwitcher = () => {
  const { isCheckedRoute } = useCheckRoute('copilot')

  const [isChatOpen, setIsChatOpen] = useState(isCheckedRoute)

  const navigate = useNavigate()
  const { expand } = useContext(LayoutContext)

  const params = useParams()
  const { collectionId, gameId } = params

  let route = 'copilot'

  if (collectionId) {
    route = `/${route}?game=${gameId}&collection=${collectionId}`
  } else if (gameId) {
    route = `/${route}?game=${gameId}`
  }

  const handleChatButton = () => {
    if (!isChatOpen) {
      navigate(route, { state: { text: 'formValue' } })
      setIsChatOpen(true)
    }
  }

  return (
    <StyledChatSwitcher expandMode={expand}>
      <Tooltip content={() => <span>Dashboard</span>} position={Tooltip.positions.TOP}>
        <StyledIcon
          picked={!isCheckedRoute}
          onClick={() => {
            navigate('/')
            setIsChatOpen(false)
          }}
        >
          <Collection />
        </StyledIcon>
      </Tooltip>

      <Tooltip content={() => <span>Copilot</span>} position={Tooltip.positions.BOTTOM}>
        <StyledIcon picked={isCheckedRoute} onClick={handleChatButton}>
          <Mention size='46' />
        </StyledIcon>
      </Tooltip>
    </StyledChatSwitcher>
  )
}

export default ChatSwitcher

const StyledChatSwitcher = styled.div<{ expandMode?: boolean }>`
  position: absolute;
  top: 50%;
  left: 32px;
  z-index: 2147483647;

  transform: translateY(-50%);

  display: ${p => (p.expandMode ? 'none' : 'inline-flex')};
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
