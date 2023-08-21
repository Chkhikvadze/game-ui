import { FormikProvider } from 'formik'

import withRenderModal from 'hocs/withRenderModal'

import Modal from '@l3-lib/ui-core/dist/Modal'
import IconButton from '@l3-lib/ui-core/dist/IconButton'

import Close from '@l3-lib/ui-core/dist/icons/Close'

import BgWrapper from './components/BgWrapper'

import styled from 'styled-components'
import { useModal } from 'hooks'

const CreateAgentModal = ({ data }: any) => {
  const { asset, collection_id } = data

  const { closeModal } = useModal()

  //   const { formik, closeModal } = useAsset()

  const closeCreateAgentModal = () => {
    closeModal('create-agent-modal')
  }

  return (
    <Modal fullscreen show isClean backgroundColor='dark' onClose={closeCreateAgentModal}>
      <BgWrapper>
        <StyledAgentForm>
          <StyledIconButtonWrapper>
            <IconButton
              onClick={closeCreateAgentModal}
              icon={() => <Close />}
              kind={IconButton.kinds.TERTIARY}
              size={IconButton.sizes.LARGE}
            />
          </StyledIconButtonWrapper>
        </StyledAgentForm>
      </BgWrapper>
    </Modal>
  )
}

export default withRenderModal('create-agent-modal')(CreateAgentModal)

const StyledAgentForm = styled.div`
  width: 100vw;
  height: 100vh;
`
const StyledIconButtonWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;

  padding: 20px;

  /* z-index: 1; */
`
