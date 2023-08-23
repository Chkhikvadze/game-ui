import { FormikProvider } from 'formik'

import withRenderModal from 'hocs/withRenderModal'

import Modal from '@l3-lib/ui-core/dist/Modal'
import IconButton from '@l3-lib/ui-core/dist/IconButton'

import Close from '@l3-lib/ui-core/dist/icons/Close'

import BgWrapper from './components/BgWrapper'

import styled from 'styled-components'

import { useAgents } from 'pages/Agents/useAgents'
import AgentForm from 'pages/Agents/AgentForm'

const CreateAgentModal = () => {
  const { formik, handleSubmit, closeCreateAgentModal, isLoading } = useAgents()

  return (
    <Modal fullscreen show isClean backgroundColor='dark' onClose={closeCreateAgentModal}>
      <BgWrapper>
        <FormikProvider value={formik}>
          <StyledIconButtonWrapper>
            <IconButton
              onClick={closeCreateAgentModal}
              icon={() => <Close />}
              kind={IconButton.kinds.TERTIARY}
              size={IconButton.sizes.LARGE}
            />
          </StyledIconButtonWrapper>
          <AgentForm formik={formik} handleSubmit={handleSubmit} isLoading={isLoading} />
        </FormikProvider>
      </BgWrapper>
    </Modal>
  )
}

export default withRenderModal('create-agent-modal')(CreateAgentModal)

const StyledIconButtonWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;

  padding: 20px;

  /* z-index: 1; */
`
