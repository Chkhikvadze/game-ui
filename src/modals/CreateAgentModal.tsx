import { FormikProvider } from 'formik'

import withRenderModal from 'hocs/withRenderModal'

import Modal from '@l3-lib/ui-core/dist/Modal'
import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import ModalFooter from '@l3-lib/ui-core/dist/ModalFooter'
import Loader from '@l3-lib/ui-core/dist/Loader'

import styled from 'styled-components'

import { useAgents } from 'pages/Agents/useAgents'
import AgentForm from 'pages/Agents/AgentForm'

const CreateAgentModal = () => {
  const { formik, handleSubmit, closeCreateAgentModal, isLoading } = useAgents()

  return (
    <Modal
      show
      hideCloseButton
      backgroundColor='dark'
      title={'Create Agent'}
      onClose={closeCreateAgentModal}
    >
      <FormikProvider value={formik}>
        <AgentForm formik={formik} />
      </FormikProvider>

      <ModalFooter className='modalFooter'>
        <StyledFooterWrapper>
          <Button kind={Button.kinds.TERTIARY} onClick={closeCreateAgentModal}>
            <Typography
              value='Cancel'
              type={Typography.types.HEADING}
              size={Typography.sizes.md}
              customColor={'color: rgba(255, 255, 255, 0.6)'}
            />
          </Button>
          <Button onClick={() => handleSubmit(formik?.values)} disabled={isLoading}>
            {!isLoading && 'Create Agent'}
            {isLoading && <Loader size={24} />}
          </Button>
        </StyledFooterWrapper>
      </ModalFooter>
    </Modal>
  )
}

export default withRenderModal('create-agent-modal')(CreateAgentModal)

export const StyledFooterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;

  gap: 10px;
`
