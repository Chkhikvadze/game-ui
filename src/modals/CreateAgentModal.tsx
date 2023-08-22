import { FormikProvider } from 'formik'

import withRenderModal from 'hocs/withRenderModal'

import Modal from '@l3-lib/ui-core/dist/Modal'
import IconButton from '@l3-lib/ui-core/dist/IconButton'

import Close from '@l3-lib/ui-core/dist/icons/Close'

import BgWrapper from './components/BgWrapper'

import styled from 'styled-components'

import FormikTextField from 'components/TextFieldFormik'

import { useAgents } from 'pages/Agents/useAgents'

const CreateAgentModal = () => {
  const { formik, handleSubmit, closeCreateAgentModal } = useAgents()

  return (
    <Modal fullscreen show isClean backgroundColor='dark' onClose={closeCreateAgentModal}>
      <BgWrapper>
        <FormikProvider value={formik}>
          <StyledAgentForm>
            <StyledIconButtonWrapper>
              <IconButton
                onClick={closeCreateAgentModal}
                icon={() => <Close />}
                kind={IconButton.kinds.TERTIARY}
                size={IconButton.sizes.LARGE}
              />
            </StyledIconButtonWrapper>
            <StyledFormContainer>
              <FormikTextField name='agent_name' placeholder='Name' label='Name' />

              <FormikTextField name='agent_role' placeholder='Role' label='Role' />

              <FormikTextField
                name='agent_description'
                placeholder='Description'
                label='Description'
              />

              <StyledTestButton onClick={() => handleSubmit(formik?.values)}>
                Create Agent
              </StyledTestButton>
            </StyledFormContainer>
          </StyledAgentForm>
        </FormikProvider>
      </BgWrapper>
    </Modal>
  )
}

export default withRenderModal('create-agent-modal')(CreateAgentModal)

const StyledAgentForm = styled.div`
  width: 100vw;
  height: 100vh;

  padding: 50px;

  display: flex;
  justify-content: center;
`
const StyledIconButtonWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;

  padding: 20px;

  /* z-index: 1; */
`
const StyledTestButton = styled.div`
  padding: 10px;
  color: #fff;
  background: #000;
  border-radius: 10px;
  width: fit-content;
  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
`

const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
`
