import { useModal } from 'hooks'

import styled from 'styled-components'

import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import Button from '@l3-lib/ui-core/dist/Button'
import AgentCard from './AgentCard'

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
        <AgentCard
          title={'Test Agent'}
          subTitle={'AI Agent'}
          onEditClick={() => {}}
          onDeleteClick={() => {}}
          onViewClick={() => {}}
        />
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default Agents

const StyledButtonWrapper = styled.div`
  margin-left: auto;
  margin-bottom: 20px;
`
