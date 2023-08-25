import { FormikProvider } from 'formik'

import withRenderModal from 'hocs/withRenderModal'

import Modal from '@l3-lib/ui-core/dist/Modal'
import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import ModalFooter from '@l3-lib/ui-core/dist/ModalFooter'
import Loader from '@l3-lib/ui-core/dist/Loader'

import AgentForm from 'pages/Agents/AgentForm'
import { useEditAgent } from 'pages/Agents/useEditAgent'
import { StyledFooterWrapper } from './CreateAgentModal'

type EditAgentModalProps = {
  data: {
    closeModal: () => void
    agentObj: any
  }
}

const EditAgentModal = ({ data }: EditAgentModalProps) => {
  const { formik, handleSubmit, closeEditAgentModal, isLoading } = useEditAgent(data.agentObj)

  return (
    <Modal
      hideCloseButton
      title={'Edit Agent'}
      show
      backgroundColor='dark'
      onClose={closeEditAgentModal}
    >
      <FormikProvider value={formik}>
        <AgentForm formik={formik} />
      </FormikProvider>

      <ModalFooter className='modalFooter'>
        <StyledFooterWrapper>
          <Button kind={Button.kinds.TERTIARY} onClick={closeEditAgentModal}>
            <Typography
              value='Cancel'
              type={Typography.types.HEADING}
              size={Typography.sizes.md}
              customColor={'color: rgba(255, 255, 255, 0.6)'}
            />
          </Button>
          <Button onClick={() => handleSubmit(formik?.values)} disabled={isLoading}>
            {!isLoading && 'Update'}
            {isLoading && <Loader size={24} />}
          </Button>
        </StyledFooterWrapper>
      </ModalFooter>
    </Modal>
  )
}

export default withRenderModal('edit-agent-modal')(EditAgentModal)
