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
import { StyledFormSection } from './modalStyle'

import { useTranslation } from 'react-i18next'

// import { StyledFromSection } from './modalStyle'

type CreatePlayerModalProps = {
  closeModal: () => void
}

const CreatePlayerModal = ({ closeModal }: CreatePlayerModalProps) => {
  const { formik, handleChangeFile, onDeleteImg, fileUploadType } = usePlayers()
  const { t } = useTranslation()
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
                  {t('cancel')}
                </StyledModalButtonLink>

                <Button color="primary" onClick={formik.handleSubmit}>
                  {t('save')}
                </Button>
              </StyledActionsContainer>
            }
          >
            <StyledFormSection>
              <PlayerForm
                formik={formik}
                handleChangeFile={handleChangeFile}
                onDeleteImg={onDeleteImg}
                fileUploadType={fileUploadType}
              />
            </StyledFormSection>
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
