import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import Button from '@l3-lib/ui-core/dist/Button'
import styled from 'styled-components'
import { useModal } from 'hooks'

const Agents = () => {
  const { openModal } = useModal()

  const openCreateAgentModal = () => {
    openModal({ name: 'create-agent-modal' })
  }

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <StyledSectionTitle>Agents</StyledSectionTitle>

        <StyledSectionDescription>Here are all of your games, etc</StyledSectionDescription>
      </StyledHeaderGroup>
      <ComponentsWrapper>
        <StyledButtonWrapper>
          <Button onClick={openCreateAgentModal}>Create Agent</Button>
        </StyledButtonWrapper>
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default Agents

const StyledButtonWrapper = styled.div`
  margin-left: auto;
`
