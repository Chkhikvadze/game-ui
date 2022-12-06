import { FormikProvider } from 'formik'
import withRenderModal from 'hocs/withRenderModal'
import Button from 'oldComponents/atoms/Button'
import { StyledRoot } from 'oldComponents/atoms/Heading/HeadingStyle'
// import CustomTextField from "oldComponents/molecules/CustomTextField/CustomTextField";
import Modal from 'oldComponents/molecules/Modal'
import PlayerForm from 'pages/Player/PlayerForm'
import usePlayers from 'pages/Player/Players/usePlayers'
import styled from 'styled-components'
import { StyledModalButtonLink } from './CreateProjectModal'
import { StyledFromSection } from './modalStyle'

type CreatePlayerModalProps = {
  closeModal: () => void
}

const CreatePlayerModal = ({ closeModal }: CreatePlayerModalProps) => {
  const { formik } = usePlayers()

  return (
    <>
      <StyledRoot>
        <FormikProvider value={formik}>
          <Modal
            close={closeModal}
            header={'Create Player'}
            footer={
              <StyledActionsContainer>
                <StyledModalButtonLink style={{}} onClick={closeModal}>
                  Cancel
                </StyledModalButtonLink>

                <Button color="primary" onClick={formik.handleSubmit}>
                  Save
                </Button>
              </StyledActionsContainer>
            }
          >
            <StyledFromSection>
              <PlayerForm useHook={usePlayers} />
            </StyledFromSection>
          </Modal>
        </FormikProvider>
      </StyledRoot>
    </>
  )
}

export default withRenderModal('create-player-modal')(CreatePlayerModal)

export const StyledActionsContainer = styled.div`
  display: flex;
  justify-items: flex-end;
`
