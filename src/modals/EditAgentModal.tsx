import { FormikProvider } from 'formik'

import withRenderModal from 'hocs/withRenderModal'

import Modal from '@l3-lib/ui-core/dist/Modal'
import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'

import BgWrapper from './components/BgWrapper'

import styled from 'styled-components'

import AgentForm from 'pages/Agents/AgentForm'
import { useEditAgent } from 'pages/Agents/useEditAgent'
import { StyledButtonWrapper } from './CreateAgentModal'

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
          <StyledButtonWrapper>
            <Button kind={Button.kinds.TERTIARY} onClick={closeEditAgentModal}>
              <Typography
                value='Close'
                type={Typography.types.HEADING}
                size={Typography.sizes.xss}
                customColor={'color: rgba(255, 255, 255, 0.6)'}
              />
            </Button>
          </StyledButtonWrapper>
          <AgentForm isEdit formik={formik} handleSubmit={handleSubmit} isLoading={isLoading} />
        </FormikProvider>
      </BgWrapper>
    </Modal>
  )
}

export default withRenderModal('edit-agent-modal')(EditAgentModal)
