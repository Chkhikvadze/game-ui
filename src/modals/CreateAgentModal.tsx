import { FormikProvider } from 'formik'

import withRenderModal from 'hocs/withRenderModal'

import Modal from '@l3-lib/ui-core/dist/Modal'
import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'

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
          <StyledButtonWrapper>
            <Button kind={Button.kinds.TERTIARY} onClick={closeCreateAgentModal}>
              <Typography
                value='Close'
                type={Typography.types.HEADING}
                size={Typography.sizes.xss}
                customColor={'color: rgba(255, 255, 255, 0.6)'}
              />
            </Button>
          </StyledButtonWrapper>
          <AgentForm formik={formik} handleSubmit={handleSubmit} isLoading={isLoading} />
        </FormikProvider>
      </BgWrapper>
    </Modal>
  )
}

export default withRenderModal('create-agent-modal')(CreateAgentModal)

export const StyledButtonWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;

  padding: 20px;

  /* z-index: 1; */
`
