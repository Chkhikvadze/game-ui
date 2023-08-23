import { FormikProvider } from 'formik'

import withRenderModal from 'hocs/withRenderModal'

import Modal from '@l3-lib/ui-core/dist/Modal'
import IconButton from '@l3-lib/ui-core/dist/IconButton'

import Close from '@l3-lib/ui-core/dist/icons/Close'

import BgWrapper from './components/BgWrapper'

import styled from 'styled-components'

import AgentForm from 'pages/Agents/AgentForm'
import { useEditAgent } from 'pages/Agents/useEditAgent'

type EditAgentModalProps = {
  data: {
    closeModal: () => void
    agentObj: any
  }
}

const EditAgentModal = ({ data }: EditAgentModalProps) => {
  const { formik, handleSubmit, closeEditAgentModal, isLoading } = useEditAgent(data.agentObj)

  return (
    <Modal fullscreen show isClean backgroundColor='dark' onClose={closeEditAgentModal}>
      <BgWrapper>
        <FormikProvider value={formik}>
          <StyledIconButtonWrapper>
            <IconButton
              onClick={closeEditAgentModal}
              icon={() => <Close />}
              kind={IconButton.kinds.TERTIARY}
              size={IconButton.sizes.LARGE}
            />
          </StyledIconButtonWrapper>
          <AgentForm isEdit formik={formik} handleSubmit={handleSubmit} isLoading={isLoading} />
        </FormikProvider>
      </BgWrapper>
    </Modal>
  )
}

export default withRenderModal('edit-agent-modal')(EditAgentModal)

const StyledIconButtonWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;

  padding: 20px;

  /* z-index: 1; */
`
